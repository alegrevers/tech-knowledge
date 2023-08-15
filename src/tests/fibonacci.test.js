
describe('Fibonacci', () => {
    test('Print', async () => {
        let next
        let current = 1
        let previous = 0
        const sequence = []

    for (let index = 1; index <= 10; index++) {
        sequence.push(previous)
        next = previous + current
        previous = current
        current = next
    }

    console.log(sequence)
    expect(sequence).toEqual([0,1,1,2,3,5,8,13,21,34])
    })
})