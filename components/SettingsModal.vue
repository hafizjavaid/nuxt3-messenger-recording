<template>
    <UModal v-model="isModalVisible" prevent-close>
        <form @submit.prevent="onSubmit">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Profile
                            </h3>
                            <p class="text-sm text-gray-500">Edit your public information.</p>
                        </div>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="$emit('closeModal')" />
                    </div>
                </template>

                <div>
                    <div class="flex items-center gap-x-3">
                        <UAvatar v-if="image" :src="image" alt="Avatar" />
                        <UAvatar v-else size="lg" icon="i-heroicons-user-circle" />
                        <UploadButton @on-change="(url: string) => image = url" label="Change profile image" />
                    </div>
                </div>

                <template #footer>
                    <div class="sm:flex sm:flex-row-reverse gap-x-2">
                        <UButton color="primary" variant="solid" :disabled="isLoading" type="submit">Save</UButton>
                        <UButton :disabled="isLoading" color="gray" @click="$emit('closeModal')">
                            Cancel
                        </UButton>
                    </div>
                </template>
            </UCard>

        </form>

    </UModal>
</template>

<script setup lang="ts">

const props = defineProps<{
    isOpen: boolean
}>();

const emit = defineEmits(['closeModal']);

const isModalVisible = computed(() => props.isOpen);

const { user, fetch } = useUserSession();

const image = ref(user.value?.avatarUrl || '');



const { isLoading, toggleLoading, showError, showMessage } = useStore();


const onSubmit = async () => {
    try {

        toggleLoading(true);

        await $fetch('/api/profile', {
            method: 'POST',
            body: {
                image: image.value
            }
        })

        await fetch();
        emit('closeModal');

    } catch (error) {

        const err = handleError(error);
        showError(err);

    } finally {
        toggleLoading(false);

    }
}

</script>

<style scoped></style>