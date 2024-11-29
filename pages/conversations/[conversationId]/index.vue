<template>
    <div class="h-full flex flex-col"  >
        <ConversationHeader :conversation="conversation"></ConversationHeader>
        <ConversationBody :messages="conversation.messages"></ConversationBody>
        <ConversationForm></ConversationForm>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'protected',
    layout: 'conversations'
})

useHead({
    title: 'Conversation | Messenger',
});

const { data: conversations } = useNuxtData('conversations');

const { conversationId } = useStore();

const conversation = computed(() => {
    if (conversations.value && Array.isArray(conversations.value)) {
        return conversations.value.find(conversationItem => conversationItem.id === conversationId.value)
    }
})


</script>

<style scoped></style>