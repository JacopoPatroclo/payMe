// Importa l'interfaccia di configurazione e il file di config
import config from './config'

// Importo il server
import Server from './server'

// Importa i router
import Api from './api'
import UserRouter from './api/user/UserRouter'

// Importa i controller
import UserController from './api/user/UserController'

// Importa gli error handler
import ErrorHandler from './middleware/errorHandler'

// Importa il logger
import Logger from './lib/logger'

// Importo il db manager
import { sequelize } from './models'
import AuthRouter from './auth/AuthRouter';
import AuthController from './auth/AuthController';

// Importo gli util
import AuthUtil from './lib/auth';
import CryptoUtil from './lib/cryptoUtil';

const cryptoUtil = new CryptoUtil(10);
const myLogger = new Logger();
const authUtil = new AuthUtil(cryptoUtil);

(async () => {
  await sequelize.sync();
})()

const App = new Server(
              config,
              new ErrorHandler(myLogger),
              new Api(
                new UserRouter(
                  new UserController(myLogger),
                  authUtil
                )
              ),
              new AuthRouter(
                new AuthController(
                  myLogger,
                  authUtil
                ),
                authUtil)
            ).app

App.listen(config.PORT, () => {
  console.log(`Applicativo avviato sulla porta ${config.PORT} in modalità ${config.ENVIROMENT}`)
})