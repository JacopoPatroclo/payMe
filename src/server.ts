import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as exphbs from 'express-handlebars';

// Importa l'interfaccia di configurazione e il file di config
import Configuration from './interfaces/Configuration';
// Importa i router
import Api from './api';

// Importa gli error handler
import ErrorHandler from './middleware/errorHandler';
import AuthRouter from './auth/AuthRouter';

export default class Server {
  public app: express.Application;

  constructor(
    public configuration: Configuration,
    public errorHandler: ErrorHandler,
    public apiRouter: Api,
    public authRouter: AuthRouter
  ) {
    this.app = express();
    this.config();
    this.route();
    this.errors();
  }

  public config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(logger('dev'));
    this.app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
    this.app.set('view engine', 'handlebars');
  }

  public route() {
    this.app.use('/api/v1', this.apiRouter.router);
    this.app.use('/auth', this.authRouter.router);
  }

  public errors() {
    this.app.use(this.errorHandler.handler);
  }
}
