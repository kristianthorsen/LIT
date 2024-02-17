import { Device } from "../../../../domain/device";
import { IRepository } from "../../../interfaces/repositories/irepository";

export class GetDeviceListQueryHandler {
  public constructor(
    private readonly deviceRepository: IRepository<Device>
  ) {}

  public async handle(): Promise<Device[]> {
    return await this.deviceRepository.find();
  }
}