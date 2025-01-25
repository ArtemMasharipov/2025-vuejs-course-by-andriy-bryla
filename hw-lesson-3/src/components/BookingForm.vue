<template>
  <div class="booking-form card">
    <h2>Hotel Room Booking</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="fullName">Full Name:</label>
        <input
          id="fullName"
          v-model.trim="formData.fullName"
          class="form-control"
          type="text"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model.trim="formData.email"
          type="email"
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="checkIn">Check-in Date:</label>
          <input
            id="checkIn"
            v-model="formData.checkIn"
            type="date"
            :min="today"
            required
          />
        </div>

        <div class="form-group">
          <label for="checkOut">Check-out Date:</label>
          <input
            id="checkOut"
            v-model="formData.checkOut"
            type="date"
            :min="formData.checkIn"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests:</label>
        <select id="guests" v-model="formData.guests" required>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>

      <div class="form-group">
        <label for="roomType">Room Type:</label>
        <select id="roomType" v-model="formData.roomType" class="form-control" required>
          <option v-for="type in roomTypes" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Book Now</button>
    </form>
  </div>
</template>

<script>
import { ROOM_TYPES, GUEST_OPTIONS } from '@/constants';

export default {
  name: "BookingForm",
  emits: ['booking-submitted'],
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        roomType: "standard"
      },
      roomTypes: ROOM_TYPES,
      guestOptions: GUEST_OPTIONS
    };
  },
  computed: {
    today() {
      return new Date().toISOString().split('T')[0];
    }
  },
  methods: {
    submitForm() {
      this.$emit('booking-submitted', { ...this.formData });
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        fullName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "2",
        roomType: "standard"
      };
    }
  }
};
</script>

<style scoped>
.booking-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #3aa876;
}
</style>
