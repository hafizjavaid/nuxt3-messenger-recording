import db from '~/utils/db'


export default defineEventHandler(async (event) => {

    await requireUserSession(event);

    const session = await getUserSession(event);

    const users = await db.user.findMany({
        where: {
            NOT: {
                id: session.user?.id
            }
        }
    })

    return users;



})