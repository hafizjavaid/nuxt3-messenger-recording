import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const { userId } = await readBody(event);

        const existingConversation = await db.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [session.user.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, session.user.id]
                        }
                    }
                ]
            }
        })

        if (existingConversation.length) {
            console.log('Existing conversation');

            return existingConversation[0];
        }

        const newConversation = await db.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: session.user.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })
        console.log('New conversation');

        return newConversation;

    }

})