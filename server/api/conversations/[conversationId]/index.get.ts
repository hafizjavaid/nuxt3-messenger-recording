import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const conversation = await db.conversation.findUnique({
            where: {
                id: event.context.params?.conversationId
            },
            include: {
                users: {
                    select: {
                        id: true,
                        avatarUrl: true,
                        name: true,
                        createdAt: true
                    }
                },
                messages: {
                    include: {
                        sender: true
                    }
                }
            }
        })
        return conversation;
    }

})