var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();

router.get('/page', function(req, res, next) {
    res.redirect('/le_board/page/1');
});

router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "select idx, professor, subject, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, point from le_board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', {title: '강의 평가 게시판', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1);
    });
});

module.exports = router;

router.get('/write', function(req,res,next){
    res.render('write_le_board',{title : "강의평가 글쓰기"});
});

router.post('/write', function(req,res,next){
    var professor = req.body.professor;
    var subject = req.body.subject;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var point = req.body.point;
    var datas = [professor,subject,content,passwd, point];

    var sql = "insert into le_board(professor, subject, content, regdate, modidate, passwd, point) values(?,?,?,now(),now(),?,?)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/le_board/page');
    });
});

router.get('/read/:idx',function(req,res,next)
{
    var idx = req.params.idx;
    var sql = "select idx, subject, professor, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, point from le_board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('read_le_board', {title:"평가 상세", row:row[0]});
    });
});

router.post('/update',function(req,res,next)
{
    var idx = req.body.idx;
    var professor = req.body.professor;
    var subject = req.body.subject;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var point = req.body.point;
    var datas = [professor,subject,content,point,idx,passwd];

    var sql = "update le_board set professor=? , subject=?, content=?, modidate=now(), point=? where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/le_board/read/'+idx);
        }
    });
});

router.post('/delete',function(req,res,next)
{
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];

    var sql = "delete from le_board where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/le_board/page/');
        }
    });
});