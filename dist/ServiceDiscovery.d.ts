export interface ServiceDiscovery<S extends string = string> {
    location(serviceName: S): string | undefined;
}
