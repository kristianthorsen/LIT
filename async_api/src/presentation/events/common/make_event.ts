import { Constructor } from "awilix";
import { ApplicationContainer } from "../../dependency_injection/application_container";
import { BaseEvent } from "./base_event";

export const makeEvent = (event: Constructor<BaseEvent> ) => 
(appContainer: ApplicationContainer) => async (topic: string, message: string) => {
  const eventResource = appContainer.build(event)
  await eventResource.handle(topic, message)
}

