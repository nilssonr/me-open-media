let meOpenMedia = require('../index'),
    expect = require('chai').expect;

describe('#meOpenMedia()', () => {
    describe('Add Request', () => {
        var promiseResponse;
    
        const request = {
            ServiceGroupID: 3,
            IVRInfo: [
                {
                    Data: 'Data1',
                    Label: 'Label1'
                }
            ]
        };
    
        before((done) => {
            meOpenMedia.addRequest(request)
                .then((result) => {                
                    promiseResponse = result;
                    done();
                });
        });
        
        it('Returns 200', () => {
            expect(promiseResponse.status).to.eq(200);
        });

        it('Has an Open Media ID', () => {
            expect(promiseResponse.data.OpenMediaID).to.be.above(0);
        });

        it('Has a successful RequestStatus', () => {
            expect(promiseResponse.data.RequestStatus).to.eq(0);
        });
    });

});
