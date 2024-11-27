<template>
    <aside
        class="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto lg:border-r-[1px] dark:border-gray-700 block w-full left-0 bg-white dark:bg-gray-900">

        <div class="px-5 space-y-1 ">
            <div class="flex flex-col">
                <div class="text-2xl font-bold text-neutral-800 py-4 dark:text-white">People</div>
            </div>
            <Skeleton v-if="pending"></Skeleton>
            <template v-else>

                <!-- <div v-for="item in items" :key="item.id"> {{ item.name }} </div> -->
                <UsersBox v-for="item in items" :key="item.id" :user="item"></UsersBox>

            </template>
        </div>

    </aside>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client';

interface UserListProps {

    items: User[] | null;
    pending: boolean

}

defineProps<UserListProps>();
</script>

<style scoped></style>