# PayMe

PayMe è un servizio per la gestione della bigliettazione facilmente configurabile e gestibile

## Todo

1. Scrivere una doc

# NodeJsTypescriptStarter

Lo scopo di questa repo è quello di gestire questo boilerplate.
Il master conterrà questa prima versione con:

- Autenticazione mediante JWT
- Sequelize con Postgres
- Modello base di Utente con email e password

Via via che si vorranno implementare nuove features si andra a creare un branch es:

```
Voglio questo starter ma con supporto a WebSocket.
```

Si crea un branch chiamato websocket e si implementa tutto li. Questi branch non verranno mai uniti al master

## Tavola dei contenuti

- [Installazione](#installazione)
- [Utilizzo](#utilizzo)
- [Supporto](#supporto)
- [COntribuisci](#contribuisci)

## Installazione

Clonare la repo, cancellare la cartella .git.

```
npm intall
```

fatto.

## Usage

Questo progetto ha come goal quello di costruire una struttura basata su dependecy-injection. Quindi per aggiungere ogni nuovo componente è bene seguire questo pattern. Anche se in realtà non è strettamente necessario.

### Dependency Injection

L'applicativo vero e proprio si trova tutto all'interno di index.ts; qui vengono istanziate tutte le parti dell'applicazione e si ha un immagine chiara dell'albero delle dipendenze e di quali componenti i vari elementi necessitano.

### Routing

Come si puo vedere in `./src/api/index.js` per gestire il routing si esporta una classe che dipende da un controller e da eventuali altri router o middleware utilizzati in essa. Come si vede in `./src/server.ts` la classe viene esportata e solo qui viene creata un istanza di essa che verrà utilizzata per gestire la dipendenza che viene esplicitata nel costruttore del server a quel router. Sotto il cofano c'è express.

### Model

Questo starter utilizza [Sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript), è veloce, affidabile e tipizzato. Per creare un nuovo modello, allinterno di `./src/models` creare un file ed esportare la classe che rappresenterà il modello. Guardare `user.ts` e la doc di sequelize e sequelize-typescript per i dettagli. Una volta creato andare in `./src/models/index.ts` e importarlo ed aggiungerlo sia all'interno della lista di `addModels` sia riesportandolo cosi si potrà usare `/models` come entrypoint per tutti i modelli.

### Autenticazione

Il controller e il router dell'autenticazione si trovano all'interno di `./src/auth` mentre l'hepler in `./src/lib/auth.ts`. Nell'helper sono contenuti anche dei middleware per gestire l'autenticazione anche all'esterno usandoli per proteggere le route. Per esempio `isAuth` serve per proteggere una route e decora `Request` con l'interfaccia `RequestSignIn` che può essere utilizzata per descrivere un middleware che dovrebbe essere protetto da autenticazione.

### Gestione degli errori

La gestione degli errori avviene attraverso la classe ErrorHandler in middleware/errorHandler.ts.

## Support

Please [open an issue](https://github.com/fraction/readme-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).
