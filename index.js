const axios = require('axios');

module.exports = {
    addRequest: (request) => {
        return axios.default.post('http://10.105.79.58:12615/OpenMediaServiceRest/requests/add', request)
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

    getOpenMediaRequestStatusById: (id) => {
        return axios.default.get(`http://10.105.79.58:12615/OpenMediaServiceRest/requests?id=${id}`)
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

    getOpenMediaRequestHistoryById: () => {

    },

    getOpenMediaRequestByTime: () => {

    },

    getAllOpenMediaRequestStatus: () => {

    },

    getServiceGroupStatus: (id) => {
        return axios.default.get(`http://10.105.79.58:12615/OpenMediaServiceRest/serviceGroups?id=${id}`)
            .then((res) => {
                return new Promise((resolve) => {
                    resolve({
                        status: res.status,
                        data: res.data
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    getAllOpenMediaServiceGroupStatus: (id) => {
        return axios.default.get(`http://10.105.79.58:12615/OpenMediaServiceRest/serviceGroups/tenant?id=${id}`)
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
    }
}