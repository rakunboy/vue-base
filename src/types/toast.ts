export interface ToastApi {
  showToast: (options: unknown) => number
  removeToast: (id: number) => void
  updateToast: (id: number, changes: unknown) => boolean
  toastPromise: <T>(
    promise: Promise<T>,
    msgs: { loading?: string; success?: string; error?: string },
  ) => Promise<T>
  on: (event: string, cb: (toast: unknown) => void) => () => void
  config: unknown
}
