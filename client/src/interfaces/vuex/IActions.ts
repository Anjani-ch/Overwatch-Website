import AugmentedActionContext from '@/types/vuex/AugmentedActionContext'

import ActionTypes from '@/enums/actionTypes'

import LoginData from '@/types/auth/LoginData'
import SignupData from '@/types/auth/SignupData'
import IUser from '../IUser'

interface IActions {
    [ActionTypes.LOGIN_USER](context: AugmentedActionContext, payload: LoginData): Promise<object>,
    [ActionTypes.SIGNUP_USER](context: AugmentedActionContext, payload: SignupData): Promise<IUser>,
    [ActionTypes.VERIFY_JWT_TOKEN](context: AugmentedActionContext, payload: IUser): Promise<void>
}

export default IActions