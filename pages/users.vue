<template>
    
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