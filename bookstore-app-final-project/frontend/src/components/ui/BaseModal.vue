<template>
    <v-dialog
        v-model="dialog"
        :max-width="maxWidth"
        :persistent="persistent"
        :content-class="contentClass"
        :transition="transition"
        :overlay-opacity="overlayOpacity"
        @click:outside="handleOutsideClick"
    >
        <v-card class="base-modal-container" :elevation="elevation">
            <v-card-title v-if="$slots.title || title" class="modal-title">
                <slot name="title">{{ title }}</slot>
                <v-btn
                    v-if="showCloseButton"
                    icon="mdi-close"
                    size="small"
                    variant="text"
                    @click="close"
                    class="ml-auto"
                ></v-btn>
            </v-card-title>

            <v-divider v-if="$slots.title || title"></v-divider>

            <v-card-text :class="contentPadding">
                <slot></slot>
            </v-card-text>

            <v-divider v-if="$slots.actions"></v-divider>

            <v-card-actions v-if="$slots.actions">
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'BaseModal',
    props: {
        
        modelValue: {
            type: Boolean,
            default: false,
        },
        
        size: {
            type: String,
            default: 'medium',
            validator: (value) => ['small', 'medium', 'large', 'x-large', 'full'].includes(value),
        },
        
        width: {
            type: [String, Number],
            default: null,
        },
        
        title: {
            type: String,
            default: '',
        },
        
        persistent: {
            type: Boolean,
            default: false,
        },
        
        showCloseButton: {
            type: Boolean,
            default: true,
        },
        
        contentClass: {
            type: String,
            default: '',
        },
        
        contentPadding: {
            type: String,
            default: 'pa-4',
        },
        
        transition: {
            type: String,
            default: 'dialog-transition',
        },
        
        overlayOpacity: {
            type: [String, Number],
            default: 0.5,
        },
        
        elevation: {
            type: [String, Number],
            default: 4,
        },
    },
    emits: ['close', 'update:modelValue'],
    computed: {
        
        dialog: {
            get() {
                return this.modelValue
            },
            set(value) {
                if (!value) {
                    this.close()
                }
            },
        },
        
        maxWidth() {
            if (this.width) return this.width

            const sizes = {
                small: '400px',
                medium: '600px',
                large: '800px',
                'x-large': '1200px',
                full: '90vw',
            }
            return sizes[this.size] || sizes.medium
        },
    },
    methods: {
        
        close() {
            this.$emit('update:modelValue', false)
            this.$emit('close')
        },

        
        handleOutsideClick() {
            if (!this.persistent) {
                this.close()
            }
        },
    },
}
</script>

<style scoped>
.base-modal-container {
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.modal-title {
    display: flex;
    align-items: center;
}
</style>
