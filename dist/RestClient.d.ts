import { AxiosInstance } from 'axios';
export declare class RestClient {
    protected http: AxiosInstance;
    constructor(baseUrl: string);
    /**
     * Query attributes of type array will be joined to string, i.e. { id: [1, 2, 3] } => '?id=1,2,3'
     *
     * @param {string} url
     * @param {object} query
     * @returns {Promise<Response>}
     */
    get<Response>(url: string, query: object): Promise<Response>;
    post<Response>(url: string, body?: object): Promise<Response>;
    put<Response>(url: string, body?: object): Promise<Response>;
    patch<Response>(url: string, body?: object): Promise<Response>;
    delete<Response>(url: string): Promise<Response>;
    protected handleError(e: Error | any): Error;
}
