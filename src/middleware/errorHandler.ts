import {
  Request,
  Response,
  NextFunction
} from 'express'
import Logger from '../lib/logger'
import ErrorManager from '../lib/error';
import { UniqueConstraintError } from 'sequelize';

export default class ErrorHandler {

  constructor(public logger: Logger) {}

  handler = (err: ErrorManager | Error, req: Request, res: Response, next: NextFunction) => {
    this.logger.log(err)
    if (err instanceof ErrorManager) {
      if ((<UniqueConstraintError>err.payload).errors) {
        return res
          .status(400)
          .json({
            errors: (<UniqueConstraintError>err.payload).errors
          })
      }
      return res
        .status(400)
        .json({
          errors: [
            { message: err.payload.message }
          ]
        })
    }
    if (err instanceof Error) {
      return res
      .status(500)
      .json({
        errors: [
          { message: err.message }
        ]
      })
    }
  }

}