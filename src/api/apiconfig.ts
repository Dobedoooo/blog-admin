type Protocol = 'http' | 'https'

const PROTOCOL: Protocol = 'http'
const IP: string = '47.97.11.78'
const PORT: number = 3000
const HOST: string = `${PROTOCOL}://${IP}:${PORT}`

const MOCK_HOST = 'https://8ac0c474-48a4-4cd8-a625-71ada647e258.mock.pstmn.io'

export { HOST, MOCK_HOST }
