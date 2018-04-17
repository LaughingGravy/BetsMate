const chalk = require('chalk');

require('babel-register')({
    babelrc: false, // Tell babel-register to ignore the .babelrc file
    presets: {
        'env': {
            'development': {'presets': ['react', 'stage-2', 'env', ]},
            'production': {'presets': ['react', 'stage-2', 'env']},
        }
    }
});

console.log(chalk.blue(`Server environment: ${process.env.NODE_ENV}`));

if (process.env.NODE_ENV === 'development')
    require('./server-dev');
else
    require('./server-prod');