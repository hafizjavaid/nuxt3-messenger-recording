<template>
    <aside
        class="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto lg:border-r-[1px] dark:border-gray-700 block w-full left-0 bg-white dark:bg-gray-900">

        <div class="px-5">
            <div class="flex justify-between mb-4 pt-4">
                <div class="text-2xl font-bold text-neutral-800 dark:text-white">Messages</div>
                <slot />
            </div>
            <template v-if="!pending && items">
                <ConversationsBox v-for="item in items" :key="item.id" :conversation="item" />
            </template>
            <template v-else>
                <Skeleton />
            </template>
        </div>

    </aside>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client';
import type { FullConversation } from '~/types';


interface ConversationListProps {

    items: FullConversation[] | null;
    pending: boolean

}

defineProps<ConversationListProps>();
</script>

<style scoped></style>