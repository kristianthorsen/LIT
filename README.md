# LIT

LIT is short for Local IoT Platform and is a project which implements a locally hosted IoT Platform.

The platform consists of an IoTBroker (using MosquittoMqtt), for IoT devices to connect to, and two different interfaces for interacting with devices connected to the broker. The first interface is a REST API. The second interface a an async API, which enables consumers of the IoT Platform to build completely event-based services consuming the platform.

## Getting started

To host the IoT Platform locally, simply, clone the Github repository and run docker compose up. You will now be able to interact with the platform in the following ways:

- Connect devices on host: mqtt://localhost:1800 and start publishing!
- Subscribe to device updates on host: mqtt://localhost:1801 and start building event-driven abstractions!
- Interact with devices using REST API hosted on: localhost:6000.

### Example device payload

```json
{
    "name": "my_first_device",
    "macAddress": "123456abcdef",
    "location": "livingroom",
    "status": "online",
    "lastReported": "1708163862513"
}
```

### API Specifications for interacting with platform

- [API](./api/api.yml)
- [Async-API](./async_api/async-api.yml)
- [IoT-Broker](./iot_broker/iot_broker.yml)
