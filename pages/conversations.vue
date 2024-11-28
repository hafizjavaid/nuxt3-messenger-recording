<template>
    <Empty :label="'Select a conversation or start a new conversation'"></Empty>
</template>

<script setup lang="ts">


definePageMeta({
    middleware: 'protected',
    layout: 'conversations'
})


</script>

<style scoped></style>