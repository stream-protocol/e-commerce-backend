const dotenv = require("dotenv");
const BACKEND_URL = process.env.BACKEND_URL || "localhost:9000"
const ADMIN_URL = process.env.ADMIN_URL || "localhost:7001"
const STORE_URL = process.env.STORE_URL || "localhost:8000"

const Auth0ClientId = process.env.AUTH0_CLIENT_ID || ""
const Auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET || ""
const Auth0Domain = process.env.AUTH0_ISSUER_BASE_URL || ""

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
    case "production":
        ENV_FILE_NAME = ".env.production";
        break;
    case "staging":
        ENV_FILE_NAME = ".env.staging";
        break;
    case "test":
        ENV_FILE_NAME = ".env.test";
        break;
    case "development":
    default:
        ENV_FILE_NAME = ".env";
        break;
}

try {
    dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
    process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001,https://admin.streampay.store";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000,https://streampay.store";

const DATABASE_URL =
    process.env.DATABASE_URL || "postgres://xguzpcbdyfmmrm:c64a54087830d903c0267bd6d5472efa619079987de938cf729bbd91cc225e31@ec2-18-202-8-133.eu-west-1.compute.amazonaws.com:5432/d2fsgm84qcn8rc";

const REDIS_URL = process.env.REDIS_URL || "redis://default:6jVW8dbd8VDUrYY7tst3S3ujKPnJYl9SLAoaEOLDZEuTTwmeLe9cX62aES0GUykh@kxmmn6.stackhero-network.com:6379";

const plugins = [
    `medusa-fulfillment-manual`,
    `medusa-payment-manual`,
    {
        resolve: `@medusajs/file-local`,
        options: {
            upload_dir: "uploads",
        },
    },
    {
        resolve: "@medusajs/admin",
        /** @type {import('@medusajs/admin').PluginOptions} */
        options: {
            autoRebuild: true,
            develop: {
                open: process.env.OPEN_BROWSER !== "false",
            },
        },
    },
    {
        resolve: "medusa-plugin-auth",
        /** @type {import('medusa-plugin-auth').AuthOptions} */
        options: {
            // strict: "all", // or "none" or "store" or "admin"
            auth0: {
                clientID: Auth0ClientId,
                clientSecret: Auth0ClientSecret,
                auth0Domain: Auth0Domain,

                admin: {
                    callbackUrl: `http://localhost:9000/admin/auth/auth0/cb`,
                    failureRedirect: `${ADMIN_URL}/login`,

                    // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `${ADMIN_URL}/`,

                    // authPath: '/admin/auth/auth0',
                    // authCallbackPath: '/admin/auth/auth0/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, extraParams, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // }
                },

                store: {
                    callbackUrl: `http://localhost:9000/store/auth/auth0/cb`,
                    failureRedirect: `http://${STORE_URL}/login`,

                    // The success redirect can be overriden from the client by adding a query param `?redirectTo=your_url` to the auth url
                    // This query param will have the priority over this configuration
                    successRedirect: `http://${STORE_URL}`,

                    // authPath: '/store/auth/auth0',
                    // authCallbackPath: '/store/auth/auth0/cb',
                    // expiresIn: 24 * 60 * 60 * 1000,
                    // verifyCallback: (container, req, accessToken, refreshToken, extraParams, profile, strict) => {
                    //    // implement your custom verify callback here if you need it
                    // }
                }
            }
        }
    },
    {
        resolve: `medusa-payment-paypal`,
        options: {
            sandbox: process.env.PAYPAL_SANDBOX,
            clientId: process.env.PAYPAL_CLIENT_ID,
            clientSecret: process.env.PAYPAL_CLIENT_SECRET,
            authWebhookId: process.env.PAYPAL_AUTH_WEBHOOK_ID,
        },
    },
];

const modules = {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL
      }
    },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
    jwtSecret: process.env.JWT_SECRET,
    cookieSecret: process.env.COOKIE_SECRET,
    store_cors: STORE_CORS,
    database_url: DATABASE_URL,
    admin_cors: ADMIN_CORS,
    database_extra: {
        ssl: true,
    }
    // Uncomment the following lines to enable REDIS
    // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra:
      process.env.NODE_ENV !== "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
  },
  plugins,
  modules,
}
