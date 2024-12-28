import { test } from '@substrate-system/tapzero'
import { after } from '../src/index.js'

test('example', async t => {
    let n = 0
    const plus = after(3)

    plus()
    n++

    setTimeout(() => {
        plus()
        n++
    }, 100)

    setTimeout(() => {
        plus()
        n++
    }, 200)

    plus.then(() => {
        t.equal(n, 3, 'should resolve after we call it three times')
    })

    return plus
})

test('async style', async t => {
    let n = 0
    const next = after(3)

    setTimeout(() => {
        n++
        next()
    }, 100)
    setTimeout(() => {
        n++
        next()
    }, 200)
    setTimeout(() => {
        n++
        next()
    }, 300)

    const prevTime = Number(new Date())

    t.equal(n, 0, 'start at zero')

    await next

    const curr = Number(new Date())
    const diff = curr - prevTime

    t.equal(n, 3, 'should be at 3 after the promise resolves')
    t.ok(diff >= 300, 'promise resolves after all the callbacks')

    return next
})

test('can pass in a number to increment', t => {
    const plus = after(3)
    const foo = 3
    t.equal(foo, 3, 'resolves promise after incrementing')
    plus(3)
    return plus
})
