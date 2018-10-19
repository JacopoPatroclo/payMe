import ErrorTypes from "../interfaces/Error-types";
import { UniqueConstraintError } from "sequelize";

export default class ErrorManager implements ErrorTypes {

  constructor(public payload: Error | UniqueConstraintError, public type: 'EXEPTION' | 'TRIVIAL' | 'LOGGABLE'){
    
  }
}