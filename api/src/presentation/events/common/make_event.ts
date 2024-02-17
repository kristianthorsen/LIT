import { Constructor } from "awilix";
import { ApplicationContainer } from "../../dependency_injection/application_container";
import { IBaseEvent } from "./ibase_event";

export const makeEvent = (event: Constructor<IBaseEvent> ) => 
(appContainer: ApplicationContainer) => async (topic: string, message: string) => {
  const eventResource = appContainer.build(event)
  await eventResource.handle(topic, message)
}

