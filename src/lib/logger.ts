import ErrorManager from "./error";

export default class Logger {
  constructor() {
    
  }

  log(message: string | ErrorManager | Error) {
    if (message instanceof(ErrorManager)) {
      switch (message.type) {
        case 'EXEPTION':
          console.error(message)
          break;
        case 'LOGGABLE':
          console.log(message)
          break;
        default:
          console.error(message)
          break;
      }  
    } else {
      console.error(message)
    }
  }
}