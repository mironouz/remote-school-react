import {logout, sendMessage} from "./helpers";

describe('Dashboard component util functions', () => {

    beforeEach(() => localStorage.setItem('auth', 'testAuth'))
    afterEach(() => localStorage.clear())

    test('Message was sent successfully', () => {
        const fakeFetch = jest.spyOn(window, 'fetch')
        Date.now = jest.fn(() => new Date(Date.UTC(2020, 5, 24)).valueOf())
        sendMessage({data: {text: 'testMessage'}})
        expect(fakeFetch).toHaveBeenCalledWith('/api/message', {
            body: '{"text":"testMessage","timestamp":1592956800000}',
            headers: {
                'Authorization': 'Basic testAuth',
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
    })

    test('logout deletes auth from the local storage', () => {
        logout()
        expect(localStorage.getItem('auth')).toBeNull()
    })
})