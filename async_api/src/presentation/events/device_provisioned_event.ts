import { DeviceProvisionedCommandHandler } from "../../application/features/device/commands/device_provisioned_command_handler";
import { BaseEvent } from "./common/base_event";
import { makeEvent } from "./common/make_event";

export class DeviceProvisionedEvent implements BaseEvent {
  public constructor(
    private readonly deviceProvisionedCommandHandler: DeviceProvisionedCommandHandler
  ){}
  public async handle(_topic: string, message: string): Promise<void> {
    await this.deviceProvisionedCommandHandler.handle(JSON.parse(message));
  }
}

export const deviceProvisionedEvent = makeEvent(DeviceProvisionedEvent);