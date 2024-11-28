<template>
    <div>

        <div
            class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white dark:bg-gray-900 lg:border-r-[1px] dark:border-gray-700 lg:pb-4 lg:flex lg:flex-col justify-between">
            <nav class="mt-4 flex flex-col justify-between">
                <ul class="flex flex-col items-center space-y-1">
                    <UTooltip v-for="item in routes" :key="item.label" :text="item.label"
                        :popper="{ placement: 'right' }">
                        <li @click="handleClick(item)">
                            <div class="group flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary"
                                :class="{ 'bg-gray-100 text-primary dark:bg-gray-700 dark:text-white': item.active }">
                                <Icon :name="item.icon" class="h-5 w-5 shrink-0"></Icon>
                                <span class="sr-only">{{ item.label }}</span>
                            </div>
                        </li>
                    </UTooltip>
                </ul>
            </nav>
            <!--  -->

            <div class=" mt-4 flex space-y-2 justify-between items-center">
                <div @click="isOpen = true" class="cursor-pointer hover:opacity-75 transition">
                    <!-- @vue-expect-error -->
                    <Avatar :user="user"></Avatar>
                </div>

            </div>
        </div>

    </div>

    <SettingsModal :is-open="isOpen" @close-modal="isOpen = false"></SettingsModal>
</template>

<script setup lang="ts">

const { routes } = useRoutes();
const { user } = useUserSession();

const isOpen = ref(false);

const handleClick = (item: any) => {
    console.log(item);

    if (item.onClick) {
        return item.onClick();
    }
    return navigateTo(`${item.href}`)
}


</script>

<style scoped></style>