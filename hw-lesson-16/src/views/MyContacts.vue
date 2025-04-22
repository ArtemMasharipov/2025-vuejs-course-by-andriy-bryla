<template>
  <v-container class="contacts-view">
    <h1 class="text-h3 mb-6">{{ $t('contacts.title') }}</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6">
          <v-card-title>{{ $t('contacts.form.title') }}</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="form.name"
                :label="$t('contacts.form.name')"
                :error-messages="errors.name"
                required
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                :label="$t('contacts.form.email')"
                :error-messages="errors.email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="form.subject"
                :label="$t('contacts.form.subject')"
                :error-messages="errors.subject"
                required
              ></v-text-field>

              <v-textarea
                v-model="form.message"
                :label="$t('contacts.form.message')"
                :error-messages="errors.message"
                rows="5"
                required
              ></v-textarea>

              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                block
                size="large"
                class="mt-4"
              >
                {{ $t('contacts.form.send') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-6 mb-6">
          <v-card-title>{{ $t('contacts.info.title') }}</v-card-title>

          <v-card-text>
            <v-list>
              <v-list-item prepend-icon="fas fa-map-marker-alt">
                <v-list-item-title>{{ $t('contacts.info.address.title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('contacts.info.address.value') }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="fas fa-phone">
                <v-list-item-title>{{ $t('contacts.info.phone.title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('contacts.info.phone.value') }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="fas fa-envelope">
                <v-list-item-title>{{ $t('contacts.info.email.title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('contacts.info.email.value') }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="fas fa-clock">
                <v-list-item-title>{{ $t('contacts.info.hours.title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('contacts.info.hours.value') }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card class="pa-6">
          <v-card-title>{{ $t('contacts.social.title') }}</v-card-title>

          <v-card-text>
            <div class="d-flex justify-center">
              <v-btn icon class="mx-2" color="blue">
                <v-icon>fab fa-facebook</v-icon>
              </v-btn>

              <v-btn icon class="mx-2" color="blue-lighten-1">
                <v-icon>fab fa-twitter</v-icon>
              </v-btn>

              <v-btn icon class="mx-2" color="red">
                <v-icon>fab fa-instagram</v-icon>
              </v-btn>

              <v-btn icon class="mx-2" color="blue-darken-3">
                <v-icon>fab fa-linkedin</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showSuccessDialog" max-width="400">
      <v-card>
        <v-card-title class="bg-success text-white">
          <v-icon start icon="fas fa-check-circle" class="me-2"></v-icon>
          {{ $t('contacts.success.title') }}
        </v-card-title>
        <v-card-text class="pa-4">
          <p>{{ $t('contacts.success.message') }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showSuccessDialog = false">
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getEmptyContactForm, getEmptyErrors, validateContactForm } from '@/services/utils/validation/contactFormValidation';

export default {
  name: 'MyContacts',

  data() {
    return {
      loading: false,
      showSuccessDialog: false,
      form: getEmptyContactForm(),
      errors: getEmptyErrors()
    };
  },

  methods: {
    validate() {
      const { errors, isValid } = validateContactForm(this.form, this.$t.bind(this));
      this.errors = errors;
      return isValid;
    },

    clearErrors() {
      this.errors = getEmptyErrors();
    },

    submitForm() {
      if (this.validate()) {
        this.loading = true;

        setTimeout(() => {
          this.loading = false;
          this.resetForm();
          this.showSuccessDialog = true;
        }, 1500);
      }
    },

    resetForm() {
      this.form = getEmptyContactForm();
      this.clearErrors();
    }
  }
};
</script>

<style scoped>
.contacts-view {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>
