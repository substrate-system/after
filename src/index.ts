export function after (n:number):Promise<void> & ((count?:number)=>void) {
    let _n = 0

    let _resolve
    const promise = new Promise<void>(resolve => {
        _resolve = resolve
    })

    function plus (count?:number):void {
        if (_n > n) return
        if (count) {
            _n += count
        } else {
            _n++
        }

        if (_n === n) _resolve()
    }

    const proxy = new Proxy(plus, {
        apply (target, thisArg, ...rest:[any]) {
            return target.apply(thisArg, ...rest)
        },

        get (_target, prop) {
            const value = promise[prop]
            return typeof value === 'function' ? value.bind(promise) : value
        }
    })

    return (proxy as Promise<void> & ((count?:number)=>void))
}

export default after
