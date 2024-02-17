import { Device } from "../../../../domain/device";
import { IRepository } from "../../../interfaces/repositories/irepository";
import { UpdateDeviceCommand } from "./update_device_command";

export class UpdateDeviceCommandHandler {
  public constructor(
    private readonly deviceRepository: IRepository<Device>
  ) {}

  public async handle(cmd: UpdateDeviceCommand): Promise<void> {
    await this.deviceRepository.update(cmd);
  }
}