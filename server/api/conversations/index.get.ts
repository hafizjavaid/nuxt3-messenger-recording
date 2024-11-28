import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const conversations = await db.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: session.user.id
                }
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
        return conversations;
    }

})