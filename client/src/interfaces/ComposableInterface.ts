import { Ref } from 'vue'
import RequestError from '@/types/RequestError'

interface Composable<T> {
    (param?: T): {
        data: any,
        error: RequestError,
        isLoading: Ref<boolean>,
        load(): Promise<void>
    }
}

export default Composable