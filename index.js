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
    
    cancelRequest: (request) => {
        return axios.default.delete('http://10.105.79.58:12615/OpenMediaServiceRest/requests/cancel', { data: request})
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

    divertRequest: (request) => {
        return axios.default.post('http://10.105.79.58:12615/OpenMediaServiceRest/requests', request)
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

    setOptions: (request) => {
        return axios.default.put('http://10.105.79.58:12615/OpenMediaServiceRest/options', request)
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

    getOpenMediaRequestHistoryById: (request) => {
        return axios.default.get(`http://10.105.79.58:12615/OpenMediaServiceRest/requests/history?id=${request.OpenMediaID}&laterThan=${request.retrieveLaterThan}`)
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

    getOpenMediaRequestByTime: (time) => {
        return axios.default.get(`http://10.105.79.58:12615/OpenMediaServiceRest/requests/time?laterThan=${time}`)
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

    getAllOpenMediaRequestStatus: () => {
        return axios.default.get('http://10.105.79.58:12615/OpenMediaServiceRest/requests')
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