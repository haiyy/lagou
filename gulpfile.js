var gulp=require("gulp");
var webserver=require("gulp-webserver");
var path=require("path");
var fs=require("fs");
gulp.task("ser",function(){
      gulp.src(".")//获取接口用.
       .pipe(webserver({
         host:'localhost',
         port:8088,
         fallback:'index.html',
         middleware:function(req,res,next){
            res.writeHead(200,{
             'content-type':'text/json;charset=utf-8',
             'Access-Control-Allow-Origin':'*'
            })
            var pathname=req.url.split('/')[1];
            var filename=path.join(__dirname,'data',pathname+".json");
            fs.readFile(filename,function(err,data){
                   if(err){
                     throw err
                   }else{
                    res.end(data);
                   }
                   next();
                })
           }
        }));
    })
gulp.task('default',function(){
  gulp.start('webserver');
})