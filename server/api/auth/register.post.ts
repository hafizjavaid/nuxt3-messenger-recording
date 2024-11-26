import { sanitizeUser } from '~/server/utils/auth'
import db from '~/utils/db'
import { registerSchema } from '~/utils/schemas'


export default defineEventHandler(async (event) => {

    const { name, password, email } = await readValidatedBody(event, (body) => registerSchema.parse(body))


    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exist'
        })
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
        data: {
            email,
            hashedPassword,
            name
        }
    })


    const transformedUser = sanitizeUser(user);

    if (transformedUser) {
        await setUserSession(event, {
            user: transformedUser
        })
    }

    return transformedUser;

})