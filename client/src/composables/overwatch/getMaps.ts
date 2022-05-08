import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import RequestError from '@/types/RequestError'
import Map from '@/interfaces/overwatch/MapInterface'
import Composable from '@/interfaces/ComposableInterface'

const getMaps: Composable<undefined> = () => {
  const isLoading = ref<boolean>(true)
  const data = ref<Map[]>()
  const error = ref<RequestError>()

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