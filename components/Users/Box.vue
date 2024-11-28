<template>
    <div @click="handleClick(user.id)">
        <div
            class="w-full relative flex items-center space-x-3 bg-white dark:bg-gray-900 p-3 hover:bg-neutral-100 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
            <Avatar :user="user"></Avatar>
            <div class="min-w-0 flex-1">
                <div class="focus:outline-none">
                    <span class="absolute inset-0" aria-hidden="true" />
                    <div class="flex justify-between items-center mb-1">
                        <p class="text-sm font-medium text-gray-900 dark:text-white">
                            {{ user.name }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client';

defineProps<{
    user: User
}>();

const { isLoading, toggleLoading, showError } = useStore();

const handleClick = async (id: string) => {

    try {

        toggleLoading(true);
        const data = await $fetch('/api/conversations', {
            method: 'POST',
            body: {
                userId: id
            }
        })

        if (data) {
            console.log(data);

        }

    } catch (error) {

        const err = handleError(error);
        showError(err);

    } finally {

        toggleLoading(false)
    }


}

</script>

<style scoped></style>