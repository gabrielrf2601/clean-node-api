export class MissigParamError extends Error {
    constructor (paramName: string) {
        super(`Missing param: ${paramName}`)
        this.name = 'MissigParamError'
    }
}