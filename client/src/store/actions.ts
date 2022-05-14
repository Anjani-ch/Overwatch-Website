import { ActionTree } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

import ActionTypes from '@/enums/actionTypes'
import MutationTypes from '@/enums/mutationTypes'

import IState from '@/interfaces/vuex/IState'
import IActions from '@/interfaces/vuex/IActions'

const actions: ActionTree<IState, IState> & IActions = {
    async [ActionTypes.LOGIN_USER](context, loginData) {
        const { data } = await axios.post('/api/users/login', loginData)

        if(data) {
            localStorage.setItem('user', JSON.stringify(data))
            context.commit(MutationTypes.SET_USER, data)
        }
    },
    async [ActionTypes.SIGNUP_USER](context, signupData) {
        await axios.post('/api/users/signup', signupData)
    },
    async [ActionTypes.VERIFY_JWT_TOKEN](context, token) {
        const reqConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        
        const { isValid } = (await axios.post('/api/token/verify', { token }, reqConfig)).data

        return isValid
    }
}

export default actions