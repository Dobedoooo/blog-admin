import { MOCK_HOST, HOST } from "../apiconfig"

const ERROR_MODULE_NAME: string = 'errors'

export interface ErrorBriefEntity {
    error_id?: number
    error_title: string
    error_create_user: string
    error_create_time: Date
    error_type: string
    universal_tag: string | null
    error_deleted: string | null
}

export interface ErrorEntity extends ErrorBriefEntity {
    error_timestamp: string
    error_subtype: string | null
    error_desc: string
    error_analysis: string
    error_resolve: string
}

export interface SimpleResponse {
    success: boolean
    message: string
}

export interface DeleteArg {
    id: number | number[]
    soft: boolean
}

// const HOST = MOCK_HOST

const URL = {
    findAllAdmin: `${HOST}/${ERROR_MODULE_NAME}/admin`,
    upsert: `${HOST}/${ERROR_MODULE_NAME}`,
    softDelete: `${HOST}/${ERROR_MODULE_NAME}`,
    restore: `${HOST}/${ERROR_MODULE_NAME}/restore`
}
// 查
export async function findAll(take: number, skip: number): Promise<ErrorEntity[]> {
    const resposne: Response = await fetch(`${URL.findAllAdmin}?take=${take}&skip=${skip}`)
    const errorList: ErrorEntity[] = await resposne.json()
    return errorList
}
// 改 增
export async function upsert(data: ErrorEntity): Promise<SimpleResponse> {
    const response: Response = await fetch(URL.upsert, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}
// 软删除
export async function softDelete(arg: DeleteArg): Promise<SimpleResponse> {
    const response: Response = await fetch(URL.softDelete, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(arg)
    })
    return response.json()
}
// 恢复
export async function restore(id: number) {
    const response: Response = await fetch(`${URL.restore}/${id}`)
    return response.json()
}