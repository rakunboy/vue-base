import type { AxiosError } from 'axios'

export const handleAxiosException = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as AxiosError<any>

  return {
    success: false,
    message: err?.response?.data?.message ?? 'Error al realizar la petición',
  }
}
