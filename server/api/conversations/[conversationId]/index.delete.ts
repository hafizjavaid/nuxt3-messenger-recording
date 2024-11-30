import { pusherServer } from '~/server/utils/pusher';
import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {

        const conversationId = event.context.params?.conversationId

        const existingConversation = await db.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if (!existingConversation) {
            throw createError({
                statusCode: 404,
                statusMessage: 'conversation not found'
            })
        }


        const deletedConversation = await db.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [session.user.id]
                }
            }
        })

        existingConversation.users.forEach(user => {
            if (user.id) {
                pusherServer.trigger(user.id, "conversation:remove", existingConversation);
            }
        })

        return deletedConversation;

    }

})