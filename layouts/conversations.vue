<template>
    <!-- Layout -->
    <!-- UsersList -->
    <Layout>
        <ConversationsList :items="conversationItems" :pending="status === 'pending' ? true : false">
        </ConversationsList>

        <div class="lg:pl-80 h-[100dvh] lg:block">
            <slot></slot>
        </div>
    </Layout>

</template>

<script setup lang="ts">

import type { FullConversation } from '~/types';

const { data: users, status } = await useLazyFetch('/api/users', {
    key: 'chat-users',
    server: false,
    transform: (allUsers) => allUsers.map(user => {
        return {
            ...user,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),

        }
    })
})

const { data: conversations } = await useLazyFetch('/api/conversations', {
    key: 'conversations',
    server: false,
})

const conversationItems = ref<FullConversation[]>([]);


watchEffect(() => {
    if (conversations.value) {
        conversationItems.value = conversations.value as any[]
    } else {
        conversationItems.value = []
    }
})
</script>

<style scoped></style>