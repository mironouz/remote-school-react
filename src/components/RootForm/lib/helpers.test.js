import {getActiveTab} from "./helpers";

describe('RootForm component util functions', () => {
    test('Tab 0 returns for /login path', () => {
        expect(getActiveTab('/login')).toBe(0)
    })

    test('Tab 1 returns for /registration path', () => {
        expect(getActiveTab('/registration')).toBe(1)
    })

    test('Tab 0 returns for /wrong path', () => {
        expect(getActiveTab('/wrong')).toBe(0)
    })
})