<template>
  <div>
    <message-item
      v-for="msg in messages"
      :key="msg.id"
      :message="msg"
      @reaction="$emit('reaction', $event)"
    />
  </div>
</template>

<script>
import MessageItem from "./MessageItem.vue";

export default {
    components: { 
        MessageItem 
    },
    props: {
        messages: {
            type: Array,
            required: true
        }
    },
    emits: ['reaction']
};
</script>
