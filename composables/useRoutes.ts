export const useRoutes = () => {


    const { clear, fetch } = useUserSession();
    const { params } = useRoute();

    const colorMode = useColorMode();

    const isDark = computed({
        get() {
            return colorMode.value === 'dark'
        },
        set() {
            colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        }
    })

    const themeicon = computed(() => isDark.value ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid');

    const logout = async () => {
        await clear();
        await fetch();

        await navigateTo('/');
    }

    const routes = computed(() => {
        return [
            {
                label: 'Chat',
                href: '/conversations',
                icon: 'heroicons:chat-bubble-oval-left-ellipsis-solid',
                active: params.name === 'conversations'
            },
            {
                label: 'Users',
                href: '/users',
                icon: 'heroicons:users-20-solid',
                active: params.name === 'users'
            },
            {
                label: 'Logout',
                onClick: async () => await logout(),
                href: '#',
                icon: 'heroicons:arrow-left-on-rectangle',
            },
            {
                label: 'Toggle Theme',
                onClick: () => isDark.value = !isDark.value,
                href: '#',
                icon: themeicon.value,
            }
        ]
    })


    return {
        routes,
        isDark
    }

}