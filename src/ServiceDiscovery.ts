export interface ServiceDiscovery {
  location(serviceName: string): string | undefined;
}
