import moxios from 'moxios';

import {login} from "../authorization/login";
import {testStore} from "../../../../Utils";


describe('login action', function () {

    beforeEach(()=>{
        moxios.install();
    })

    afterEach(()=>{
        moxios.uninstall();
    })

    it('should call api', async function () {
        const expectedState = [{
            token: "Bearer token",
            loading: false,
            error: null
        }];
        const store = testStore();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    success: true,
                    token: "Bearer token"
                }
            })
        });

        return store.dispatch(login({}))
            .then(() => {
                const newState = store.getState();
                expect(newState.auth).toBe(expectedState);
            })
    });
});