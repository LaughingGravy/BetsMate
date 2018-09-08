import chalk from 'chalk';
import mongoose from 'mongoose';

//Mongoose's built in promise has been deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

export function connectMongoDB(url, connectOpt)
{
    mongoose.connect(url, connectOpt, (error, db) => {
        if (error) {
            console.log(chalk.red.bold(`Error connecting to MongoDB instance: ${error}`));
        }
    
        console.log(chalk.green('Connected to MongoDB instance.'));
    });
};

