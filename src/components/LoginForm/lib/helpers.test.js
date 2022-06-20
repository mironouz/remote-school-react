import {login} from "./helpers";
import fetchMock from "fetch-mock";

describe('LoginForm component util functions', () => {

    let testUser = {email: 'testEmail', password: 'testPassword'}
    beforeEach(() => {
        window.alert = jest.fn()
        fetchMock.reset()
        localStorage.clear()
    })

    test('No alert on 200 status code and put auth to local storage', async () => {
        fetchMock.mock('/api/checkUser', {status: 200})
        delete window.location
        window.location = {
            assign: jest.fn(),
        }
        await login(testUser)
        expect(localStorage.getItem('auth')).not.toBeNull()
        expect(window.alert).not.toBeCalled()
        expect(window.location.assign).toHaveBeenCalledWith('/home')
    })

    test('User does not exist message on 400 status code', async () => {
        fetchMock.mock('/api/checkUser', {status: 400})
        await login(testUser)
        expect(window.alert).toHaveBeenCalledWith("Пользователь не существует")
    })

    test('Wrong password message on 409 status code', async () => {
        fetchMock.mock('/api/checkUser', {status: 409})
        await login(testUser)
        expect(window.alert).toHaveBeenCalledWith("Неверный пароль")
    })

    test('Unknown error message on 500 status code', async () => {
        const unknown_status = 500
        fetchMock.mock('/api/checkUser', {status: unknown_status})
        await login(testUser)
        expect(window.alert).toHaveBeenCalledWith("Неизвестная ошибка. Код " + unknown_status)
    })
})