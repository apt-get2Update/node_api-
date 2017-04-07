var express=require('express');
var bodyParser = require('body-parser');


var app=express();
var PORT= process.env.PORT||3110;

app.use(express.static(__dirname));
app.use(bodyParser.json()); 


var ppg= require('./ppg');
var lessons=require('./lessons');
var periods=[];
var subjects= [
  {name:'English',id:1},
  {name:'Maths',id:2},
  {name:'Science',id:3}];


app.get('/subjects/:id', function (req, res) {
	
  res.send(subjects);
})

app.get('/ppg', function (req, res) {
	var data=ppg.ppg;
  res.send(data);
})

app.get('/lessons/:id', function (req, res) {
	var id=req.params.id;
	var lesson;
	lessons.lessons.forEach(function(les,i){
		if(les.id==id){
			res.send(lessons.lessons[i]);
		}		
	});
})

app.get('/periods', function (req, res) {
  res.send(periods);
})

app.get('/qpg/:id',function(req,res){
	var id=req.params.id;
	let lesson=[];
	lessons.lessons.forEach(function(les,i){
		if(les.subject===Number(id)){
			lesson.push(les);
		}		
	});

	res.send(lesson)
})

app.listen(PORT,function(){
	console.log('server listening at:'+PORT);
});



// var link = document.createElement('a');
// link.href = "http://homepages.inf.ed.ac.uk/rbfnline/LOCAL_COPIES/TUFT/FIP2_3.pdf";
// link.download = 'file.pdf';
// link.dispatchEvent(new MouseEvent('click'));