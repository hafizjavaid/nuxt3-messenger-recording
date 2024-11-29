<template>
    <div class="flex-1 overflow-y-auto">
        <MessageBox v-for="(message, i) in messages" :isLast="i === messages.length - 1" :key="message.id"
            :message="message" />
        <div class="pt-24" ref="bottomRef"></div>
    </div>
</template>

<script setup lang="ts">
import type { FullMessage } from '~/types';
interface BodyProps {
    messages: FullMessage[];
}
const props = defineProps<BodyProps>();

const bottomRef = ref<HTMLDivElement | null>(null);
</script>

<style scoped></style>