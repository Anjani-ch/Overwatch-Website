import { ref, Ref } from 'vue'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import { useStore } from '@/store/store'

import RequestError from '@/types/RequestError'
import IHero from '@/interfaces/overwatch/IHero'
import IComposable from '@/interfaces/IComposable'

const getHero: IComposable<string> = key => {
  const isLoading: Ref = ref<boolean>(true)
  const data: Ref = ref<IHero[]>()
  const error: Ref = ref<RequestError>()

  const load = async (): Promise<void> => {
    const { state: { user: { token } } } = useStore()

    const reqConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const result = (await axios.get('/api/overwatch/heroes/' + key, reqConfig)).data
      
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