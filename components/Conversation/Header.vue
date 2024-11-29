<template>
    <div
        class="bg-white dark:bg-gray-900 w-full flex border-b-[1px] dark:border-gray-700 sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div class="flex gap-3 items-center">
            <NuxtLink to="/conversations"
                class="lg:hidden block text-primary hover:text-primary/70 transition cursor-pointer">
                <Icon name="heroicons:chevron-left" size="32" />
            </NuxtLink>

            <Avatar :user="otherUser[0]" />
            <div class="flex flex-col">
                <div>{{ conversation.isGroup && conversation.name ? conversation.name : otherUser[0].name }}</div>
                <div class="text-sm font-light text-neutral-500">{{ statusText }}</div>
            </div>

        </div>
        <Icon name="heroicons:ellipsis-horizontal" size="32"
            class="text-primary cursor-pointer hover:text-primary/70 transition" @click="isDrawerVisible = true" />
    </div>
    <ConversationDrawer :is-open="isDrawerVisible" @close-modal="isDrawerVisible = false" :conversation="conversation"  ></ConversationDrawer>
</template>

<script setup lang="ts">
import type { FullConversation } from '~/types';

interface HeaderProps {
    conversation: FullConversation
}

const props = defineProps<HeaderProps>();

const { user } = useUserSession();

const otherUser = computed(() => props.conversation.users.filter(u => u.id !== user.value?.id))


const isActive = computed(() => {

    return false
})

const statusText = computed(() => {
    if (props.conversation.isGroup) {
        return `${props.conversation.users.length} members`
    }
    return isActive.value ? 'Online' : 'Offline'
})

const isDrawerVisible = ref(false)

</script>

<style scoped></style>