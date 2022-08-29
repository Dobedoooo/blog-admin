import { MOCK_HOST } from "../apiconfig"

const ERROR_MODULE_NAME: string = 'errors'

export interface ErrorBriefEntity {
    error_id?: number
    error_title: string
    error_create_user: string
    error_create_time: string
    error_type: string
    universal_tag: string
    error_deleted: string | null
}

export interface ErrorEntity extends ErrorBriefEntity {
    error_timestamp: string
    error_subtype: string
    error_desc: string
    error_analysis: string
    error_resolve: string
}

const HOST = MOCK_HOST

const URL = {
    findAllAdmin: `${HOST}/${ERROR_MODULE_NAME}/admin`
}

export async function findAll(take: number, skip: number): Promise<ErrorBriefEntity[]> {
    const resposne: Response = await fetch(`${URL.findAllAdmin}?take=${take}&skip=${skip}`, { mode: 'cors' })
    const errorList: ErrorBriefEntity[] = await resposne.json()
    return errorList
}