<template>
    <UModal v-model="isModalVisible" prevent-close>
        <form @submit.prevent="onSubmit">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                Create a group chat
                            </h3>
                            <p class="text-sm text-gray-500">Create a chat with more than 2 people.</p>
                        </div>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="$emit('closeModal')" />
                    </div>
                </template>

                <div>
                    <div class="flex flex-col gap-y-8">
                        <UFormGroup label="Name" name="name">
                            <UInput v-model="name" required />
                        </UFormGroup>
                        <USelectMenu v-model="members" :options="options" option-attribute="label"
                            placeholder="Select memebers" multiple required>
                            <template #label>
                                <span v-if="members.length" class="truncate">{{
                                    members.map((m) => m.label).join(', ')
                                    }}</span>
                                <span v-else>Select memebers</span>
                            </template>
                        </USelectMenu>
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
import type { User } from '@prisma/client';


const props = defineProps<{
    isOpen: boolean,
    users: User[]
}>();

const emit = defineEmits(['closeModal']);

const name = ref('');

const options = computed(() => {
    return props.users.map(user => {
        return {
            value: user.id,
            label: user.name
        }
    })
})

const members = ref<Record<string, any>[]>([]);


const isModalVisible = computed(() => props.isOpen);

const { isLoading, toggleLoading, showError, showMessage } = useStore();


const onSubmit = async () => {
    try {

        toggleLoading(true);

        console.log(members.value);
        

        await $fetch('/api/conversations', {
            method: 'POST',
            body: {
                isGroup: true,
                members: members.value,
                name: name.value
            }
        })
        await refreshNuxtData('conversations');
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