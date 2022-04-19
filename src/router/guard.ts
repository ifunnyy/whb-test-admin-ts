import { Router, RouteLocationNormalized } from 'vue-router'

// 路由守卫
// 可以在组件通过 router.meta.auth 设置是否需要登录
class Guard {
    constructor(private router: Router) {}
    run() {
        this.router.beforeEach(this.beforeEach.bind(this))
    }

    private async beforeEach(
        to: RouteLocationNormalized,
        from: RouteLocationNormalized
    ) {
        if (to.name == 'admin') {
            return { name: 'data' }
        }
    }
}

export default (router: Router) => {
    new Guard(router).run()
}
