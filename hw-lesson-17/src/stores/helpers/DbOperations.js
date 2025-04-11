import firebaseDB from '@/firebase-config';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    startAfter,
    updateDoc,
    where
} from 'firebase/firestore/lite';

class DbOperations {
    constructor(collectionTitle) {
        this.dbCollection = collection(firebaseDB, `/${collectionTitle}`);
    }

    getItemFromSnap(docSnap) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        };
    }

    getListFromSnapshot(snapshot) {
        const list = [];
        snapshot.docs.forEach((doc) => {
            list.push(this.getItemFromSnap(doc));
        });
        return list;
    }

    getQueryOptions(options, ...filters) {
        const opts = [];
        if (options?.orderBy) {
            opts.push(orderBy(options.orderBy, options.orderType || 'asc'));
        }
        if (options?.limit) {
            opts.push(limit(options.limit));
        }
        if (options?.lastVisible && options?.orderBy) {
            opts.push(startAfter(options.lastVisible));
        }
        const result = [...filters, ...opts];
        return result;
    }

    loadItemsList(options) {
        const queryOpt = this.getQueryOptions(options);

        return new Promise((resolve, reject) => {
            getDocs(query(this.dbCollection, ...queryOpt))
                .then((querySnapshot) => {
                    resolve(this.getListFromSnapshot(querySnapshot));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    loadItemById(id) {
        return new Promise((resolve, reject) => {
            getDoc(doc(this.dbCollection, id))
                .then((querySnapshot) => {
                    if (querySnapshot.exists()) {
                        resolve(this.getItemFromSnap(querySnapshot));
                    } else {
                        throw new Error('Item not exists');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            const dataToAdd = { ...item };
            if ('id' in dataToAdd) {
                delete dataToAdd.id;
            }
            
            dataToAdd.createdAt = dataToAdd.createdAt || serverTimestamp();
            dataToAdd.updatedAt = serverTimestamp();
            
            addDoc(this.dbCollection, dataToAdd)
                .then((docRef) => {
                    resolve(docRef.id);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    deleteItem(id) {
        return new Promise((resolve, reject) => {
            deleteDoc(doc(this.dbCollection, id))
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    updateItem(itemId, data) {
        return new Promise((resolve, reject) => {
            const dataToUpdate = { ...data };
            if ('id' in dataToUpdate) {
                delete dataToUpdate.id;
            }
            
            dataToUpdate.updatedAt = serverTimestamp();
            
            const oldDocRef = doc(this.dbCollection, itemId);
            updateDoc(oldDocRef, dataToUpdate)
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    loadFilteredData({ filters }, options) {
        if (!Array.isArray(filters) || filters.length === 0) {
            return this.loadItemsList(options);
        }
        
        const queryFilters = filters.map((filter) =>
            where(
                filter.fieldTitle,
                filter.compareOperator,
                filter.valueToCompare
            )
        );
        
        const queryOpt = this.getQueryOptions(options, ...queryFilters);
        const q = query(this.dbCollection, ...queryOpt);

        return getDocs(q)
            .then((querySnapshot) => {
                const result = this.getListFromSnapshot(querySnapshot);
                return result;
            })
            .catch((error) => {
                throw error;
            });
    }
    
    loadUniqueFieldValues(fieldName) {
        return this.loadItemsList()
            .then(items => {
                const uniqueValues = new Set();
                items.forEach(item => {
                    if (item[fieldName]) {
                        uniqueValues.add(item[fieldName]);
                    }
                });
                return Array.from(uniqueValues).sort();
            });
    }
}

export default DbOperations;
