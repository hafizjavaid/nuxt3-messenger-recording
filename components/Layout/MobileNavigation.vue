<template>
    <div
        class="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-gray-900 dark:border-gray-700 border-t-[1px] lg:hidden">
        <UTooltip v-for="item in routes" :key="item.label" :text="item.label" :popper="{ placement: 'top' }">
            <div @click="handleClick(item)">
                <div class="group flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary"
                    :class="{ 'bg-gray-100 text-primary dark:bg-gray-700 dark:text-white': item.active }">
                    <Icon :name="item.icon" class="h-5 w-5 shrink-0"></Icon>
                    <!-- <span class="sr-only">{{ item.label }}</span> -->
                </div>
            </div>
        </UTooltip>
    </div>
</template>

<script setup lang="ts">

const { routes } = useRoutes();

const handleClick = (item: any) => {
    console.log(item);

    if (item.onClick) {
        return item.onClick();
    }
    return navigateTo(`${item.href}`)
}

</script>

<style scoped></style>