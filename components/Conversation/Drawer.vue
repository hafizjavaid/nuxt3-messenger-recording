<script setup lang="ts">
import type { FullConversation } from '~/types';

const props = defineProps<{
    isOpen: boolean,
    conversation: FullConversation
}>();

const emit = defineEmits(['closeModal']);

const isModalVisible = computed({
    get() {
        return props.isOpen
    },
    set() {
        emit('closeModal');
    }
});

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

const title = computed(() => {
    return props.conversation.isGroup ? props.conversation.name : otherUser.value[0].name
})

const confirmOpen = ref(false)

const joinedDate = computed(() => {
    if (otherUser.value[0]) {
        return useDateFormat(new Date(otherUser.value[0].createdAt), 'MMMM DD, YYYY').value;
    }
    return '';
});
</script>

<template>
    <USlideover v-model="isModalVisible">
        <UCard class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="$emit('closeModal')" />
                </div>
            </template>

            <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <div class="flex flex-col items-center">
                    <div class="mb-2">
                        <Avatar :user="otherUser[0]" />
                    </div>
                    <div>
                        {{ title }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-300">
                        {{ statusText }}
                    </div>
                    <div class="flex gap-10 my-8">
                        <div @click="confirmOpen = true"
                            class="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75">
                            <div
                                class="w-10 h-10 bg-neutral-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <Icon name="ion:trash" size="20" />
                            </div>
                            <div class="text-sm font-light text-neutral-600 dark:text-gray-100">
                                Delete
                            </div>
                        </div>
                    </div>

                    <div class="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                        <dl class="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            <div v-if="conversation.isGroup">
                                <dt
                                    class="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                    Group Members
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
                                    {{ conversation.users.map((user) => user.name).join(', ') }}
                                </dd>
                            </div>
                            <div v-if="!conversation.isGroup">
                                <dt
                                    class="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                    Name
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
                                    {{ otherUser[0].name }}
                                </dd>
                                <div class="mt-2" >
                                    <dt
                                        class="text-sm font-medium text-gray-500 dark:text-gray-300 sm:w-40 sm:flex-shrink-0">
                                        Joined
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:col-span-2">
                                        <time :dateTime="joinedDate"> {{ joinedDate }} </time>
                                    </dd>
                                </div>
                            </div>

                        </dl>
                    </div>
                </div>
            </div>

            <template #footer>
                <!-- <Placeholder class="h-8" /> -->
            </template>
        </UCard>
    </USlideover>

    <ConversationConfirm :isOpen="confirmOpen" @closeModal="confirmOpen = false" ></ConversationConfirm>
</template>