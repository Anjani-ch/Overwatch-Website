import axios, { AxiosError } from 'axios'
import { ref, Ref } from 'vue'

import RequestError from '@/types/RequestError'
import IMap from '@/interfaces/overwatch/IMap'
import IComposable from '@/interfaces/IComposable'

const getMaps: IComposable<undefined> = () => {
  const isLoading: Ref = ref<boolean>(true)
  const data: Ref = ref<IMap[]>()
  const error: Ref = ref<RequestError>()

  const load = async (): Promise<void> => {
      try {
          const results = (await axios.get('/api/overwatch/maps')).data
          
          data.value = results
        } catch (err: any) {
          if(err.response.status === 500) {
            error.value = 'Error getting maps'
          } else if(err instanceof AxiosError) {
            error.value = err.message
          }
        } finally {
          isLoading.value = false
        }
  }

  return {
    data,
    error,
    isLoading,
    load
  }
}

export default getMaps