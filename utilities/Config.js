const yn = require('yn');

// Simple class to act as a singleton for app-wide configuration.

// We'll start with a common config that can be extended separately by the
// server/client, to provide environment-specific functionality
class Common {
    constructor() {
        this.host = process.env.HOST || 'localhost',
        this.port = process.env.PORT || 3000,
        this.corsOptions = {},
        this.enableHTTP = true,
        
        this.mongoURL = null,
        this.connectOpt = {},
        this.secret = '@0m0r1 Blu3 F0rest Pr3f3cture',
        
        this.mailerUser = "gmail.user@gmail.com",
        this.mailerPassword = "password";
        
        this.apolloClientOpt = {};
        this.isRunEngine = yn(process.env.RUN_ENGINE);
        this.apolloEngineServiceId = 'service:Betsmate:NXBwHRWuwnGryOWVgBF8lQ'; // default env variable will use ENGINE_API_KEY
    }   

    // handler404(ctx) {
    //     return () => {
    //         const stateDump = JSON.stringify(ctx.store.getState());

    //         // Explicitly set the return status to 404.  This is done for us by
    //         // default if we don't have a custom 404 handler, but left to the function
    //         // otherwise (since we might not always want to return a 404)
    //         ctx.status = 404;

    //         // Set the body
    //         ctx.body = `This route does not exist on the server - Redux dump: ${stateDump}`;
    //     }
    // } 
}

let Config;

if (process.env.NODE_ENV === 'development')
{
    Config = class DevConfig extends Common {
        constructor() {
            super();

            this.port = process.env.PORT || 3000
            this.sslPort = process.env.SSL_PORT || 443
            this.allowSSL = false
            this.host = 'localhost'

            this.mongoURL = 'mongodb://admin:k0mbanwa@ds159866.mlab.com:59866/betsmate';
            this.connectOpt = {
                keepAlive: true
            };
        }
    }
}
else
{
    Config = class ProdConfig extends Common {
        constructor() {
            super();

            this.port = 3000;
            this.host = 'localhost';
            this.mongoURL = 'mongodb://admin:k0mbanwa@ds159866.mlab.com:59866/betsmate';
            this.connectOpt = {
                keepAlive: true
            };
        }
    }
};

// if (SERVER)
//     Config = class ServerConfig extends Common {
//     constructor() {
//         super();
//     }

//     handler404(ctx) {
//         return () => {
//             const stateDump = JSON.stringify(ctx.store.getState());

//             // Explicitly set the return status to 404.  This is done for us by
//             // default if we don't have a custom 404 handler, but left to the function
//             // otherwise (since we might not always want to return a 404)
//             ctx.status = 404;

//             // Set the body
//             ctx.body = `This route does not exist on the server - Redux dump: ${stateDump}`;
//         }
//     }    
// }

export default new Config();