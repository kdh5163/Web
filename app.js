const express = require('express');
const logger = require('morgan');

// db 관련
const db = require('./models');


class App {

    constructor () {
        this.app = express();

        // db 접속
        this.dbConnection();
        
        // 뷰엔진 셋팅
        // this.setViewEngine();

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        // this.setStatic();

        // 로컬 변수
        // this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        // this.status404();

        // 에러처리
        // this.errorHandler();
    }

    dbConnection(){
        // DB authentication
        db.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .then(() => {
            console.log('DB Sync complete.');
            // return db.sequelize.sync();
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }


    setMiddleWare (){
        
        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

    }

    setViewEngine (){

    }


    setStatic (){
        this.app.use('/public', express.static('public'));
    }

    setLocals(){
        // 템플릿 변수
        this.app.use( (req, res, next) => {
            this.app.locals.req_path = req.path;
            next();
        });

    }

    getRouting (){
        this.app.use(require('./routes'))
    }

    status404() {        
        this.app.use( ( req , res, _ ) => {
            res.status(404).sendFile(__dirname + '/views/404.html')
        });
    }

    errorHandler() {
        this.app.use( (err, req, res,  _ ) => {
            res.status(500).sendFile(__dirname + '/views/500.html');
            console.log(err);
        });
    }
}

module.exports = new App().app;