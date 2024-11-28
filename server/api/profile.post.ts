import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const { image } = await readBody(event)

    const updatedUser = await db.user.update({
        where: {
            id: session.user?.id,
            email: session.user?.email
        },
        data: {
            avatarUrl: image
        }
    })

    const transformedUser = sanitizeUser(updatedUser);

    if (transformedUser) {
        await setUserSession(event, {
            user: transformedUser
        })
    }

    return transformedUser;



})