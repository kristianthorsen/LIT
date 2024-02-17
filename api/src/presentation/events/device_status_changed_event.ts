import { UpdateDeviceCommandHandler } from "../../application/features/device/commands/update_device_command_handler";
import { IBaseEvent } from "./common/ibase_event";
import { makeEvent } from "./common/make_event";

export class DeviceStatusChangedEvent implements IBaseEvent {
  public constructor(private readonly updateDeviceCommandHandler: UpdateDeviceCommandHandler) {}
  public async handle(_topic: string, payload: string): Promise<void> {
    this.updateDeviceCommandHandler.handle(JSON.parse(payload));
  }
}

export const deviceStatusChangedEvent = makeEvent(DeviceStatusChangedEvent);