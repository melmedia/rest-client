import { injectable } from 'inversify';
import { RestClient } from './RestClient';
import { ServiceDiscovery } from './ServiceDiscovery';

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
   * @returns {Promise<Response>}
   */
  public async get<Response>(url: string, query?: object): Promise<Response> {
    return this.restClient.get<Response>(url, query);
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

  public async delete<Response>(url: string): Promise<Response> {
    return this.restClient.delete<Response>(url);
  }

  protected abstract getServiceName(): string;

}
