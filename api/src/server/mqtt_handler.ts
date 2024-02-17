import mqtt, { MqttClient } from "mqtt";

export class MqttHandler {
  private mqttClient: MqttClient;
  private subscriptions: { [topic: string]: ((topic: string, payload: string) => Promise<void>)[] } = {};
  private constructor(host: string) {
    this.mqttClient = mqtt.connect(host);
  }

  public static init(host: string): MqttHandler {
    const handler = new MqttHandler(host);
    return handler;
  }

  public subscribe(topic: string, callback: (topic: string, payload: string) => Promise<void>): void {
    this.subscriptions[topic] = this.subscriptions[topic] ?  [...this.subscriptions[topic], callback] : [callback];
    this.mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  public run(): void {
    this.mqttClient.on("message", (topic, message) => {
      this.invokeTopic(topic, message.toString());
    });
  }

  private invokeTopic(topic: string, message: string): void {
    console.log(`Received message: ${message} on topic: ${topic}`);
    Object.entries(this.subscriptions).forEach(
      ([subscriptionTopic, callbacks]) => {
        if (topic.match(this.sub2regex(subscriptionTopic))) {
          callbacks.forEach((cb) => cb(topic, message));
        }
      }
    );
  }

  private sub2regex = (topic: string) => {
    return new RegExp(`^${topic}\$`
        .replaceAll('+', '[^/]*')
        .replace('/#', '(|/.*)')
    )
 };

}
