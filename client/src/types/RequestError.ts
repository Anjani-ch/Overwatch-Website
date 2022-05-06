import { AxiosError } from 'axios'

type RequestError = AxiosError | object |string

export default RequestError