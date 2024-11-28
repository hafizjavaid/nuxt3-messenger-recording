<template>
    <div
        class="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 h-full flex justify-center items-center bg-gray-100 dark:bg-gray-900">
        <div class="text-center items-center flex flex-col">
            <h3 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {{ label }}
            </h3>
        </div>
    </div>
</template>
<script setup lang="ts">

defineProps<{
    label: string
}>();

</script>
<style scoped></style>