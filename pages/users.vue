<template>

    <!-- <pre>
    {{ members }}
  </pre> -->

    <Empty :label="'Select a user or start a new conversation'"></Empty>
</template>

<script setup lang="ts">

const { user, clear } = useUserSession();

const { members } = useActiveList();

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