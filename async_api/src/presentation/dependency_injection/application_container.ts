import { AwilixContainer, Constructor, InjectionMode, NameAndRegistrationPair, asClass, asFunction, asValue, createContainer } from "awilix";
import { envVarNames } from "../../application/global_consts";
import { MQTTBroker } from "../../infrastructure/mqtt_broker";
import { DeviceProvisionedCommandHandler } from "../../application/features/device/commands/device_provisioned_command_handler";

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
      asyncApiBroker: asFunction(() => new MQTTBroker(process.env[envVarNames.asyncApiHostname]!)),
      deviceProvisionedCommandHandler: asClass(DeviceProvisionedCommandHandler),
    });

    return container;
  }
}
