const axios = require('axios');

let options = {

};

module.exports = {
    addRequest: (request) => {
        return axios.post('http://10.105.79.58:12615/OpenMediaServiceRest/requests/add', request)
            .then((res) => {
                return new Promise((resolve) => {
                    resolve({
                        status: res.status,
                        data: res.data
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },
    
    cancelRequest: () => {

    },

    divertRequest: () => {

    },

    setOptions: () => {

    },

    getOpenMediaRequestStatusById: () => {

    },

    getOpenMediaRequestHistoryById: () => {

    },

    getOpenMediaRequestByTime: () => {

    },

    getAllOpenMediaRequestStatus: () => {

    },

    getServiceGroupStatus: () => {

    },

    getAllOpenMediaServiceGroupStatus: () => {

    }
}