var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

router.get('/page', function(req, res, next) {
    res.redirect('/Q&ABoard/page/1');
});

router.get('/page/:page',function(req,res,next){
    var page = req.params.page;
    var sql = "select idx,title,content,date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate," +
        "name,vote,comment from `q&aboard`";
    conn.query(sql,function(err,rows){
        if(err) console.error("err : " + err);
        res.render('page',{title : '질문 게시판',rows:rows,page:page,length:rows.length-1,page_num:2,pass:true});
        console.log(rows.length-1);
    });

});


module.exports = router;