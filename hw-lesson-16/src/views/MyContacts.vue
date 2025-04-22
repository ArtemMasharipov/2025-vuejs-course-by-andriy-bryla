<template>
  <v-container class="contacts-view">
    <h1 class="text-h3 mb-6">{{ $t('contacts.title') }}</h1>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-6">
          <v-card-title>{{ $t('contacts.form.title') }}</v-card-title>

          <v-card-text>
            <Form :validation-schema="schema" :initial-values="form" v-slot="{ errors, handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)">
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
              </form>
            </Form>
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
                <v-list-item-subtitle>
                  <a href="tel:+380441234567">{{ $t('contacts.info.phone.value') }}</a>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="fas fa-envelope">
                <v-list-item-title>{{ $t('contacts.info.email.title') }}</v-list-item-title>
                <v-list-item-subtitle>
                  <a href="mailto:info@example.com">{{ $t('contacts.info.email.value') }}</a>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item prepend-icon="fas fa-clock">
                <v-list-item-title>{{ $t('contacts.info.hours.title') }}</v-list-item-title>
                <v-list-item-subtitle>{{ $t('contacts.info.hours.value') }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        
      </v-col>
    </v-row>

    <v-dialog v-model="showSuccessDialog" max-width="500px">
      <v-card>
        <v-card-title>
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
import { createContactSchema, getEmptyContactForm } from '@/services/utils/validation/schemas/contactSchema';
import { Form } from 'vee-validate';

export default {
  name: 'MyContacts',
  
  components: {
    Form
  },

  data() {
    return {
      loading: false,
      showSuccessDialog: false,
      form: getEmptyContactForm(),
      schema: null
    };
  },
  
  created() {
    this.schema = createContactSchema(this.$t.bind(this));
  },

  methods: {
    submitForm() {
      this.loading = true;
      
      setTimeout(() => {
        this.loading = false;
        this.resetForm();
        this.showSuccessDialog = true;
      }, 1500);
    },

    resetForm() {
      this.form = getEmptyContactForm();
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
