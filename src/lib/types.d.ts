export type TableEvent = {
  id: number;
  eventType: string;
  area: string;
  eventName: string;
  startTime: number;
  length: number;
};

export type TableData = {
  start: number;
  end: number;
  areas: string[];
  types: string[];
  events: TableEvent[];
};
