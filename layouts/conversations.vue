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
    // console.log(conversations.value);

    if (conversations.value) {
        conversationItems.value = conversations.value as any[]
    } else {
        conversationItems.value = []
    }
})

const { user } = useUserSession();

const { pusherClient } = useNuxtApp();

const { conversationId } = useStore();

const newHandler = async (conversation: FullConversation) => {
    if (!conversations.value) return;
    if (conversations.value.find((item) => item.id === conversation.id)) {
        return;
    }
    conversationItems.value = [...conversationItems.value, conversation];
};

const removeHandler = (conversation: FullConversation) => {
    if (!conversations.value) return;
    conversationItems.value = [...conversationItems.value.filter((convo) => convo.id !== conversation.id)];
    if (conversation.id === conversationId.value) {
        navigateTo('/conversations');
    }
};

const updateHandler = (conversation: FullConversation) => {
    conversationItems.value = conversationItems.value.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
            return {
                ...currentConversation,
                messages: conversation.messages,
            };
        }
        return currentConversation;
    });
};

onMounted(() => {
    if (user.value) {
        // @ts-ignore
        pusherClient.subscribe(user.value.id);
        // @ts-ignore
        pusherClient.bind('conversation:new', newHandler);
        // @ts-ignore
        pusherClient.bind('conversation:remove', removeHandler);
        // @ts-ignore
        pusherClient.bind('conversation:update', updateHandler);
    }
});
onBeforeUnmount(() => {
    if (user.value) {
        // @ts-ignore
        pusherClient.unsubscribe(user.value.id);
        // @ts-ignore
        pusherClient.unbind('conversation:new', newHandler);
        // @ts-ignore
        pusherClient.unbind('conversation:remove', removeHandler);
        // @ts-ignore
        pusherClient.unbind('conversation:update', updateHandler);
    }
});
</script>

<style scoped></style>