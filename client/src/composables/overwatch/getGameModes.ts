import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import RequestError from '@/types/RequestError'
import GameMode from '@/interfaces/overwatch/GameModeInterface'
import Composable from '@/interfaces/ComposableInterface'

const getGameModes: Composable = () => {
  const isLoading = ref<boolean>(true)
  const data = ref<GameMode[]>()
  const error = ref<RequestError>()

  const load = async (): Promise<void> => {
      try {
          const results = (await axios.get('/api/overwatch/game-modes')).data
          
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