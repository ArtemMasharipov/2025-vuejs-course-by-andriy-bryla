<template>
    <v-dialog v-model="localDialog" :max-width="maxWidth" :persistent="persistent" @click:outside="handleCancel">
        <v-card>
            <v-card-title>
                <v-icon v-if="icon" :icon="icon" class="me-2" :color="iconColor"></v-icon>
                {{ title }}
            </v-card-title>

            <v-card-text>
                <slot name="content">
                    {{ message }}
                </slot>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :variant="cancelVariant" :color="cancelColor" @click="handleCancel" :disabled="loading">
                    {{ cancelText }}
                </v-btn>

                <v-btn :color="confirmColor" @click="handleConfirm" :loading="loading">
                    {{ confirmText }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ConfirmModal',
    props: {
        title: {
            type: String,
            default: 'Confirm Action',
        },
        message: {
            type: String,
            required: true,
        },
        
        confirmText: {
            type: String,
            default: 'Confirm',
        },
        
        cancelText: {
            type: String,
            default: 'Cancel',
        },
        modelValue: {
            type: Boolean,
            default: false,
        },
        maxWidth: {
            type: [String, Number],
            default: '400px',
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: 'mdi-alert',
        },
        iconColor: {
            type: String,
            default: 'warning',
        },
        confirmColor: {
            type: String,
            default: 'error',
        },
        cancelColor: {
            type: String,
            default: 'grey',
        },
        
        cancelVariant: {
            type: String,
            default: 'outlined',
        },
    },
    emits: ['confirm', 'cancel', 'update:modelValue'],
    data() {
        return {
            loading: false,
        }
    },
    computed: {
        localDialog: {
            get() {
                return this.modelValue
            },
            set(value) {
                if (!value) {
                    this.handleCancel()
                }
                this.$emit('update:modelValue', value)
            },
        },
    },
    methods: {
        
        handleConfirm() {
            this.$emit('confirm')
            this.$emit('update:modelValue', false)
        },

        
        handleCancel() {
            this.$emit('cancel')
            this.$emit('update:modelValue', false)
        },
    },
}
</script>
