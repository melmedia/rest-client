"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    get(url, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = {};
            if (undefined !== query) {
                for (const param in query) {
                    const value = query[param];
                    q[param] = Array.isArray(value) ? value.join(',') : value;
                }
            }
            try {
                return (yield this.http.get(url, { params: q })).data;
            }
            catch (e) {
                throw this.handleError(e);
            }
        });
    }
    post(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.http.post(url, body)).data;
            }
            catch (e) {
                throw this.handleError(e);
            }
        });
    }
    put(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.http.put(url, body)).data;
            }
            catch (e) {
                throw this.handleError(e);
            }
        });
    }
    patch(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.http.patch(url, body)).data;
            }
            catch (e) {
                throw this.handleError(e);
            }
        });
    }
    delete(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield this.http.delete(url)).data;
            }
            catch (e) {
                throw this.handleError(e);
            }
        });
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