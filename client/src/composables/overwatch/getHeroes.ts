import { ref, Ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import RequestError from '@/types/RequestError'
import IHero from '@/interfaces/overwatch/IHero'
import IComposable from '@/interfaces/IComposable'

const getHeroes: IComposable<undefined> = () => {
    const isLoading: Ref = ref<boolean>(true)
    const data: Ref = ref<IHero[]>()
    const error: Ref = ref<RequestError>()

    const load = async (): Promise<void> => {
        const router: Router = useRouter()

        const token = JSON.parse(localStorage.getItem('user') as string).token

        const reqConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        try {
            const results = (await axios.get('/api/overwatch/heroes', reqConfig)).data
            
            data.value = results
          } catch (err: any) {
            if(err.response.status === 401) {
              router.push({ name: 'Login', params: {
                redirectMsg: 'You have to log in to view that page',
                redirectType: 'error',
                redirectTitle: 'Access Denied'
              }})
            } else if(err.response.status === 500) {
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