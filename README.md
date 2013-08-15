[![Build Status](https://travis-ci.org/9uArtz/future_tig.png?branch=feature/room)](https://travis-ci.org/9uArtz/future_tig)

# How to Setup

    $ tree conf
    conf
    ├── developers
    └── development.js

    $ cat conf/development.js
    module.exports = {
        domain: 'localhost',
        port: 8080,
        sessionSecret: 'test',
        dsn: {
            redis:{
                main: {
                    host: '127.0.0.1',
                    port: 6379,
                    db:0
                }
            }
        }
    };

    $ cat conf/developers
    takeshi:developer:c8250b72f7f01b3a6ba0851ff8300897

    c8250b72f7f01b3a6ba0851ff8300897 is published by command below
    $ echo -n takeshi:developer:testtest | md5sum
    c8250b72f7f01b3a6ba0851ff8300897  -

    $ brew install redis

    $ git submodule update --init

    $ npm install

# How to Use
    $ redis-server
    $ NODE_ENV=development NODE_PATH=./lib node app.js
