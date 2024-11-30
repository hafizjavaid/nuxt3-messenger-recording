export const handleError = (error: any) => {
    const generalMessage = "An unexpected error occured"
    let statusCode = 500;
    let statusMessage = "unexpected error"
    let message = generalMessage
    let data = undefined

    if (error.response) {

        // console.log(error.response);
        
        statusCode = error.response.status
        statusMessage = error.response.statusText

        if (error.response._data) {
            data = error.response._data && error.response.errors ? error.response.errors : undefined
            message = error.response._data && error.response._data.message ? error.response._data.message : generalMessage
        }

    }

    return {
        statusCode,
        statusMessage,
        message,
        data
    }

}