import { injectable } from 'inversify';
import { ServiceDiscovery } from './ServiceDiscovery';

@injectable()
export class EnvServiceDiscovery implements ServiceDiscovery {

  public location(serviceName: string): string | undefined {
    return process.env[`${serviceName.toUpperCase()}-SERVICE`];
  }

}
