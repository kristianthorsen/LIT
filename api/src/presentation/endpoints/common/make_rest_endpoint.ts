import { Constructor } from "awilix";
import { Request } from "express";
import { ApplicationContainer } from "../../dependency_injection/application_container";

export const makeRestEndpoint = (endpoint: Constructor<any> ) => 
(appContainer: ApplicationContainer) => async (req: any, res: any) => {
  const resource = appContainer.build(endpoint)
  const result = await invokeMethod(resource, req)
  res.json(result)
}

const invokeMethod = async (resource: any, req: Request) => {
  const methodType = req.method.toLowerCase()

  switch (methodType) {
    case 'get':
      if (req.params.id) {
        return await resource.getSingle(req);
      }
      return await resource.getAll(req);
    case 'post':
      return await resource.post(req);
    case 'put':
      return await resource.put(req);
    case 'delete':
      return await resource.delete(req);
    default:
      throw new Error('Unknown methodType used in switch');
  }
}
