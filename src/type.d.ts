/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'axios'

declare module 'axios' {
  export interface AxiosResponse<T = unknown> extends Promise<T> {}
}
