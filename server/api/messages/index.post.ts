import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const { image, message, conversationId } = await readBody(event);


    const newMessage = await db.message.create({
        include: {
            sender: true
        },
        data: {
            body: message,
            image: image,
            conversation: {

                connect: {
                    id: conversationId
                }

            },
            sender: {
                connect: {
                    id: session.user?.id
                }
            }
        }
    })

    const updatedConversation = await db.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id
                }
            },

        },
        include: {
            users: true,
            messages: true
        }
    })

    // TODO: Pusher Stuff 


    return newMessage;

})