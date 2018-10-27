export default interface Configuration {
  PORT: number | string;
  ENVIROMENT: 'Production' | 'Development';
  DB_USER: string;
  DB_PASS: string;
  DB_URI: string;
  DB_PORT: number;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  STRIPE_SK: string;
  STRIPE_PK: string;
  PAYPAL_CLIENT_ID: string;
  PAYPAL_SECRET: string;
}
