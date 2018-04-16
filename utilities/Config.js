// Simple class to act as a singleton for app-wide configuration.

// We'll start with a common config that can be extended separately by the
// server/client, to provide environment-specific functionality
class Common {
    constructor() {
        this.host = process.env.HOST || 'localhost',
        this.port = process.env.PORT || 3000,
        
        this.mongoURL = null,
        
        this.mailerUser = "gmail.user@gmail.com",
        this.mailerPassword = "password";
        
        this.apolloClientOpt = {};

    }   
}

let Config;

if (process.env === 'development')
{
    Config = class DevConfig extends Common {
        constructor() {
            super();

            this.port = 3000;
            this.host = 'localhost';
            this.appTitle = 'Bets Mate - Development';
            this.mongoURL = 'mongodb://admin:k0mbanwa@ds159866.mlab.com:59866/betsmate';
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
        }
    }
};

module.exports = new Config();