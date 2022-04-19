export default {
    set(key: string, data: any, expire: number = 0) {
        interface LocalStorageInterface {
            data: any
            expire?: number
        }
        const obj: LocalStorageInterface = {
            data: data
        }

        if (expire > 0) {
            expire = new Date().getTime() + expire
            obj['expire'] = expire
        }

        localStorage.setItem(key, JSON.stringify(obj))
    },
    get(key: string): any {
        let item = localStorage.getItem(key)

        if (!item) {
            return null
        }

        try {
            let obj = JSON.parse(item)
            if (!obj) {
                return null
            }
            const data = obj['data']
            const expire = obj['expire']
            if (!data) {
                return null
            }
            if (expire && expire < new Date().getTime()) {
                localStorage.removeItem(key)
                return null
            }
            return data
        } catch (error) {
            return null
        }
    },
    remove(key: string) {
        localStorage.removeItem(key)
    }
}
