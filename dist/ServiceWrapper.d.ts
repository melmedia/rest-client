import { RestClient } from './RestClient';
import { ServiceDiscovery } from './ServiceDiscovery';
export declare abstract class ServiceWrapper {
    protected restClient: RestClient;
    protected serviceDiscovery: ServiceDiscovery;
    constructor(serviceDiscovery: ServiceDiscovery);
    /**
     * Query attributes of type array will be joined to string, i.e. { id: [1, 2, 3] } => '?id=1,2,3'
     *
     * @param {string} url
     * @param {object} query?
     * @returns {Promise<Response>}
     */
    get<Response>(url: string, query?: object, isReturnUndefinedInsteadOf404?: boolean): Promise<Response | undefined>;
    post<Response>(url: string, body?: object): Promise<Response>;
    put<Response>(url: string, body?: object): Promise<Response>;
    patch<Response>(url: string, body?: object): Promise<Response>;
    delete<Response>(url: string): Promise<Response>;
    /**
     * Convert object to JSON and URL encode to support passing complex data in GET request
     */
    jsonUrlEscape(data: object): string;
    protected abstract getServiceName(): string;
}
