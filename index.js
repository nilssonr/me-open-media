const axios = require('axios');

const httpRequest = (params) => {
    return axios.default.request(params)
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
};

module.exports = {
    addRequest: (request) => {
        return httpRequest({
            url: 'http://10.105.79.58:12615/OpenMediaServiceRest/requests/add',
            method: 'POST',
            data: request
        });
    },
    
    cancelRequest: (request) => {
        return httpRequest({
            url: 'http://10.105.79.58:12615/OpenMediaServiceRest/requests/cancel',
            method: 'DELETE',
            data: request
        });
    },

    divertRequest: (request) => {
        return httpRequest({
            url: 'http://10.105.79.58:12615/OpenMediaServiceRest/requests',
            method: 'POST',
            data: request
        });
    },

    setOptions: (request) => {
        return httpRequest({
            url: 'http://10.105.79.58:12615/OpenMediaServiceRest/options',
            method: 'PUT',
            data: request
        });
    },

    getOpenMediaRequestStatusById: (id) => {
        return httpRequest({
            url: `http://10.105.79.58:12615/OpenMediaServiceRest/requests?id=${id}`,
            method: 'GET'
        });
    },

    getOpenMediaRequestHistoryById: (request) => {
        return httpRequest({
            url: `http://10.105.79.58:12615/OpenMediaServiceRest/requests/history?id=${request.OpenMediaID}&laterThan=${request.retrieveLaterThan}`,
            method: 'GET'
        });
    },

    getOpenMediaRequestByTime: (time) => {
        return httpRequest({
            url: `http://10.105.79.58:12615/OpenMediaServiceRest/requests/time?laterThan=${time}`,
            method: 'GET'
        });
    },

    getAllOpenMediaRequestStatus: () => {
        return httpRequest({
            url: 'http://10.105.79.58:12615/OpenMediaServiceRest/requests',
            method: 'GET'
        });
    },

    getServiceGroupStatus: (id) => {
        return httpRequest({
            url: `http://10.105.79.58:12615/OpenMediaServiceRest/serviceGroups?id=${id}`,
            method: 'GET'
        });
    },

    getAllOpenMediaServiceGroupStatus: (id) => {
        return httpRequest({
            url: `http://10.105.79.58:12615/OpenMediaServiceRest/serviceGroups/tenant?id=${id}`,
            method: 'GET'
        });
    }
}