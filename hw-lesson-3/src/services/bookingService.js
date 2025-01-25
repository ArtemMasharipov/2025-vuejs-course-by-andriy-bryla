const STORAGE_KEY = 'hotel_bookings';

export const bookingService = {
  getBookings() {
    const bookings = localStorage.getItem(STORAGE_KEY);
    return bookings ? JSON.parse(bookings) : [];
  },

  saveBooking(booking) {
    try {
      const bookings = this.getBookings();
      const newBooking = {
        id: Date.now(),
        ...booking,
        createdAt: new Date().toISOString()
      };
      
      bookings.unshift(newBooking); 
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      
      return { success: true, booking: newBooking };
    } catch (error) {
      console.error('Error saving booking:', error);
      return { success: false, error: 'Failed to save booking' };
    }
  },

  getAllBookings() {
    const bookings = this.getBookings();
    return bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  deleteBooking(id) {
    try {
      const bookings = this.getBookings();
      const filteredBookings = bookings.filter(booking => booking.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBookings));
      return { success: true };
    } catch (error) {
      console.error('Error deleting booking:', error);
      return { success: false, error: 'Failed to delete booking' };
    }
  }
};
