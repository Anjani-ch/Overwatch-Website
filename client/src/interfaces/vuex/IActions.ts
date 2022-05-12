import AugmentedActionContext from '@/types/vuex/AugmentedActionContext'

import ActionTypes from '@/enums/actionTypes'

import LoginData from '@/types/auth/LoginData'
import SignupData from '@/types/auth/SignupData'

interface IActions {
    [ActionTypes.LOGIN_USER](context: AugmentedActionContext, payload: LoginData): Promise<void>,
    [ActionTypes.SIGNUP_USER](context: AugmentedActionContext, payload: SignupData): Promise<void>
}

export default IActions