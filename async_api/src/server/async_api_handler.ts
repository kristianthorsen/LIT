import { ApplicationContainer } from "../presentation/dependency_injection/application_container"
import { MqttHandler } from "./mqtt_handler"
import { envVarNames } from "../application/global_consts"
import { deviceProvisionedEvent } from "../presentation/events/device_provisioned_event"

export class AsyncApiHandler {
  private appContainer!: ApplicationContainer

  public start = async () => {
    // MQTT
    const hostName = process.env[envVarNames.host]
    if (!hostName) throw new Error("MQTT_HOST environment variable is not set")
    const mqttHandler = MqttHandler.init(hostName)

    // Dependency Injection
    this.appContainer = await ApplicationContainer.init()

    // Events
    mqttHandler.subscribe("/device/+/provisioned", deviceProvisionedEvent(this.appContainer))

    mqttHandler.run()
  }
}