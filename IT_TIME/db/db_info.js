module.exports = (function () {
    return {
        local: {
            host: 'localhost',
            port: '3306',
            user: 'it_time',
            password: 'ittime',
            database: 'it_time'
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
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