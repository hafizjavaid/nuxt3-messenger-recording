import { sanitizeUser } from '~/server/utils/auth'
import db from '~/utils/db'
import { loginSchema } from '~/utils/schemas'


export default defineEventHandler(async (event) => {

    const { password, email } = await readValidatedBody(event, (body) => loginSchema.parse(body))


    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User Not Found'
        })
    }

    if (!existingUser.hashedPassword) {

        const connectedOAuthAccout = await db.oauthAccount.findFirst({
            where: {
                userId: existingUser.id
            }
        })
        if (connectedOAuthAccout) {
            const oAuthProvider = connectedOAuthAccout.providerId
            throw createError({
                statusCode: 400,
                statusMessage: `Account connected with ${oAuthProvider}. Please continue with ${oAuthProvider} to login`
            })
        }

    }

    if (existingUser.hashedPassword) {

        const isPasswordcorrect = await verifyPassword(existingUser.hashedPassword, password);

        if (!isPasswordcorrect) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid Credentials'
            })
        }

    }


    const transformedUser = sanitizeUser(existingUser);

    if (transformedUser) {
        await setUserSession(event, {
            user: transformedUser
        })
    }

    return transformedUser;

})