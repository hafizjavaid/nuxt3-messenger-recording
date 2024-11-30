<template>
    <div v-if="status !== 'pending' && conversation" class="h-full flex flex-col">
        <!-- @vue-expect-error -->
        <ConversationHeader :conversation="conversation"></ConversationHeader>
        <!-- @vue-expect-error -->
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

// const { data: conversations } = useNuxtData('conversations');

const { conversationId } = useStore();

// const conversation = computed(() => {
//     if (conversations.value && Array.isArray(conversations.value)) {
//         return conversations.value.find(conversationItem => conversationItem.id === conversationId.value)
//     }
// })

const { data: conversation, status } = await useFetch(`/api/conversations/${conversationId.value}`)


</script>

<style scoped></style>