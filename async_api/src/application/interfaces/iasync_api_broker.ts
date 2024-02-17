export interface IAsyncApiBroker {
  publish(topic: string, message: string): Promise<void>
  subscribe(topic: string, callback: (topic: string, message: string) => void): void
}
