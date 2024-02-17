import { Client } from "pg";
import { IRepository } from "../../application/interfaces/repositories/irepository";
import { Device } from "../../domain/device";

export class DeviceRepository implements IRepository<Device> {
  public constructor(private readonly dbClient: Client) {
  }
  public async find(): Promise<Device[]> {
    const query = "SELECT * FROM devices"

    await this.dbClient.connect()
    const result = await this.dbClient.query(query)
    await this.dbClient.end()

    return result.rows
  }
  public async create(cmd: Omit<Device, 'id'| 'updatedAt'| 'createdAt'>): Promise<Device> {
    const query = `
    INSERT INTO devices (name, macAddress, location, status, lastReported)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

    const values = [cmd.name, cmd.macAddress, cmd.location, cmd.status, cmd.lastReported];

    await this.dbClient.connect()
    const result = await this.dbClient.query(query, values)
    await this.dbClient.end()
    
    return result.rows[0]
  }
  public async update(cmd: Omit<Device, 'id'>): Promise<Device> {
  if(!cmd.macAddress) {
    throw new Error('macAddress is required')
  }

  let query = `
  UPDATE devices 
  SET name = $1, location = $2, status = $3, lastreported = $4
  WHERE macAddress = $5
  RETURNING *;`;

  const values = [cmd.name, cmd.location, cmd.status, cmd.lastReported, cmd.macAddress];

  await this.dbClient.connect()
  const result = await this.dbClient.query(query, values)
  await this.dbClient.end()

  return result.rows[0];
  }
}