import { CreateDeviceCommandHandler } from "../../application/features/device/commands/create_device_command_handler";
import { IBaseEvent } from "./common/ibase_event";
import { makeEvent } from "./common/make_event";

export class DeviceProvisionedEvent implements IBaseEvent {
  public constructor(
    private readonly createDeviceCommandHandler: CreateDeviceCommandHandler
  ){}
  public async handle(_topic: string, message: string): Promise<void> {
    await this.createDeviceCommandHandler.handle(JSON.parse(message));
  }
}

export const deviceProvisionedEvent = makeEvent(DeviceProvisionedEvent);