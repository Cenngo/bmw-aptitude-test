import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("Couldn't find .env file");
}

export default {
    port: parseInt(process.env.PORT || '3000'),
    dbUrl: process.env.DATABASE_URL || (() => { throw new Error("DATABASE_URL is not set") })(),
    logs: {
        level: process.env.LOG_LEVEL || 'info'
    },
    trustProxy: process.env.TRUST_PROXY || false,
    api: {
        prefix: process.env.API_PREFIX || '/api'
    }
}