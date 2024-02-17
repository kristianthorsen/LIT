import { AwilixContainer, Constructor, InjectionMode, NameAndRegistrationPair, asClass, asFunction, asValue, createContainer } from "awilix";
import { DeviceRepository } from "../../infrastructure/repositories/device_repository";
import { envVarNames } from "../../application/global_consts";
import { GetDeviceListQueryHandler } from "../../application/features/device/queries/get_device_list_query_handler";
import { CreateDeviceCommandHandler } from "../../application/features/device/commands/create_device_command_handler";
import { UpdateDeviceCommandHandler } from "../../application/features/device/commands/update_device_command_handler";
import { Client } from "pg";

export class ApplicationContainer {
  private readonly _applicationContainer: AwilixContainer;

  private constructor() {
    this._applicationContainer = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });
  }

  public register(params: NameAndRegistrationPair<any>): void {
    this._applicationContainer.register(params);
  }

  public resolve<T = any>(name: string): T {
    return this._applicationContainer.resolve(name);
  }

  public build<T>(cls: Constructor<T>): T {
    return this._applicationContainer.build(cls);
  }

  public static async init(): Promise<ApplicationContainer> {
    const container = new ApplicationContainer();
    container.register({
      dbClient: asFunction(() => new Client({connectionString: process.env[envVarNames.dbUrl]})),
      deviceRepository: asClass(DeviceRepository),
      getDeviceListQueryHandler: asClass(GetDeviceListQueryHandler),
      createDeviceCommandHandler: asClass(CreateDeviceCommandHandler),
      updateDeviceCommandHandler: asClass(UpdateDeviceCommandHandler),
    });

    return container;
  }
}
