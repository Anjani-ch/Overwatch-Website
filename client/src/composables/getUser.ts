import { ref, Ref } from 'vue'
import { useRouter, Router } from 'vue-router'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

import RequestError from '@/types/RequestError'
import IMap from '@/interfaces/overwatch/IMap'
import IComposable from '@/interfaces/IComposable'

const getUser: IComposable<undefined> = () => {
  const isLoading: Ref = ref<boolean>(true)
  const data: Ref = ref<IMap[]>()
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
          const result = (await axios.get('/api/users/me', reqConfig)).data
          
          data.value = result
        } catch (err: any) {
          if(err.response.status === 401) {
            router.push({ name: 'Login', params: {
              redirectMsg: 'You have to log in to view that page',
              redirectType: 'error',
              redirectTitle: 'Access Denied'
            }})
          } else if(err.response.status === 500) {
            error.value = 'Error getting data'
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

export default getUser