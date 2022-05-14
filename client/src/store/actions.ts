import { ActionTree } from 'vuex'
import axios from 'axios'

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
    async [ActionTypes.LOGOUT_USER](context) {

    }
}

export default actions