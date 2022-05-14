import MutationTypes from '@/enums/mutationTypes'

import IState from '@/interfaces/vuex/IState'
import IUser from '@/interfaces/IUser'

type Mutations<S = IState> = {
    [MutationTypes.SET_USER](state: S, payload: IUser | null): void,
    [MutationTypes.RESET_AUTH](state: S, payload: null): void
}

export default Mutations