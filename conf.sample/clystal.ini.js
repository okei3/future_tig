module.exports = {
    base: __dirname + '/../clystal',
    mysql: {
        default : {
            master   : 'localhost',
            slave    : ['localhost'],
            standby  : 'localhost',
            user     : 'root',
            password : 'pass',
            database : 'tig_main'
        },
        user : {
            database : 'tig_user'
        }
    }
}
