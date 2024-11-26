<template>
    <div>
        <pre>{{ user }}</pre>
        <button @click="logout" >Logout</button>
    </div>
</template>

<script setup lang="ts">

const { user, clear } = useUserSession();

definePageMeta({
    middleware: 'protected'
})

const logout = async () => {
    await clear();
    await navigateTo('/')
}

</script>

<style scoped></style>