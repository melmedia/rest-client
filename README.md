# NodeJS REST client with service discovery

* NodeJS, Typescript
* Service discovery based on JSON configuration

## Usage
```typescript
  export class ClientServiceWrapper extends ServiceWrapper {
    protected get serviceName() {
      return 'client';
    }
  }

  const serviceDiscovery = new ConfigServiceDiscovery({
    "client": "http://127.0.0.1:32978",
    "expertAuth": "http://127.0.0.1:26459",
    "expertUser": "http://127.0.0.1:16028"
  })

  const clientService = new ClientServiceWrapper(serviceDiscovery);
  const clients = await clientService.get<User[]>('users', { status: 'active' });

```
