import { MissigParamError } from "../errors/missing-param-error"
import { badRequest } from "../helpers/http-helper"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController{
    handle(httpRequest: HttpRequest): HttpResponse | any {
        if (!httpRequest.body.name) {
            return badRequest(new MissigParamError('name'))
        }
        if (!httpRequest.body.email) {
            return badRequest(new MissigParamError('email'))
        }
    }
}