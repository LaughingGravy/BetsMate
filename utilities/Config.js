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
        
        this.mailerUser = "baikinmanlovesdokinchan@gmail.com",
        this.mailerPassword = "k0mbanwa",
        this.mailerReply = "no.reply@betsmate.com",
        this.loginTokenExpiryInHours = 6,
        this.emailVerificationExpiryInHours = 1,
        
        this.apolloClientOpt = {};
        this.isRunEngine = yn(process.env.RUN_ENGINE);
        this.apolloEngineServiceId = 'service:Betsmate:NXBwHRWuwnGryOWVgBF8lQ'; // default env variable will use ENGINE_API_KEY
    }   
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
            this.host = process.env.HOST || 'localhost'

            this.resetTokenExpiryInDays = 1

            this.mongoURL = 'mongodb://admin:k0mbanwa@ds159866.mlab.com:59866/betsmate'
            this.connectOpt = {
                keepAlive: true
            },

            //this.bolt = "bolt://hobby-iiiklpkknlfngbkemhilohbl.dbs.graphenedb.com:24786"
            this.bolt = "bolt://hobby-fcojdebjmjfegbkefcekbebl.dbs.graphenedb.com:24786"
            this.neoUsername = "admin",
            //this.neoPassword = "b.CFFFu5eTaFox.68rQ5gRejhGzu9ZQ"
            this.neoPassword = "b.0K6Hf98kwdvO.hSbNF1MYYBz9X0nt"
        }
    }
}
else
{
    Config = class ProdConfig extends Common {
        constructor() {
            super();

            this.port = process.env.PORT || 3000
            this.host = process.env.HOST || 'localhost'
            this.sslPort = process.env.SSL_PORT || 443
            this.allowSSL = false
            this.mongoURL = 'mongodb://admin:k0mbanwa@ds159866.mlab.com:59866/betsmate';
            this.connectOpt = {
                keepAlive: true
            };

            this.resetTokenExpiryInDays = 1

            this.bolt = "bolt://hobby-iiiklpkknlfngbkemhilohbl.dbs.graphenedb.com:24786"
            this.neoUsername = "admin"
            this.neoPassword = "b.CFFFu5eTaFox.68rQ5gRejhGzu9ZQ"
        }
    }
}

export default new Config();