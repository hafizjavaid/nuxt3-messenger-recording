

import type { Channel, Members } from 'pusher-js'

export default () => {


    const { pusherClient } = useNuxtApp();

    const { setMembers, addMember, removeMember } = useActiveList();

    const activeChannel = ref<Channel | null>(null);

    onMounted(() => {

        let channel = activeChannel.value

        if (!channel) {
            // @ts-ignore
            channel = pusherClient.subscribe('presence-nuxt-messenger');
            activeChannel.value = channel;
        }

        channel?.bind("pusher:subscription_succeeded", (members: Members) => {

            const initialMembers: string[] = []

            members.each((member: Record<string, any>) => initialMembers.push(member.id));

            setMembers(initialMembers);

        })

        channel?.bind("pusher:member_added", (member: Record<string, any>) => {

            addMember(member.id);

        })


        channel?.bind("pusher:member_removed", (member: Record<string, any>) => {
            console.log('member_removed');
            removeMember(member.id);
        });

    })


    onUnmounted(() => {
        if (activeChannel.value) {
          
            // @ts-ignore
            pusherClient.unsubscribe('presence-nuxt-messenger');
            activeChannel.value = null
        }
    })


}