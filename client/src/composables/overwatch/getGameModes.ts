import { ref, Ref } from 'vue'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { useStore } from '@/store/store'

import RequestError from '@/types/RequestError'
import IGameMode from '@/interfaces/overwatch/IGameMode'
import IComposable from '@/interfaces/IComposable'

const getGameModes: IComposable<undefined> = () => {
  const isLoading: Ref = ref<boolean>(true)
  const data: Ref = ref<IGameMode[]>()
  const error: Ref = ref<RequestError>()

  const load = async (): Promise<void> => {
      const { state: { user: { token } } } = useStore()

      const reqConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
          const results = (await axios.get('/api/overwatch/game-modes', reqConfig)).data
          
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

export default getGameModes