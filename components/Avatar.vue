<template>
    <UAvatar :src="user && user.avatarUrl ? user.avatarUrl : ''" :alt="user && user.name ? user.name : 'User Image'"
        :chip-color="isActive ? 'primary' : undefined" chip-text="" :chip-position="isActive ? 'top-right' : undefined"
        size="lg" class="object-cover" :icon="user && user.avatarUrl ? '' : 'i-heroicons-user-circle'"
        img-class="object-cover" />
</template>

<script setup lang="ts">
import type { User } from '@prisma/client';


const props = defineProps<{
    user: User | null
}>();

const { members } = useActiveList();

const isActive = computed(() => {
    if(props.user && members.value.includes(props.user?.id)){
        return true
    }
    return false
});

</script>

<style scoped></style>