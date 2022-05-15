import { ActionTree } from 'vuex'
import axios, { AxiosRequestConfig } from 'axios'

import ActionTypes from '@/enums/actionTypes'
import MutationTypes from '@/enums/mutationTypes'

import IState from '@/interfaces/vuex/IState'
import IActions from '@/interfaces/vuex/IActions'
import IUser from '@/interfaces/IUser'

const actions: ActionTree<IState, IState> & IActions = {
    async [ActionTypes.LOGIN_USER](context, loginData) {
        const { data } = await axios.post('/api/users/login', loginData)

        const updateAuthState: Function = (): void => {
            const dataToSave: IUser = {
                email: data.email,
                username: data.username,
                token: data.token,
                _id: data._id
            }

            localStorage.setItem('user', JSON.stringify(dataToSave))
            context.commit(MutationTypes.SET_USER, dataToSave)
        }

        let proceedToTwoFactor: boolean | undefined

        if(data.twoFactor) {
            proceedToTwoFactor = true
        } else {
            proceedToTwoFactor = false
        }

        if(data.twoFactor && loginData.isTwoFactorValid) {
            updateAuthState()
        } else if(data && !data.twoFactor) {
            updateAuthState()
        }

        return {
            proceedToTwoFactor,
            userID: data._id,
            isFirstLogin: data.isFirstLogin
        }
    },
    async [ActionTypes.SIGNUP_USER](context, signupData) {
        const user = (await axios.post('/api/users/signup', signupData)).data as IUser

        return user
    },
    async [ActionTypes.VERIFY_JWT_TOKEN](context, userData) {
        const reqConfig: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${userData.token}`
          }
        }
        
        const { isValid } = (await axios.post('/api/token/verify', { token: userData.token }, reqConfig)).data

        if(isValid) {
            context.commit(MutationTypes.SET_USER, userData)
        } else {
            context.commit(MutationTypes.RESET_AUTH, null)
        }
    }
}

export default actions