import express from "express"
import { ApplicationContainer } from "../presentation/dependency_injection/application_container"
import { deviceEndpoint } from "../presentation/endpoints/devices"
import { MqttHandler } from "./mqtt_handler"
import { envVarNames } from "../application/global_consts"
import { deviceProvisionedEvent } from "../presentation/events/device_provisioned_event"
import { deviceStatusChangedEvent } from "../presentation/events/device_status_changed_event"
import { migrateDb } from "./migrate_db"

export class Api {
  private appContainer!: ApplicationContainer

  public start = async () => {
    // Express
    const app = express()
    app.use(express.json())

    // MQTT
    const hostName = process.env[envVarNames.host]
    if (!hostName) throw new Error("MQTT_HOST environment variable is not set")
    const mqttHandler = MqttHandler.init(hostName)

    // Migrate DB
    await migrateDb()

    // Dependency Injection
    this.appContainer = await ApplicationContainer.init()

    // Create Presentations

    // Endpoints
    app.get("/devices", deviceEndpoint(this.appContainer))

    // Events
    mqttHandler.subscribe("/device/+/provisioned", deviceProvisionedEvent(this.appContainer))
    mqttHandler.subscribe("/device/+/status", deviceStatusChangedEvent(this.appContainer))

    // Run Mqtt and Express server
    mqttHandler.run()
    
    const port = 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}