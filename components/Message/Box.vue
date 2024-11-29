<template>
    
    <div :class="{ 'justify-end': isOwn }" class="flex gap-3 p-4 items-center">
        <div :class="{ 'order-2': isOwn }">
            <!-- @vue-expect-error -->
            <Avatar :user="isOwn ? user : message.sender" />
        </div>
        <div :class="{ 'items-end': isOwn }" class="flex flex-col gap-2">
            <div class="flex items-center gap-1">
                <div class="text-sm text-gray-500">{{ message.sender.name }}</div>
                <div class="text-xs text-gray-400">
                    {{ useDateFormat(new Date(message.createdAt), 'hh:mm A').value.slice(1) }}
                </div>
            </div>
            <div class="text-sm w-fit overflow-hidden" :class="[
                isOwn
                    ? 'bg-primary text-white dark:text-gray-900'
                    : 'bg-white dark:bg-gray-900',
                    message.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3',
            ]">
                <NuxtImg v-if="message.image" height="288" width="288"
                    class="object-cover cursor-pointer hover:scale-110 transition translate" :src="message.image" />
                <div :class="[message.image && message.body ? 'p-4' : 'p-0']" v-if="message.body">
                    {{ message.body }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FullMessage } from '~/types';
interface MessageBoxProps {
    message: FullMessage;
    isLast?: boolean
}
const props = defineProps<MessageBoxProps>();


const { user } = useUserSession();

const isOwn = computed(() => user.value?.id === props.message.sender.id)

</script>

<style scoped></style>