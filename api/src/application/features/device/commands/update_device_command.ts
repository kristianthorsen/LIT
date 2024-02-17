import { Device } from "../../../../domain/device";

export type UpdateDeviceCommand = Omit<Device, "id" | "createdAt" | "updatedAt">;