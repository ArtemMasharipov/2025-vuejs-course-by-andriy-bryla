<template>
  <div class="bookings-list">
    <h3>Recent Bookings</h3>
    <div v-if="sortedBookings.length">
      <div v-for="booking in formaortdBookings" :key="booking.id" class="booking-item">
        <div class="booking-header">
          <button class="delete-btn" @click="deleteBooking(booking.id)">&times;</button>
        </div>
        <p><strong>Guest:</strong> {{ booking.fullName }}</p>
        <p><strong>Dates:</strong> {{ booking.formattedDates }}</p>
        <p><strong>Room:</strong> {{ booking.roomType }}</p>
        <p><strong>Guests:</strong> {{ booking.guests }}</p>
        <p class="booking-date">Booked on: {{ booking.formattedCreatedAt }}</p>
      </div>
    </div>
    <div v-else class="no-bookings">
      No bookings found
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingsList',
  props: {
    bookings: {
      type: Array,
      required: true
    }
  },
  emits: ['delete-booking'],
  computed: {
    sortedBookings() {
      return [...this.bookings].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    },
    formattedBookings() {
      return this.sortedBookings.map(booking => ({
        ...booking,
        formattedDates: this.formatBookingDates(booking.checkIn, booking.checkOut),
        formattedCreatedAt: new Date(booking.createdAt).toLocaleString()
      }));
    }
  },
  methods: {
    formatBookingDates(checkIn, checkOut) {
      return `${checkIn.replace(/-/g, '/')} - ${checkOut.replace(/-/g, '/')}`;
    },
    deleteBooking(id) {
      if (confirm('Are you sure you want to delete this booking?')) {
        this.$emit('delete-booking', id);
      }
    }
  }
};
</script>

<style scoped>
.bookings-list {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.booking-item {
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.booking-item p {
  margin: 5px 0;
}

.no-bookings {
  text-align: center;
  padding: 20px;
  color: #666;
}

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.booking-date {
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;
  border-top: 1px solid #eee;
  padding-top: 5px;
}

.booking-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4444;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

.delete-btn:hover {
  color: #ff0000;
}
</style>
