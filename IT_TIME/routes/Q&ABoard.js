var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

router.get('/',function(req,res,next){
    res.redirect('/Q&ABoard/page_q&a_board/1');
});

router.get('/page_q&a_board', function(req, res, next) {
    res.redirect('/Q&ABoard/page_q&a_board/1');
});

router.get('/page_q&a_board/:page',function(req,res,next){
    var page = req.params.page;
    var sql = "select idx,title,date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate," +
        "name,vote,comment from `q&a_board`";
    conn.query(sql,function(err,rows){
        if(err) console.error("err : " + err);
        res.render('page_q&a_board',{title : '질문 게시판',rows:rows,page:page,length:rows.length-1,page_num:5,pass:true});
        console.log(rows.length-1);
    });

});

router.get('/write_q&a_board',function(req,res,next){
    res.render('write_q&a_board',{title:"질문 게시판 글 쓰기"});
});

router.post('/write_q&a_board',function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];

    var sql = "insert into `q&a_board`(name,title,content,regdate,modidate,vote,comment,passwd) values(?,?,?,now(),now(),0,0,?)";
    conn.query(sql,datas,function(err,rows){
        if(err) console.error("err : " + err);
        res.redirect('/Q&ABoard/page_q&a_board');
    });
});

router.get('/read_q&a_board/:idx',function(req,res,next) {
    var idx = req.params.idx;
    var sql = "update `q&a_board` set vote=vote+1 where idx=?"
    conn.query(sql,[idx],function(err,result){
        if(err) console.error(err);
        else{
            sql = "select idx, name, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
                "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,vote from `q&a_board` where idx=?";
            conn.query(sql,[idx],function(err,row){
                if (err) console.error(err);
                res.render('read_q&a_board', {title: "글 상세", row: row[0]});
            });
        }
    });
});

router.post('/update_q&a_board',function(req,res,next){
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,idx,passwd];

    var sql = "update `q&a_board` set name=? , title=?, content=?, modidate=now() where idx=? and passwd=?";
    conn.query(sql,datas,function(err,result){
        if(err) console.error(err);
        if(result.affectedRows == 0) {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else {
            res.redirect('/Q&ABoard/page_q&a_board/');
        }
    });
});

router.post('/delete_q&a_board',function(req,res,next){
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];

    var sql = "delete from `q&a_board` where idx=? and passwd=?";
    conn.query(sql,datas,function(err,result){
        if(err) console.error(err);
        if(result.affectedRows == 0){
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else{
            res.redirect('/Q&ABoard/page_q&a_board/');
        }
    });
});

module.exports = router;