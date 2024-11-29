<template>
    <!-- Layout -->
    <!-- UsersList -->
    <Layout>
        <ConversationsList :items="conversationItems" :pending="status === 'pending' ? true : false">

            <UButton @click="isGroupChatModalVisible = true" class="rounded-full" icon="i-heroicons-user-plus" size="sm"
                color="primary" square variant="soft" />

        </ConversationsList>

        <div class="lg:pl-80 h-[100dvh] lg:block">
            <slot></slot>
        </div>
    </Layout>

    <GroupChatModal v-if="users" :users="users" :is-open="isGroupChatModalVisible"
        @close-modal="isGroupChatModalVisible = false"></GroupChatModal>

</template>

<script setup lang="ts">

import type { FullConversation } from '~/types';

const isGroupChatModalVisible = ref(false);
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
    console.log(conversations.value);
    
    if (conversations.value) {
        conversationItems.value = conversations.value as any[]
    } else {
        conversationItems.value = []
    }
})
</script>

<style scoped></style>