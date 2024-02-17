import { Device } from "../../../../domain/device";
import { IRepository } from "../../../interfaces/repositories/irepository";
import { CreateDeviceCommand } from "./create_device_command";

export class CreateDeviceCommandHandler {
  public constructor(
    private readonly deviceRepository: IRepository<Device>
  ) {}

  public async handle(cmd: CreateDeviceCommand): Promise<void> {
    await this.deviceRepository.create(cmd);
  }
}