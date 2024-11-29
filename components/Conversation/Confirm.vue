<template>
    <UModal v-model="isModalVisible" prevent-close>
        <UCard>
            <template #header>
                <div class="flex items-center justify-end">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="$emit('closeModal')" />
                </div>
            </template>
            <div class="flex gap-x-2 items-start">
                <UButton icon="i-heroicons-exclamation-triangle" color="red" :trailing="false" size="md"
                    class="rounded-full" variant="soft" />
                <div>
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Delete conversation
                    </h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">
                            Are you sure you want to delete this conversation? This action cannot be
                            undone.
                        </p>
                    </div>
                </div>
            </div>
            <template #footer>
                <div class="sm:flex sm:flex-row-reverse gap-x-2">
                    <UButton color="red" variant="solid" :disabled="isLoading" @click="onDelete"
                        class="dark:text-white">Delete
                    </UButton>
                    <UButton :disabled="isLoading" variant="ghost" color="gray" @click="$emit('closeModal')">
                        Cancel
                    </UButton>
                </div>
            </template>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">

const props = defineProps<{
    isOpen: boolean,

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

const { isLoading, toggleLoading, showMessage, showError, conversationId } = useStore();



const onDelete = async () => {
    try {

        toggleLoading(true);
        await $fetch(`/api/conversations/${conversationId.value}`, {
            method: 'DELETE'
        })
        emit('closeModal')
        refreshNuxtData('conversations')
        await navigateTo('/conversations');

    } catch (error) {
        const err = handleError(error);
        showError(err);
    } finally {
        toggleLoading(false);

    }
}
</script>

<style scoped></style>