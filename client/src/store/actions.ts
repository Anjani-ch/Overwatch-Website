import { ActionTree } from 'vuex'
import axios from 'axios'

import ActionTypes from '@/enums/actionTypes'
import MutationTypes from '@/enums/mutationTypes'

import IState from '@/interfaces/vuex/IState'
import IActions from '@/interfaces/vuex/IActions'

const actions: ActionTree<IState, IState> & IActions = {
    async [ActionTypes.LOGIN_USER](context, loginData) {
        const data = {
            username: 'Test',
            email: 'test@test.com',
            password: 'test123',
            token: 'dsddsds'
        }

        context.commit(MutationTypes.SET_USER, data)
    },
    async [ActionTypes.SIGNUP_USER](context, signupData) {
        console.log(signupData)
        const { data } = await axios.post('/api/users/signup', signupData)

        if(data) {
            localStorage.setItem('user', JSON.stringify(data))
        }
        console.log('USER CREATED: ', data)
    },
    async [ActionTypes.LOGOUT_USER](context) {

    }
}

export default actions