import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import RequestError from '@/types/RequestError'
import Hero from '@/interfaces/overwatch/HeroInterface'
import Composable from '@/interfaces/ComposableInterface'

const getHero: Composable = key => {
  const isLoading = ref<boolean>(true)
  const data = ref<Hero[]>()
  const error = ref<RequestError>()

  const load = async (): Promise<void> => {
    try {
      let result = (await axios.get('/api/overwatch/heroes/' + key)).data

      result = {
        ...result,
        medias: result.medias.filter((media: any) => media.type !== 'pdf')
      }
      
      data.value = result
    } catch (err: any) {
      if(err.response.status === 500) {
        error.value = 'Error getting heroes'
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

export default getHero