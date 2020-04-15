import { injectable } from 'inversify';
import * as querystring from 'querystring';
import { RestClient } from './RestClient';
import { ServiceDiscovery } from './ServiceDiscovery';
import { NotFoundError } from '@melmedia/http-errors';

@injectable()
export abstract class ServiceWrapper {
  protected restClient: RestClient;
  protected serviceDiscovery: ServiceDiscovery;

  constructor(serviceDiscovery: ServiceDiscovery) {
    this.serviceDiscovery = serviceDiscovery;
    const serviceUrl = this.serviceDiscovery.location(this.getServiceName());
    if (!serviceUrl) {
      throw new Error(
        `Can't find service location for ${this.getServiceName()}`,
      );
    }
    this.restClient = new RestClient(serviceUrl);
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
  public async get<Response>(
    url: string,
    query?: object,
    returnUndefinedInsteadOf404?: any,
  ): Promise<Response | typeof returnUndefinedInsteadOf404> {
    try {
      return await this.restClient.get<Response>(url, query);
    } catch (e) {
      if (e instanceof NotFoundError && undefined !== returnUndefinedInsteadOf404) {
        return returnUndefinedInsteadOf404;
      }
      throw e;
    }
  }

  public async post<Response>(url: string, body?: object): Promise<Response> {
    return this.restClient.post<Response>(url, body);
  }

  public async put<Response>(url: string, body?: object): Promise<Response> {
    return this.restClient.put<Response>(url, body);
  }

  public async patch<Response>(url: string, body?: object): Promise<Response> {
    return this.restClient.patch<Response>(url, body);
  }

  public async delete<Response>(url: string, query?: object): Promise<Response> {
    return this.restClient.delete<Response>(url, query);
  }

  /**
   * Convert object to JSON and URL encode to support passing complex data in GET request
   */
  public jsonUrlEscape(data: object) {
    return querystring.escape(JSON.stringify(data));
  }

  protected abstract getServiceName(): string;

}
