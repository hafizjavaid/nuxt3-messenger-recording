<template>
    <Empty :label="'Select a user or start a new conversation'"></Empty>
</template>

<script setup lang="ts">

const { user, clear } = useUserSession();

definePageMeta({
    middleware: 'protected',
    layout: 'users'
})

const logout = async () => {
    await clear();
    await navigateTo('/')
}

</script>

<style scoped></style>