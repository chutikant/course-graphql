const fizzbuzz = require('./fizzbuzz')
describe('Fizzbuzz',() => {
    //beforeEach() //ก่อนรัน test ให้ทำอะไร นับเป็นแต่ละครั้ง ทำงานเท่ากับจำนวนฟังก์ชั่นที่จะเทส
    //beforeAll() //ก่อนรันทั้งหมด จะทำงานแค่ครั้งเดียว
    it('return "n" if can not devided by 3 or 5', () => {
        expect(fizzbuzz(1)).toEqual('1')
        expect(fizzbuzz(2)).toEqual('2')
    })

    it('return "fizz" if can devided by 3', () => {
        expect(fizzbuzz(3)).toEqual('Fizz')
        expect(fizzbuzz(6)).toEqual('Fizz')
        expect(fizzbuzz(9)).toEqual('Fizz')
    })
    //it.only
    // it.skip
    it('return "Buzz" if can devided by 5', () => {
        expect(fizzbuzz(5)).toEqual('Buzz')
        expect(fizzbuzz(10)).toEqual('Buzz')
        
    })

    it('return "Fizzbuzz" if can devided by 3 and 5', () => {
        expect(fizzbuzz(15)).toEqual('Fizzbuzz')
        expect(fizzbuzz(30)).toEqual('Fizzbuzz')
    })
})