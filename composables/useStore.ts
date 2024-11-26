

import type { APIError } from '~/types'


interface State {

    isLoading: boolean
    appError: APIError | null

}

const state = reactive<State>({
    isLoading: false,
    appError: null
})


export default () => {

    const { isLoading, appError } = toRefs(state);
    const toast = useToast()

    const toggleLoading = (v: boolean) => {
        state.isLoading = v;
    }

    const toggleError = (error: null | APIError) => {
        state.appError = error
    }

    const showMessage = (content: { title: string, description?: string }) => {

        toast.clear();
        toast.add({
            title: content.title,
            description: content.description,
            color: 'primary'
        })

    }
    const showError = (error: APIError) => {

        toast.clear();
        toast.add({
            title: error.statusCode + '',
            description: error.message ? error.message : error.statusMessage,
            color: 'red'
        })

    }

    return {
        isLoading,
        appError,
        showMessage,
        showError,
        toggleLoading,
        toggleError
    }



}