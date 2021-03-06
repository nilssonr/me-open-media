
import { MeOpenMedia } from '../src/index';
import { expect } from 'chai';

let testParams = {
    addRequest: {
        ServiceGroupID: 3,
        IVRInfo: [
            {
                Data: 'Data1',
                Label: 'Label1'
            }
        ],
        TenantID: -1
    },
    setOptionsRequest: {
        TypeOfSession: 255,
        AgentActionOptions: 1,
        CloseTabOptions: 1,
        MaxNumberOfSessions: 1,
        AllowDifferentTypes: 1,
        SessionLinkOptions: 1
    }
};

describe('#meOpenMedia()', () => {
    var addedRequest;
    const client = new MeOpenMedia('http://10.105.79.58:12615');

    describe('Set Options', () => {
        var promiseResponse;

        before((done) => {
            client.setOptions(testParams.setOptionsRequest)
                .then((res) => {
                    promiseResponse = res;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Options are set', () => {
            expect(promiseResponse.data).to.eq(true);
        });
    });

    describe('Add Request', () => {      
        before((done) => {
            client.addRequest(testParams.addRequest)
                .then((result) => {                
                    addedRequest = result;
                    done();
                });
        });
        
        it('Returns 200', () => {
            expect(addedRequest.status).to.eq(200);
        });

        it('Has an Open Media ID', () => {
            expect(addedRequest.data.OpenMediaID).to.be.above(0);
        });

        it('Has a successful RequestStatus', () => {
            expect(addedRequest.data.RequestStatus).to.eq(0);
        });
    });

    describe('Get Open Media Status By Id', () => {
        var promiseResponse;

        before((done) => {
            client.getOpenMediaRequestStatusById(addedRequest.data.OpenMediaID)
                .then((result) => {
                    promiseResponse = result;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns an Open Media Request', () => {
            expect(promiseResponse.data.OpenMediaRequests.length).to.be.above(0);
        });

        it('The Open Media ID return matches the initial request', () => {
            expect(promiseResponse.data.OpenMediaRequests[0].ID).to.eq(addedRequest.data.OpenMediaID);
        });
    });

    describe('Get Service Group Status', () => {
        var promiseResponse;

        before((done) => {
            client.getServiceGroupStatus(testParams.addRequest.ServiceGroupID)
                .then((result) => {
                    promiseResponse = result;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns true or false', () => {
            expect(promiseResponse.data.Open).to.not.eq(null);
        });

        it('Returns the inserted Service Group ID', () => {
            expect(promiseResponse.data.ServiceGroupID).to.eq(testParams.addRequest.ServiceGroupID);
        });
    });

    describe('Get all Service Groups by Tenant ID', () => {
        var promiseResponse;

        before((done) => {
            client.getAllOpenMediaServiceGroupStatus(testParams.addRequest.TenantID)
                .then((result) => {
                    promiseResponse = result;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns a status array', () => {
            expect(promiseResponse.data.Status).to.not.eq(null);
        });
    });

    describe('Get all Open Media requests', () => {
        var promiseResponse;

        before((done) => {
            client.getAllOpenMediaRequestStatus()
                .then((result) => {
                    promiseResponse = result;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns an array of Open Media Requests', () => {
            expect(promiseResponse.data.OpenMediaRequests).to.not.eq(null);
        });

        it('Returns the previously added request', () => {
            const i = promiseResponse.data.OpenMediaRequests.findIndex(x => x.ID == addedRequest.data.OpenMediaID);
            expect(i).to.be.above(-1);
        });
    });

    describe('Get all Open Media requests by time', () => {
        var promiseResponse;
        before((done) => {
            client.getOpenMediaRequestsByTime(new Date(new Date().getDate() - 100000).toUTCString())
                .then((res) => {
                    promiseResponse = res;
                    done();
                })
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns the previously added request', () => {
            const i = promiseResponse.data.OpenMediaRequests.findIndex(x => x.ID == addedRequest.data.OpenMediaID);
            expect(i).to.be.above(-1);
        });
    });

    describe('Get Open Media request history by id', () => {
        var promiseResponse;
        before((done) => {
            client.getOpenMediaRequestHistoryById(addedRequest.data.OpenMediaID, new Date(new Date().getDate()).toLocaleString())
                .then((res) => {
                    promiseResponse = res;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Returns the previously added request', () => {
            const i = promiseResponse.data.OpenMediaRequests.findIndex(x => x.ID == addedRequest.data.OpenMediaID);
            expect(i).to.be.above(-1);
        });
    });

    // describe('Divert the request', () => {
    //     var promiseResponse;

    //     before((done) => {          
    //         client.divertRequest(addedRequest.data.OpenMediaID, 4)
    //             .then((res) => {
    //                 promiseResponse = res;
    //                 done();
    //             });
    //     });

    //     it('Returns 200', () => {
    //         expect(promiseResponse.status).to.eq(200);
    //     });
    // });



    describe('Cancels the request', () => {
        var promiseResponse;

        before((done) => {
            client.cancelRequest(true, true, addedRequest.data.OpenMediaID)
                .then((result) => {
                    promiseResponse = result;
                    done();
                });
        });

        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Removes the request', () => {
            expect(promiseResponse.data).to.eq(true);
        });
    });
});
