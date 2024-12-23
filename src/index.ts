export function after (n:number) {
    let _n = 0

    let _resolve
    const promise = new Promise<void>(resolve => {
        _resolve = resolve
    })

    function plus () {
        _n++
        if (_n === n) {
            _resolve()
        } else {
            // do nothing
        }
    }

    const proxy = new Proxy(plus, {
        apply (target, thisArg, _args) {
            return target.apply(thisArg, [])
        },

        get (target, prop) {
            const value = promise[prop]
            return typeof value === 'function' ? value.bind(promise) : value
        }
    })

    return (proxy as Promise<void> & (()=>void))
}

export default after
