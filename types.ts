import type { Conversation, Message, User } from "@prisma/client"

export type APIError = {

    statusCode: number,
    statusMessage: string,
    message: string,
    data?: Record<string, string>

}


export type FullMessage = Message & {
    sender: User
}

export type FullConversation = Conversation & {
    users: User[]
    messages: FullMessage[]
}