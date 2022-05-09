import { Ref } from 'vue'
import RequestError from '@/types/RequestError'

interface IComposable<T> {
    (param?: T): {
        data: any,
        error: RequestError,
        isLoading: Ref<boolean>,
        load(): Promise<void>
    }
}

export default IComposable