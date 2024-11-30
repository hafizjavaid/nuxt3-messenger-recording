
import PusherClient from 'pusher-js';

export default defineNuxtPlugin(async (nuxtApp) => {
    nuxtApp.pusherClient = new PusherClient(useRuntimeConfig().public.pusherAppKey,
        {
            channelAuthorization: {
                endpoint: '/api/pusher/auth',
                transport: 'ajax',
            },
            cluster: 'ap2',
        }
    );
});