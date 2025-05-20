<template>
    <div>
        
        <v-dialog v-model="dialogVisible" :max-width="getDialogWidth" persistent @click:outside="closeOnClickOutside">
            <component
                :is="dynamicComponent"
                v-if="dialogVisible && dialogType"
                v-bind="dialogData"
                @close="closeDialog"
            />
        </v-dialog>
    </div>
</template>

<script>
import { useUiStore } from '@/store'

export default {
    name: 'GlobalUI',
    computed: {
        uiStore() {
            return useUiStore()
        },

        dialogVisible() {
            return this.uiStore.dialogVisible
        },

        dialogType() {
            return this.uiStore.dialogType
        },

        dialogData() {
            return this.uiStore.dialogData
        },

        
        dynamicComponent() {
            if (!this.dialogType) return null

            
            const componentMap = {
                confirm: () => import('@/components/ui/ConfirmModal.vue'),
                
            }

            
            return componentMap[this.dialogType] || null
        },

        
        getDialogWidth() {
            const widthMap = {
                confirm: '400px',
            }

            return widthMap[this.dialogType] || '500px'
        },
    },

    methods: {
        closeDialog() {
            this.uiStore.closeDialog()
        },

        
        closeOnClickOutside() {
            
            if (this.dialogData && this.dialogData.persistent === false) {
                this.closeDialog()
            }
        },
    },
}
</script>
