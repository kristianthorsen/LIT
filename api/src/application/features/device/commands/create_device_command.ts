import { Device } from "../../../../domain/device";

export type CreateDeviceCommand = Omit<Device, "id" | "createdAt" | "updatedAt">;