export interface IRepository<T> {
  find(): Promise<T[]>
  create(cmd: Omit<T, 'id'>): Promise<T>
  update(cmd: Omit<T, 'id'>): Promise<T>
}