	var http = require('http');
var fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈
var express=require('express')
var app = express();
var ejs = require('ejs');
app.use(express.static('public'));
var morgan = require('morgan') //로그 모듈 임포트
var mysql = require('mysql')
var bodyParser = require('body-parser');
var path = require('path');
var StringDecoder = require('string_decoder').StringDecoder;
var router = express.Router();
function send404Message(response){
    response.writeHead(404,{"Content-Type":"text/plain"}); // 단순한 글자 출력
    response.write("404 ERROR... ");
    response.end();
}
var request = require('request');
//app.use(app.router);
var connection = mysql.createConnection({
  host: 'localhost', // DB가 위치한 IP주소
           // DB와 연결할 포트번호
  user: 'root',        // 계정이름
  password: 'root',    // 계정 비밀번호
  database: 'board01'    // 데이터베이스 이름
});
connection.connect();
 app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){

    fs.readFile('./public/ucl.html',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });

});

app.get('/',function(req,res){

    fs.readFile('./public/champs_menu1.html',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });

});
app.get('/',function(req,res){

    fs.readFile('./public/champs_menu2.html',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });

});
app.get('/',function(req,res){

    fs.readFile('./public/champs_menu3.html',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });

});

app.get('/',function(req,res){

    fs.readFile('./public/champs_menu4.html',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });

});
app.get('/',function(req,res){

    fs.readFile('./public/champs_menu5',function(err,data){
        if(err) console.log(err);
        else{
            res.write(data.toString());
        }

    });
    

});
///////////////////////////////////////////////////////////////////////////////////////////
app.post('/list',function(request,response){
  
 var sql = 'select * from board';


 connection.query(sql,function(error,result){
   response.send(result)  
	})
 });

app.post('/show',function(req,res){
	console.log("대라대라!");
	var titleclick = req.body.title_click;
	var wtclick=req.body.title_writer;
	console.log(titleclick);
	console.log(wtclick);		
    
    connection.query('select * from com where title=? and writer=?',[titleclick,wtclick],function(error,result){
    	//console.log("대라대라!");console.log("대라대라!");console.log("대라대라!");
    	
    	if(error) console.log(error);

    	console.log(result[0].title);
    	console.log(result[0].writer);
    	var rt=typeof(result);
    	console.log(rt);
    //response.send(result)    
	
	res.send(result);
})
});

app.post('/add',function(request,response){

 var writer = request.param('writer'); 
 var content = request.param('content');
 
 console.log(writer);
 console.log(content);
 
  //id값이 넘어왔는지 확인
 
 var sql = "insert into board(writer,content)values(?,?)";
 connection.query(sql,[writer,content],
  function(error,result){    
  response.send(writer);
	})
 });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/list_1',function(request,response){
 
 console.log('멤버목록 출력');
 var sql = 'select * from board2';


 connection.query(sql,function(error,result){
    response.send(result)     
	})
 });


app.post('/add_1',function(request,response){
console.log('멤버한명 추가');
 var writer = request.param('writer1');
 var content = request.param('content1');
 
 console.log(writer);
 console.log(content);	
 
 var sql = "insert into board2(writer,content)values(?,?)";
 connection.query(sql,[writer,content],
   function(error,result){    
  response.send(writer);
	})
 });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/list_2',function(request,response){
 
 console.log('멤버목록 출력1');
 var sql = 'select * from board3';


 connection.query(sql,function(error,result){
    response.send(result)    
	})
 });


app.post('/add_2',function(request,response){
console.log('멤버한명 추가1');
 var writer = request.param('writer2');
 var content = request.param('content2');
 
 console.log(writer);
 console.log(content);	
 
 
 var sql = "insert into board3(writer,content)values(?,?)";
 connection.query(sql,[writer,content],
  function(error,result){    
  response.send(writer);
	})
 });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/list_3',function(request,response){
 
 console.log('멤버목록 출력2'); 
 var sql = 'select * from board4';


 connection.query(sql,function(error,result){
    response.send(result)   
    	})
 });


app.post('/add_3',function(request,response){
console.log('멤버한명 추가2');
 var writer = request.param('writer3'); 
 var content = request.param('content3');
 
 console.log(writer);
 console.log(content);	
 
 var sql = "insert into board4(writer,content)values(?,?)";
 connection.query(sql,[writer,content],
  function(error,result){    
  response.send(writer);
	})
 });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post('/list_com',function(request,response){
 
 var sql = 'select * from com';

 console.log("되니");
 connection.query(sql,function(error,result){
    response.send(result)     
	})
 });


app.post('/add_com',function(request,response){
 var writer = request.param('writer_com');
 var content = request.param('content_com');
 var title = request.param('title_com')
 console.log(writer);
 console.log("등록");
 console.log(content);
var sql = "insert into com(writer,content,title)values(?,?,?)";
 connection.query(sql,[writer,content,title],
  function(error,result){    
  response.send(writer);
	})
 });
http.createServer(app).listen(8888);
console.log("Server Created...");
