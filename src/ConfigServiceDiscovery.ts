import { injectable } from 'inversify';
import { ServiceDiscovery } from './ServiceDiscovery';
import * as objectToMap from 'object-to-map';

export type Config = Map<string, string>;

@injectable()
export class ConfigServiceDiscovery implements ServiceDiscovery {
  protected services: Config;

  constructor(services: { [index: string]: string }) {
    this.services = objectToMap(services);
  }

  public location(serviceName: string): string | undefined {
    return this.services.get(serviceName);
  }

}
