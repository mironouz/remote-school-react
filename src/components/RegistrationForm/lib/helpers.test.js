import {registerUser} from "./helpers";
import fetchMock from "fetch-mock";

describe('RegistrationForm component util functions', () => {

    let testUser = {name: 'testName', surname: 'testSurname'}
    beforeEach(() => {
        window.alert = jest.fn()
        fetchMock.reset()
    })

    test('you have registered message on 202 status code', async () => {
        fetchMock.mock('/api/register', {status: 202}, {body: testUser})
        await registerUser(testUser)
        expect(window.alert).toHaveBeenCalledWith("Вы зарегестрировались как " +
            testUser.name + ' ' + testUser.surname)
    })

    test('user already exists message on 409 status code', async () => {
        fetchMock.mock('/api/register', {status: 409}, {body: testUser})
        await registerUser(testUser)
        expect(window.alert).toHaveBeenCalledWith("Пользователь " +
            testUser.name + ' ' + testUser.surname + " уже существует")
    })

    test('Unknown error message on 500 status code', async () => {
        const unknown_status = 500
        fetchMock.mock('/api/register', {status: unknown_status}, {body: testUser})
        await registerUser(testUser)
        expect(window.alert).toHaveBeenCalledWith("Неизвестная ошибка. Код " + unknown_status)
    })
})