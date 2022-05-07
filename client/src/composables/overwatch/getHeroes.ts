import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

import RequestError from '@/types/RequestError'
import Hero from '@/interfaces/overwatch/HeroInterface'
import Composable from '@/interfaces/ComposableInterface'

const getHeroes: Composable = () => {
    const isLoading = ref<boolean>(true)
    const data = ref<Hero[]>()
    const error = ref<RequestError>()

    const load = async (): Promise<void> => {
        try {
            const results = (await axios.get('/api/overwatch/heroes')).data
            
            data.value = results
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

export default getHeroes