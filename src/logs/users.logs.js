import log4js from 'log4js';

log4js.configure({
    appenders: {
        fileAppender: { 
            type: 'file', 
            filename: './src/logs/userAppLogger.log' 
        },
        console: { 
            type: 'console' 
        }
    },
    categories: {
        default: { 
            appenders: ['fileAppender', 'console'], 
            level: 'trace' 
        },
        production: { 
            appenders: ['fileAppender'], 
            level: 'info' 
        }
    }
});

export const logger = log4js.getLogger();

logger.info('User service application started successfully');