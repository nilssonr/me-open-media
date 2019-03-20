let meOpenMedia = require('../index'),
    expect = require('chai').expect;

const testParams = {
    addRequest: {
        ServiceGroupID: 3,
        IVRInfo: [
            {
                Data: 'Data1',
                Label: 'Label1'
            }
        ]
    }
};

describe('#meOpenMedia()', () => {
    var addedRequest;

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
});
