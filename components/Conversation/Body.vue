<template>
    <div class="flex-1 overflow-y-auto">
        <MessageBox v-for="(message, i) in apiMessages" :isLast="i === apiMessages.length - 1" :key="message.id"
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

const apiMessages = ref<FullMessage[]>(props.messages);

watch(() => props.messages, (updatedMessages) => {
    apiMessages.value = updatedMessages;
})

const { pusherClient } = useNuxtApp();
const { conversationId } = useStore();


const messagesHandler = async (message: FullMessage) => {
    
    await nextTick();
    bottomRef.value?.scrollIntoView();

    apiMessages.value = [...apiMessages.value, message]
}

onMounted(async() => {

    // @ts-ignore
    pusherClient.subscribe(conversationId.value);

    // @ts-ignore
    pusherClient.bind("messages:new", messagesHandler);

    await nextTick();
    bottomRef.value?.scrollIntoView();
})

onUnmounted(() => {

    // @ts-ignore
    pusherClient.unsubscribe(conversationId.value);

    // @ts-ignore
    pusherClient.unbind("messages:new", messagesHandler);

})

</script>

<style scoped></style>