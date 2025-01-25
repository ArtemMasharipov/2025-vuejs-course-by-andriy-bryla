<template>
  <div class="booking-container">
    <app-navbar 
      :current-view="currentView" 
      @change-view="currentView = $event" 
    />
    
    <component 
      :is="currentComponent" 
      :bookings="sortedBookings"
      @booking-submitted="handleBooking" 
      @delete-booking="handleDelete"
    />
    
    <div v-if="notification" :class="notificationClasses">
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { VIEWS, NOTIFICATION_TYPES, NOTIFICATION_MESSAGES } from '@/constants';
import BookingForm from "./BookingForm.vue";
import BookingsList from "./BookingsList.vue";
import AboutView from "@/views/AboutView.vue";
import AppNavbar from "./AppNavbar.vue";
import { bookingService } from "@/services/bookingService";

export default {
  name: "BookingContainer",
  components: {
    BookingForm,
    BookingsList,
    AboutView,
    AppNavbar
  },
  data() {
    return {
      currentView: VIEWS.ABOUT,
      notification: null,
      bookings: []
    };
  },
  computed: {
    currentComponent() {
      switch (this.currentView) {
        case VIEWS.FORM:
          return 'booking-form';
        case VIEWS.LIST:
          return 'bookings-list';
        case VIEWS.ABOUT:
          return 'about-view';
        default:
          return 'booking-form';
      }
    },
    sortedBookings() {
      return this.bookings;
    },
    notificationClasses() {
      return ['notification', this.notification?.type];
    }
  },
  created() {
    this.loadBookings();
  },
  methods: {
    loadBookings() {
      this.bookings = bookingService.getAllBookings();
    },
    handleBooking(bookingData) {
      const result = bookingService.saveBooking(bookingData);
      
      if (result.success) {
        this.showNotification(NOTIFICATION_MESSAGES.BOOKING_SUCCESS, NOTIFICATION_TYPES.SUCCESS);
        this.loadBookings();
        this.currentView = VIEWS.LIST;
      } else {
        this.showNotification(result.error, NOTIFICATION_TYPES.ERROR);
      }
    },
    handleDelete(id) {
      const result = bookingService.deleteBooking(id);
      
      if (result.success) {
        this.showNotification(NOTIFICATION_MESSAGES.BOOKING_DELETED, NOTIFICATION_TYPES.SUCCESS);
        this.loadBookings();
      } else {
        this.showNotification(result.error, NOTIFICATION_TYPES.ERROR);
      }
    },
    showNotification(message, type = NOTIFICATION_TYPES.SUCCESS) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 4px;
  color: white;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background-color: #42b983;
}

.notification.error {
  background-color: #ff4444;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.bookings-list {
  margin-top: 30px;
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

h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
