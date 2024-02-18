import { GetDeviceListQueryHandler } from "../../application/features/device/queries/get_device_list_query_handler";
import { Device } from "../../domain/device";
import { makeRestEndpoint } from "./common/make_rest_endpoint";

export class DeviceResource {
  public constructor(
    private readonly getDeviceListQueryHandler: GetDeviceListQueryHandler
  ){}

  public async getAll(): Promise<Device[]> {
    const response = await this.getDeviceListQueryHandler.handle();
    return response
  }
}

export const deviceEndpoint = makeRestEndpoint(DeviceResource)
