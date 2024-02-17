export interface IBaseEvent {
  handle(topic: string, message: string): Promise<void>;
};