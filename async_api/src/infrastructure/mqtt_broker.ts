import mqtt, {MqttClient} from "mqtt"
import { IAsyncApiBroker } from "../application/interfaces/iasync_api_broker"
export class MQTTBroker implements IAsyncApiBroker {
  private client: MqttClient
  public constructor(hostName: string) {
    this.client = mqtt.connect(hostName)

  }

  public publish = async (topic: string, message: string): Promise<void> => {
    this.client.publish(topic, message)
  }

  public subscribe = (topic: string, callback: (topic: string, message: string) => void): void => {
    throw new Error("Method not implemented.")
  }
}