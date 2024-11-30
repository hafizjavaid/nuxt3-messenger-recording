import { H3Event } from 'h3';
import { pusherServer } from '~/server/utils/pusher';
export default defineEventHandler(async (event: H3Event) => {
    await requireUserSession(event);
    const session = await getUserSession(event)
    const {
        socket_id,
        channel_name,
    } = await readBody(event);
    if (session.user?.id) {
        const data = {
            user_id: session.user.id,
        };
        const authResponse = pusherServer.authorizeChannel(socket_id, channel_name, data);
        return authResponse
    }
})