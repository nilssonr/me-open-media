let meOpenMedia = require('../index'),
    expect = require('chai').expect;

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

    describe('Set Options', () => {
        var promiseResponse;

        before((done) => {
            meOpenMedia.setOptions(testParams.setOptionsRequest)
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
            meOpenMedia.addRequest(testParams.addRequest)
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
            meOpenMedia.getOpenMediaRequestStatusById(addedRequest.data.OpenMediaID)
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
            meOpenMedia.getServiceGroupStatus(testParams.addRequest.ServiceGroupID)
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
            meOpenMedia.getAllOpenMediaServiceGroupStatus(testParams.addRequest.TenantID)
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
            meOpenMedia.getAllOpenMediaRequestStatus()
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

    describe('Cancels the request', () => {
        var promiseResponse;

        before((done) => {
            const request = {
                CancelIfAllocated: true,
                DoNotReport: true,
                OpenMediaID: addedRequest.data.OpenMediaID
            };

            meOpenMedia.cancelRequest(request)
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
