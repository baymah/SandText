import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    newDatabaseConnection:{
        development: {
            name:'DiConnection',
            host: 'localhost',
            username: 'root',
            password: '12345678',
            database: 'sandbox',
            port: 3306,
        },
        production: {
            name:'DiConnection',
            host: process.env.EDEKEE_AWS_HOST || 'edekee-db-instance.cnqxzbc12abt.us-east-2.rds.amazonaws.com',
            username: process.env.EDEKEE_AWS_USER || 'edekee',
            password: process.env.EDEKEE_AWS_PASSWORD || 'edekee',
            database: process.env.EDEKEE_AWS_DATABASE || 'edekeetestdb',
            port: process.env.EDEKEE_AWS_PORT || 3306,
            synchronize: false,
            // ssl: {
            //     rejectUnauthorized: false,
            // },
        }
    },
    database: {
        development: {
            host: 'localhost',
            username: 'root',
            password: '12345678',
            database: 'sandbox',
            port: 3306,
        },
        test: {
            host: 'localhost',
            username: 'edekee',
            password: 'edekee',
            database: 'edekeetestdb',
            port: 3306,
            synchronize: false,
        },
        staging: {
            // export PGSSLMODE=no-verify
            url:
                process.env.JAWSDB_URL ||
                'postgres://bdffdonkytemep:b9533046d3f514a7c28eb4f0aaaf5b82684eeff603173b10c8a838b1485df5bb@ec2-108-128-104-50.eu-west-1.compute.amazonaws.com:5432/dab16uq86f67t0',
            ssl: {
                rejectUnauthorized: false,
            },
        },
        production: {
            host: process.env.EDEKEE_AWS_HOST || 'edekee-db-instance.cnqxzbc12abt.us-east-2.rds.amazonaws.com',
            username: process.env.EDEKEE_AWS_USER || 'edekee',
            password: process.env.EDEKEE_AWS_PASSWORD || 'edekee',
            database: process.env.EDEKEE_AWS_DATABASE || 'edekeetestdb',
            port: process.env.EDEKEE_AWS_PORT || 3306,
            synchronize: false,
            // ssl: {
            //     rejectUnauthorized: false,
            // },
        }
        // pool: {
        //     min: process.env.DATABASE_POOL_MIN || 2,
        //     max: process.env.DATABASE_POOL_MAX || 10,
        //     acquire: 1000000,
        //     idle: 5000,
        //     requestTimeout: 100000,
        // },
        // acquireConnectionTimeout: 1000000,
    },

    admin: {
        password: process.env.ADMIN_PASSWORD || 'root',
        email: process.env.ADMIN_EMAIL || 'example@gmail.com',
    },

    auth: {
        secret: process.env.AUTH_SECRET || 'top-secret',
        authExpiresIn: '60m',
        authTokenExpiresInSeconds: 366600,
        refreshTokenExpiresInSeconds: 866400,
        otpExpiresIn:300
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
    elastic: {
        nodeUrl: process.env.ES_NODE_URL || 'http://localhost:9200',
    },
    aws: {
        s3BucketName: 'bucketeer-2d3a99a7-20b6-4150-8399-4a871f0932fb',
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'somerandomawsid',
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'somerandomsecret',
        AWS_REGION: process.env.AWS_REGION || 'eu-west-1',
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'randombucketname',
    },
    sendgrid: {
        apiKey: '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',
    },
    mailerlite: {
        baseURL: 'https://api.mailerlite.com/api/v2/',
        key: process.env.MAILERLITE_KEY,
    },
    nodeMailer: {
        baseURL: 'https://api.mailerlite.com/api/v2/',
        key: process.env.MAILERLITE_KEY,
    },
    mailgun: {
        user: process.env.MAILGUN_USER,
        port: process.env.MAILGUN_PORT,
        password: process.env.MAILGUN_PASSWORD,
        hostname: process.env.MAILGUN_HOSTNAME,
        apiKey:process.env.MAILGUN_APIKEY,
        domain: process.env.MAILGUN_HOST,
    },
    mode:{
        ENVIRONMENT: process.env.NODE_ENV
    },
    bugsnag: {
        apiKey: "",
    },
    logging:{
    logDirectory :process.env.LOGGING_EXCEPTION_PATH
    },
    tokenInfo : {
        accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
        refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
        issuer: process.env.TOKEN_ISSUER || '',
        audience: process.env.TOKEN_AUDIENCE || '',
      },
      smtp:{
        email:process.env.SMTP_EMAIL || "hello@mail.edekee.com",
        password:process.env.SMTP_PASSWORD || "adfe25f3a4de1ea50",

        googleAccountEmail:process.env.SMTP_GMAIL_EMAIL || "hello@mail.edekee.com",
        googleAccountPassword:process.env.SMTP_GMAIL_PASSWORD || "adfe25f3a4de1ea50",
      }
    
};
