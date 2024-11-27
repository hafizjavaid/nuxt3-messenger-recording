<template>
    <div class="h-full">
        <LayoutDesktopSidebar></LayoutDesktopSidebar>
        <LayoutMobileNavigation></LayoutMobileNavigation>

        <main class="lg:pl-20 h-full">
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>