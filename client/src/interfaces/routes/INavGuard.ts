import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

interface INavGuard {
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ): void
}

export default INavGuard