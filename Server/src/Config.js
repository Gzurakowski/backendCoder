import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const defaultOptions = {default:{port:3001}, alias:{p:"port"}};
const args = minimist(process.argv.slice(2), defaultOptions);

export default {
    
    port: args.port || 8080,
    db:{
        url: process.env.DB_URL || 'mongodb://root:test@localhost:27017/',
    },
    whiteList: process.env.WHITELIST
}