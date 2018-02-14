import { ServiceDiscovery } from './ServiceDiscovery';
export declare type Config = Map<string, string>;
export declare class ConfigServiceDiscovery implements ServiceDiscovery {
    protected services: Config;
    constructor(services: {
        [index: string]: string;
    });
    location(serviceName: string): string | undefined;
}
