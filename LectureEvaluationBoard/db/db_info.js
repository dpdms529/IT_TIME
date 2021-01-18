module.exports = (function () {
    return {
        local: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        real: {
            host: 'database-it-time.cqe4ow7k4iin.us-east-1.rds.amazonaws.com',
            port: '3306',
            user: 'admin',
            password: 'ittime2021',
            database: 'it_time'
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();