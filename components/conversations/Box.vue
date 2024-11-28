<template>
    <div @click="handleClick(conversation.id)"
        class="w-full relative flex items-center space-x-3 p-3 rounded-lg transition cursor-pointer bg-white dark:bg-gray-900 hover:bg-neutral-100 dark:hover:bg-gray-700"
        :class="[selected ? 'bg-neutral-200 dark:bg-gray-600' : 'bg-white dark:bg-gray-900']">
        <Avatar :user="otherUser[0]" />
        <div class="min-w-0 flex-1">
            <div class="focus:outline-none">
                <span class="absolute inset-0" aria-hidden="true" />
                <div class="flex justify-between items-center mb-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                        {{ conversation.isGroup && conversation.name ? conversation.name : otherUser[0].name }}
                    </p>
                    <p v-if="lastMessage?.createdAt" class="text-xs text-gray-400 font-light">
                        {{ useDateFormat(new Date(lastMessage.createdAt), 'hh:mm A').value.slice(1) }}
                    </p>
                </div>
                <p class="truncate text-sm text-gray-900 dark:text-white font-medium">
                    {{ lastMessageText }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client';
import type { FullConversation } from '~/types';

const props = defineProps<{
    conversation: FullConversation
    selected?: boolean
}>();

const { isLoading, toggleLoading, showError } = useStore();

const { user: existingUser } = useUserSession();

const otherUser = computed(() => props.conversation.users.filter(user => user.id !== existingUser.value?.id))

const handleClick = async (id: string) => {

    try {

        console.log(id);


    } catch (error) {

        const err = handleError(error);
        showError(err);

    } finally {

        toggleLoading(false)
    }


}

const lastMessage = computed(() => {
    const messages = props.conversation.messages || [];

    return messages[messages.length - 1]
})

const lastMessageText = computed(() => {
    if (lastMessage.value && lastMessage.value.image) {
        return 'Sent an attachment'
    }
    if (lastMessage.value && lastMessage.value.body) {
        return lastMessage.value.body
    }

    return 'Started a conversation'
})

</script>

<style scoped></style>