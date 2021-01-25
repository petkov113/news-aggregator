import { CancelTokenSource } from 'axios'
import { createID } from '../utilities/js/string'

export class RequestStore {
  constructor(private pendingRequests: Request[] = []) {}

  clearPendingRequests() {
    if (this.pendingRequests.length > 0) {
      this.pendingRequests.forEach((rq) => {
        this.cancelRequest(rq)
      })
    }
  }

  addRequest(request: Request) {
    this.pendingRequests.push(request)
  }

  cancelRequest(request: Request) {
    const pendingRequest = this.pendingRequests.find((rq) => rq.id === request.id)
    pendingRequest && pendingRequest.token.cancel()
    this.removeRequest(request)
  }

  cancelRequestOfType(type: string) {
    const request = this.pendingRequests.find((rq) => rq.type === type)
    request && this.cancelRequest(request)
  }

  removeRequest(request: Request) {
    this.pendingRequests = this.pendingRequests.filter((rq) => rq.id !== request.id)
  }
}

const requestStore = new RequestStore()
export const cancellPendingRequests = requestStore.clearPendingRequests.bind(requestStore)
export default requestStore

export const createRequestObject = (token: CancelTokenSource, type?: string): Request => {
  return {
    token,
    id: createID(),
    type,
  }
}

type Request = {
  id: string
  token: CancelTokenSource
  type?: string
}
