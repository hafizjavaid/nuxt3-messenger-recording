<template>
    <div
        class="py-4 m-2 px-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex items-center gap-2 lg:gap-4 w-full">
        <UploadButton @on-change="onImageUpload"></UploadButton>
        <form @submit.prevent="onSubmit" class="flex items-center gap-2 lg:gap-4 w-full">
            <div class="relative w-full">
                <UInput required v-model="message" placeholder="Write a message" />
            </div>
            <UButton icon="i-heroicons-paper-airplane" :trailing="false" size="lg" type="submit"
                :disabled="isLoading || !message" />
        </form>
    </div>
</template>

<script setup lang="ts">


const onImageUpload = async (img: string) => {
    await sendMessage({
        conversationId: conversationId.value,
        image: img,
        message: message.value ? message.value : null
    });
    refreshNuxtData('conversations');


}

const message = ref('');

const { isLoading, showError, conversationId, toggleLoading } = useStore();

const onSubmit = async () => {

    if (!message.value.length) {
        return
    }

    await sendMessage({
        message: message.value,
        conversationId: conversationId.value,
    });

    message.value = '';

    refreshNuxtData('conversations');


}

const sendMessage = async (body: any) => {
    try {

        toggleLoading(true);
        await $fetch(`/api/messages`, {
            method: 'POST',
            body
        })
        message.value = '';

    } catch (error) {
        const err = handleError(error);
        showError(err);

    } finally {
        toggleLoading(false);
    }
}

</script>

<style scoped></style>