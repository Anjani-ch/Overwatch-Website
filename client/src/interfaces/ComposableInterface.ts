import { Ref } from 'vue'
import RequestError from '@/types/RequestError'

interface Composable {
    (): {
        data: any,
        error: RequestError,
        isLoading: Ref<boolean>,
        load(): Promise<void>
    }
}

export default Composable