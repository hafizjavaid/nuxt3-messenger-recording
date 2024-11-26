<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
const items = [{
    slot: 'login',
    label: 'Login',
    description: 'Enter your credentials to access your account.'
}, {
    slot: 'register',
    label: 'Register',
    description: 'Enter your credentials to create your account.'
}]
const selectedItem = ref(0);
const loginForm = reactive({ email: 'hafiz@gmail.com', password: 'Password@123' })
const registerForm = reactive({ name: 'hafiz', email: 'hafiz@gmail.com', password: 'Password@123' })

const { fetch: refreshSession, user } = useUserSession();

const { isLoading, toggleLoading, showMessage, showError } = useStore();

const login = async (event: FormSubmitEvent<LoginSchema>) => {
    try {

        toggleLoading(true);
        const user = await $fetch('/api/auth/login', {
            method: 'POST',
            body: event.data
        })
        showMessage({
            title: 'User loggedIn'
        })
        await refreshSession();

        await navigateTo('/users');


    } catch (error) {

        const err = handleError(error);
        showError(err);

    } finally {
        toggleLoading(false);

    }

}
const register = async (event: FormSubmitEvent<RegisterSchema>) => {
    try {
        toggleLoading(true);
        const user = await $fetch('/api/auth/register', {
            method: 'POST',
            body: event.data
        })
        console.log(user);
        selectedItem.value = 0;


    } catch (error) {

        const err = handleError(error);
        showError(err);


    } finally {
        toggleLoading(false);
    }

}

watchEffect(() => {
    if (user.value) {
        navigateTo('/users')
    }
})
</script>

<template>
    <UTabs v-model="selectedItem" :items="items" class="w-full max-w-md mx-auto">
        <template #login="{ item }">
            <UCard>
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>
                <UForm :schema="loginSchema" :state="loginForm" @submit="login" class="space-y-4">
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="loginForm.email" type="email" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput v-model="loginForm.password" type="password" />
                    </UFormGroup>
                    <div class="space-y-5 mt-5">
                        <UButton :disabled="isLoading" type="submit" block> Login </UButton>
                        <div class="flex items-center align-center text-center w-full flex-row">
                            <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
                            <div class="font-medium text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap">
                                <span class="text-sm">or</span>
                            </div>
                            <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
                        </div>

                        <a class="block" href="/api/auth/github">
                            <UButton :disabled="isLoading" icon="i-lucide-github" squar block color="gray">
                                Continue with Github
                            </UButton>
                        </a>
                    </div>

                </UForm>
            </UCard>
        </template>
        <template #register="{ item }">
            <UCard>
                <template #header>
                    <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ item.label }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {{ item.description }}
                    </p>
                </template>
                <UForm :schema="registerSchema" :state="registerForm" @submit="register" class="space-y-4">
                    <UFormGroup label="Name" name="name">
                        <UInput v-model="registerForm.name" />
                    </UFormGroup>
                    <UFormGroup label="Email" name="email">
                        <UInput v-model="registerForm.email" type="email" />
                    </UFormGroup>
                    <UFormGroup label="Password" name="password">
                        <UInput v-model="registerForm.password" type="password" />
                    </UFormGroup>

                    <div class="space-y-5 mt-5">
                        <UButton :disabled="isLoading" type="submit" block> Register </UButton>
                        <div class="flex items-center align-center text-center w-full flex-row">
                            <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
                            <div class="font-medium text-gray-700 dark:text-gray-200 flex mx-3 whitespace-nowrap">
                                <span class="text-sm">or</span>
                            </div>
                            <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-solid"></div>
                        </div>

                        <a class="block" href="/api/auth/github">
                            <UButton :disabled="isLoading" icon="i-lucide-github" squar block color="gray">
                                Continue with Github
                            </UButton>
                        </a>
                    </div>
                </UForm>
            </UCard>
        </template>
    </UTabs>
</template>
