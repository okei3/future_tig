module.exports = {
    domain : 'localhost',
    port : 80,
    sessionSecret : 'OB6dCFalX8Mrfe5tLzaFc5HbLaHH1Ou4WUG96inFB6h4yVYvtz/1CWTx7zPb5ZAeiTqr92firNk4',
    clystal: __dirname + '/../clystal',
    dsn : {
        redis : {
            main : {
                host : '127.0.0.1',
                port : 6379,
                db : 0
            }
        },
        mysql : {
            main : {
                host : '127.0.0.1',
                user : 'user',
                password : 'QcQF8kJW4uUdXYdWD7t1S2tvLCUkt2waBRnkdaMazeiDHRvbNYnACQu/54inNUOiTgeCjWY8+dBJ',
                database : 'db'
            }
        }
    }
};
