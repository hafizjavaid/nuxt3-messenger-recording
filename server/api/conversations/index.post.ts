import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    if (session.user) {


        const { userId, isGroup, members, name } = await readBody(event);

        console.log(members);


        if (isGroup && (!members || members.length < 2 || !name)) {

            throw createError({
                statusCode: 400,
                statusMessage: 'Fields are missing'
            })


        }

        if (isGroup) {


            const newGroupConversation = await db.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: session.user.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            })


            // TODO: Pusher Stuff 


            return newGroupConversation;

        }


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


        // TODO: Pusher Stuff 

        return newConversation;

    }

})