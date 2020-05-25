import {getAuth, setAuth} from "./utils";

describe('Global util functions', () => {
    beforeEach(() => localStorage.clear())

    test('set auth to local storage successfully', () => {
        setAuth('testAuth')
        expect(localStorage.getItem('auth')).toBe('testAuth')
    })

    test('get auth from local storage successfully', () => {
        localStorage.setItem('auth', 'testAuth')
        expect(getAuth()).toBe('testAuth')
    })
})