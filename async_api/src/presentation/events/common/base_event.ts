export interface BaseEvent {
  handle(topic: string, message: string): Promise<void>;
};