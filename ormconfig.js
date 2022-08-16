// import * as dotenv from "dotenv";
const dotenv = require('dotenv')
dotenv.config()
let envConfig = process.env.NODE_ENV==='development'
    ? {
        //   url: process.env.JAWSDB_URL,
            host: 'localhost',
            username: 'root',
            password: '12345678',
            database: 'sandbox',
            port: 3306,
        
      }
    : {
          host:
              process.env.EDEKEE_AWS_HOST ||
              'edekee-db-instance.cnqxzbc12abt.us-east-2.rds.amazonaws.comio',
          username: process.env.EDEKEE_AWS_USER || 'edekee',
          password: process.env.EDEKEE_AWS_PASSWORD || 'edekee',
          database: process.env.EDEKEE_AWS_DATABASE || 'edekeetestdb',
          port: process.env.EDEKEE_AWS_PORT || 3306,
      }
if (process.env.NODE_ENV === 'staging') {
    envConfig = {
        ...envConfig,
        synchronize: false,
        ssl: {
            rejectUnauthorized: false,
        },
    }
} else {
    envConfig = { ...envConfig, synchronize: false }
}

module.exports = {
    type: 'mysql',
    ...envConfig,
    logging: true,
    entities: ['src/infra/database/typeorm/entity/**/*{.ts,.js}'],
    migrations: ['src/infra/database/typeorm/migration/**/*{.ts,.js}'],
    subscribers: ['src/infra/database/typeorm/subscriber/**/*.ts'],
    seeds: ['src/infra/database/typeorm/seed/**/*{.ts,.js}'],
    factories: ['src/infra/database/typeorm/factory/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'dist/src/infra/database/typeorm/entity/',
        migrationsDir: 'src/infra/database/typeorm/migration',
        subscribersDir: 'dist/src/infra/database/typeorm/subscriber',
    },
}
