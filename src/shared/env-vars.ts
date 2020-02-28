import * as dotenv from 'dotenv'
dotenv.config()

// Node Env and Port Config
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const PORT: string | number = process.env.PORT || 8000;

// Jwt Secret and Expiration
const JWT_SECRET: string = process.env.JWT_SECRET;
const JWT_EXPIRATION: string = process.env.JWT_EXPIRATION;

// MongoDB Config
const MONGO_USER: string = process.env.MONGO_USER;
const MONGO_PASS: string = encodeURIComponent(process.env.MONGO_PASS);
const MONGO_DB: string = process.env.MONGO_DB;
const MONGO_HOST: string = process.env.MONGO_HOST;

// Production DB URL
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;
// Local DB URL
const MONGO_URL_DEV = `mongodb://localhost:27017/${MONGO_DB}`

// MongoDB Options
const MONGO_OPTIONS: Record<string, any> = {
  keepAlive: 1000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// AWS Config
const AWS_BUCKET_NAME: string = process.env.AWS_BUCKET_NAME;
const AWS_REGION: string = process.env.AWS_REGION;
const AWS_ACCESS_KEY: string = process.env.AWS_ACCESS_KEY;
const AWS_SCERET: string = process.env.AWS_SECRET

// Bcrypt Salt Round
const SALT_ROUND: number = NODE_ENV === 'development' ? 5 : 10;

// Email Config
const EMAIL_USER: string = process.env.EMAIL_USER;
const EMAIL_PASS: string = process.env.EMAIL_PASS;

export {
  NODE_ENV, PORT, JWT_SECRET, JWT_EXPIRATION,
  MONGO_URL, MONGO_URL_DEV, MONGO_OPTIONS, SALT_ROUND,
  AWS_BUCKET_NAME, AWS_REGION, AWS_SCERET, AWS_ACCESS_KEY,
  EMAIL_USER, EMAIL_PASS
}