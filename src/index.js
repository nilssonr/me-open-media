import * as axios from 'axios';

export class MeOpenMedia {
    
    
    /**
     * @example new MeOpenMedia('https://127.0.0.1:12615');
     * @param {string} url - The Open Media Service Rest API url, see example.
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Inserts a new Open Media request into the MiCC Enterprise system. The response will be returned indicating success or failure to add the 
     * request.
     * @example addRequest({ ServiceGroupID: 1, IVRInfo: [{ Data: "Data One", Label: "Label one" }]}).then(...)
     * @returns {Promise|undefined} If successful, this method will return an OpenMediaRequest with a queue position, estimated wait time etc.
     */
    addRequest(request) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests/add`,
            method: 'POST',
            data: request
        });
    }

    /**
     * Cancels a previously added Open Media request from the MiCC Enterprise system. The response will be returned indicating success or failure 
     * to cancel the request.
     * @example cancelRequset(true, true, 1).then(...)
     * 
     * @param {boolean} cancelIfAllocated   If set to true, indicates that if the request has already been allocated to an agent, it should be 
     *                                      handled as a disconnect and removed from the agent. 
     * @param {boolean} doNotReport         If set to true, the request will not generate statistics for the Service Group. This parameter only 
     *                                      applies if the request has not been allocated to an agent; otherwise, the request must be reported.
     * @param {number} openMediaID          Indicates the unique identifier returned in the addRequest.
     */
    cancelRequest(cancelIfAllocated, doNotReport, openMediaID) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests/cancel`,
            method: 'DELETE',
            data: { 
                CancelIfAllocated: cancelIfAllocated,
                DoNotReport: doNotReport,
                OpenMediaID: openMediaID
            }
        });
    }

    /**
     * Diverts a previously added Open Media request to a different Open Media service group. The response will be returned indicating 
     * success or failure to divert the request. The request will be reported as Overflowed Out from the original service group and 
     * Overflowed In to the new service group. If the request is currently allocated to an agent, it will be removed from the agent 
     * without any confirmation by the agent. The Call Detail Report will indicate that the request was forwarded to the new service 
     * group.
     * @example divertRequest({ OpenMediaID: 1, ServiceGroupID: 1, TenantID: -1, ServiceGroupName: 'OpenMedia One'})
     * @param {Object} request - See documentation for parameters.
     */
    divertRequest(openMediaId, serviceGroupId) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests`,
            method: 'POST',
            data: {
                OpenMediaID: openMediaId,
                ServiceGroupID: serviceGroupId
            }
        });
    }

    /**
     * Sets various system options for Open Media sessions. These values override any configuration values set in MiCC Agent.
     * @example setOptions({ TypeOfSession: 1, AgentActionOptions: 1, CloseTabOptions: 1, MaxNumberOfSessions: 1, AllowDifferentTypes: 1, SessionLinkOptions: 1, ResetAllOptions: false }).then(...)
     * @param {Object} request - See documentation for parameters.
     */
    setOptions(request) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/options`,
            method: 'PUT',
            data: request
        });
    }

    /**
     * Retrieves the latest status update events for a particular Open Media request. 
     * @example getOpenMediaRequestStatusById(1).then(...)
     * @param {number} openMediaID Indicates the unique identifier returned in the addRequest.
     */
    getOpenMediaRequestStatusById(openMediaId) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests?id=${openMediaId}`,
            method: 'GET'
        });
    }

    /**
     * Retrieves all status update events for a particular Open Media request. 
     * @example getOpenMediaRequestHistoryById(1, new Date()).then(...)
     * @param {number} openMediaID Indicates the unique identifier returned in the addRequest.
     * @param {Date} retrieveLaterThan All status updates received after this date and time will be returned.
     */
    getOpenMediaRequestHistoryById(openMediaID, retrieveLaterThan) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests/history?ID=${openMediaID}&RetrieveLaterThan=${retrieveLaterThan}`,
            method: 'GET'
        });
    }

    /**
     * Retrieves all status update events in a particular time period.
     * @example getOpenMediaRequestsByTime(new Date()).then(...)
     * @param {Date} time All status updates received after this date and time will be returned.
     */
    getOpenMediaRequestsByTime(time) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests/time?laterThan=${time}`,
            method: 'GET'
        });
    }

    /**
     * Retrieves all status update events for all items in the cache
     * @example getAllOpenMediaRequestStatus().then(...)
     */
    getAllOpenMediaRequestStatus() {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/requests`,
            method: 'GET'
        });
    }

    /**
     * @example getServiceGroupStatus(1).then(...)
     * @param {number} serviceGroupId The service group id to retrieve the status for
     */
    getServiceGroupStatus(serviceGroupId) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/serviceGroups?id=${serviceGroupId}`,
            method: 'GET'
        });
    }

    /**
     * @example getAllOpenMediaServiceGroupStatus(-1).then(...)
     * @param {number} tenantId The tenant id to retrieve service group status for. -1 should be used for a non-tenanted system
     */
    getAllOpenMediaServiceGroupStatus(tenantId) {
        return this._httpRequest({
            url: `${this.url}/OpenMediaServiceRest/serviceGroups/tenant?id=${tenantId}`,
            method: 'GET'
        });
    }  

    _httpRequest(params) {
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
    }
}