export type CyrrencyState = {
  status: Status
  rates: null | { [k: string]: string }
}

export enum Status {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected'
}