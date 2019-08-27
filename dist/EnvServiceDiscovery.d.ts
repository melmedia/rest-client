import { ServiceDiscovery } from './ServiceDiscovery';
export declare class EnvServiceDiscovery implements ServiceDiscovery {
    location(serviceName: string): string | undefined;
}
