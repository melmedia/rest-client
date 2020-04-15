"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const querystring = require("querystring");
const RestClient_1 = require("./RestClient");
const http_errors_1 = require("@melmedia/http-errors");
let ServiceWrapper = class ServiceWrapper {
    constructor(serviceDiscovery) {
        this.serviceDiscovery = serviceDiscovery;
        const serviceUrl = this.serviceDiscovery.location(this.getServiceName());
        if (!serviceUrl) {
            throw new Error(`Can't find service location for ${this.getServiceName()}`);
        }
        this.restClient = new RestClient_1.RestClient(serviceUrl);
    }
    /**
     * Query attributes of type array will be joined to string, i.e. { id: [1, 2, 3] } => '?id=1,2,3'
     *
     * @param {string} url
     * @param {object} query?
     * @param returnUndefinedInsteadOf404? If !== undefined - return value
     * instead of throwing NotFoundError on 404 HTTP response code
     * @returns {Promise<Response>}
     */
    async get(url, query, returnUndefinedInsteadOf404) {
        try {
            return await this.restClient.get(url, query);
        }
        catch (e) {
            if (e instanceof http_errors_1.NotFoundError && undefined !== returnUndefinedInsteadOf404) {
                return returnUndefinedInsteadOf404;
            }
            throw e;
        }
    }
    async post(url, body) {
        return this.restClient.post(url, body);
    }
    async put(url, body) {
        return this.restClient.put(url, body);
    }
    async patch(url, body) {
        return this.restClient.patch(url, body);
    }
    async delete(url, query) {
        return this.restClient.delete(url, query);
    }
    /**
     * Convert object to JSON and URL encode to support passing complex data in GET request
     */
    jsonUrlEscape(data) {
        return querystring.escape(JSON.stringify(data));
    }
};
ServiceWrapper = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Object])
], ServiceWrapper);
exports.ServiceWrapper = ServiceWrapper;
//# sourceMappingURL=ServiceWrapper.js.map