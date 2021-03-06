import { InvalidParamError } from "../errors/ivalid-param-error"
import { MissigParamError } from "../errors/missing-param-error"
import { ServerError } from "../errors/server-error"
import { badRequest } from "../helpers/http-helper"
import { Controller } from "../protocols/controller"
import { EmailValidator } from "../protocols/email-validator"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SignupController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor (emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse | any {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissigParamError(field))
                }
            }

            const isValid = this.emailValidator.isValid(httpRequest.body.email)
            
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            }
        }
    }
}