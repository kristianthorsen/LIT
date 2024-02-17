import { IAsyncApiBroker } from "../../../interfaces/iasync_api_broker";
import { DeviceProvisionedCommand } from "./device_provisioned_command";

export class DeviceProvisionedCommandHandler {
  public constructor(private readonly asyncApiBroker: IAsyncApiBroker) {}

  public async handle(cmd: DeviceProvisionedCommand) {
    const timestamp = new Date(parseInt(cmd.lastReported)).toISOString()

    const topic = `/device/${cmd.macAddress}/registered`
    const message = JSON.stringify({ ...cmd, lastReported: timestamp })
    
    await this.asyncApiBroker.publish(topic, message)
  }
}