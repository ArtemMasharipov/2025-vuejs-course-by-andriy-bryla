import mongoose from 'mongoose';
import Book from '../book/bookModel.mjs';
import Cart from './cartModel.mjs';

class CartDBService {
    async getUserCart(userId) {
        return Cart.findOneAndUpdate(
            { userId },
            { $setOnInsert: { items: [], totalPrice: 0 } },
            { 
                new: true, 
                upsert: true,
                populate: 'items.bookId'
            }
        );
    }

    calculateTotalPrice(items) {
        return items.reduce((total, { price, quantity }) => 
            total + (price * quantity), 0
        );
    }

    async addToCart(userId, bookId, quantity) {
        
        let cart = await Cart.findOne({ 
            userId,
            'items.bookId': bookId 
        });

        if (cart) {
            
            cart = await Cart.findOneAndUpdate(
                { 
                    userId,
                    'items.bookId': bookId 
                },
                { 
                    $inc: { 'items.$.quantity': quantity },
                    $set: { 'items.$.price': (await Book.findById(bookId)).price }
                },
                { new: true }
            );
        } else {
            
            cart = await Cart.findOne({ userId });
            
            if (cart) {
                
                const book = await Book.findById(bookId);
                if (!book) {
                    throw new Error('Book not found');
                }
                
                cart.items.push({
                    bookId: book._id,
                    quantity: quantity,
                    price: book.price
                });
                
                await cart.save();
            } else {
                
                cart = await this.createCartWithItem(userId, bookId, quantity);
            }
        }

        return cart.populate('items.bookId');
    }

    async createCartWithItem(userId, bookId, quantity) {
        const book = await Book.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        const newCart = await Cart.create({
            userId,
            items: [{
                bookId: book._id,
                quantity: quantity,
                price: book.price
            }],
            totalPrice: book.price * quantity
        });
        
        return newCart;
    }

    async removeCartItem(userId, itemId) {
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } },
            { new: true }
        ).populate('items.bookId');

        if (!cart) {
            throw new Error('Cart not found');
        }

        await cart.save();
        return cart;
    }

    async updateCartItem(userId, itemId, quantity) {
        const cart = await this.getUserCart(userId);
        const item = cart.items.find(item => item._id.toString() === itemId);
        
        if (!item) {
            throw new Error('Item not found in cart');
        }

        item.quantity = quantity;
        cart.totalPrice = this.calculateTotalPrice(cart.items);
        await cart.save();
        return cart.populate('items.bookId');
    }

    async clearCart(userId) {
        try {
            const cart = await Cart.findOneAndUpdate(
                { userId },
                { 
                    items: [], 
                    totalPrice: 0 
                },
                { 
                    new: true,
                    upsert: true 
                }
            );
            return cart;        } catch (error) {
            throw error;
        }
    }

    async syncCart(userId, localCartItems) {
        try {
            let cart = await this.getUserCart(userId);
            
            if (!cart) {
                cart = await Cart.create({
                    userId,
                    items: [],
                    totalPrice: 0
                });
            }

            const validatedItems = await Promise.all(
                localCartItems.map(async (item) => {
                    const book = await Book.findById(item.bookId);
                    if (!book) return null;
                    
                    return {
                        bookId: book._id,
                        quantity: parseInt(item.quantity),
                        price: book.price
                    };
                })
            );

            const filteredItems = validatedItems.filter(item => item !== null);

            cart.items = filteredItems;
            
            cart.totalPrice = filteredItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);            await cart.save();
            return cart.populate('items.bookId', 'title image price');
        } catch (error) {
            throw error;
        }
    }
}

export default new CartDBService();
