import HOST from "../config"

const ERROR_MODULE_NAME: string = 'errors'

export interface ErrorEntity {
    error_id: number
}

const URL = {
    findAll: `${HOST}/${ERROR_MODULE_NAME}`
}

export async function findAll(take: number, skip: number): Promise<ErrorEntity[]> {
    const resposne: Response = await fetch(`${URL.findAll}?take=${take}&skip=${skip}`, { mode: 'cors' })
    const errorList: ErrorEntity[] = await resposne.json()
    return errorList
}