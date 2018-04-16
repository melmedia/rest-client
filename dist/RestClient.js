"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const http_errors_1 = require("@c7s/http-errors");
class RestClient {
    constructor(baseUrl, axiosParams = {}) {
        this.http = axios_1.default.create(Object.assign({}, axiosParams, { baseURL: baseUrl }));
    }
    /**
     * Query attributes of type array will be joined to string, i.e. { id: [1, 2, 3] } => '?id=1,2,3'
     *
     * @param {string} url
     * @param {object} query
     * @returns {Promise<Response>}
     */
    async get(url, query) {
        const q = {};
        if (undefined !== query) {
            for (const param in query) {
                const value = query[param];
                q[param] = Array.isArray(value) ? value.join(',') : value;
            }
        }
        try {
            return (await this.http.get(url, { params: q })).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async post(url, body) {
        try {
            return (await this.http.post(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async put(url, body) {
        try {
            return (await this.http.put(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async patch(url, body) {
        try {
            return (await this.http.patch(url, body)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    async delete(url) {
        try {
            return (await this.http.delete(url)).data;
        }
        catch (e) {
            throw this.handleError(e);
        }
    }
    handleError(e) {
        if (e.response) {
            if (422 === e.response.status) {
                let validationErrors = [];
                if (e.response.data) {
                    if (e.response.data.length && e.response.data[0].validationErrors) {
                        validationErrors = e.response.data[0].validationErrors;
                    }
                    else if (e.response.data.validationErrors) {
                        validationErrors = e.response.data.validationErrors;
                    }
                }
                return new http_errors_1.ValidationError(validationErrors);
            }
            if (404 === e.response.status) {
                return new http_errors_1.NotFoundError(
                /* tslint:disable:max-line-length */
                `HTTP request to ${e.response.config.url} failed, response status: ${e.response.status} ${e.response.statusText}, body: ${JSON.stringify(e.response.data)}`);
            }
        }
        return e;
    }
}
exports.RestClient = RestClient;
//# sourceMappingURL=RestClient.js.map