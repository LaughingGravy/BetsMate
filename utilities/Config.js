// Simple class to act as a singleton for app-wide configuration.

// We'll start with a common config that can be extended separately by the
// server/client, to provide environment-specific functionality
class Common {
    constructor() {
        this.host = process.env.HOST || 'localhost',
        this.port = process.env.PORT || 3000,
        this.corsOptions = {},
        
        this.mongoURL = null,
        this.connectOpt = {},
        this.secret = '@0m0r1 Blu3 Forest Prefecture',
        
        this.mailerUser = "gmail.user@gmail.com",
        this.mailerPassword = "password";
        
        this.apolloClientOpt = {};
        this.apolloEngineServiceId = 'service:Betsmate:NXBwHRWuwnGryOWVgBF8lQ'; // default env variable will use ENGINE_API_KEY

    }   
}

let Config;

if (process.env.NODE_ENV === 'development')
{
    Config = class DevConfig extends Common {
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

module.exports = new Config();