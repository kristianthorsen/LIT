import { Device } from "../../../../domain/device";

export type DeviceProvisionedCommand = Omit<Device, "id">;
