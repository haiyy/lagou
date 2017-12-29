const Alert=function(opt){
   this.tit=opt.title;
   this.btnbox=opt.btnbox;
   this.img=opt.img
   this.light=opt.light?opt.light:false;
   this.times=opt.times?opt.times:1000;
   this.drag=opt.drag?opt.drag:false;
   this.init();
}
Alert.prototype={
    constructor:Alert,
    init:function(){
       var mark=document.createElement('div');
       mark.classList.add('mark');
       var alertbox=document.createElement('div');
       alertbox.classList.add('alertbox');
       mark.appendChild(alertbox);
       var h2=document.createElement('h2');
       h2.classList.add('h2');
       h2.innerHTML=this.tit;
       alertbox.appendChild(h2);
       var img=document.createElement('img');
       img.classList.add('img');
       img.src=this.img;
       alertbox.appendChild(img);
       for(let i=0; i<this.btnbox.length;i++){
          var button=document.createElement('button');
          button.classList.add('button'+i);
          alertbox.appendChild(button);
          button.innerHTML=this.btnbox[i];
       }
       document.body.appendChild(mark);
       var timer=null;
       if(this.light){
            timer=setInterval(function(){
            document.body.removeChild(mark);
            clearInterval(timer);
           },this.times);

       };
       var btn=alertbox.querySelectorAll('button');
       btn[0].onclick=function(){
         document.body.removeChild(mark);
         clearInterval(timer);
       }
       if(btn[1]){
         btn[1].onclick=function(){
           document.body.removeChild(mark);
           clearInterval(timer);
         }
       }
       if(this.drag){
          var w=alertbox.offsetWidth;
          var h=alertbox.offsetHeight;
          var winw=document.documentElement.clientWidth||document.body.clientWidth;
          var winh=document.documentElement.clientHeight||document.body.clientHeight;
          alertbox.onmousedown=function(e){
            var ev=e||event;
            var x=ev.clientX-this.offsetLeft;
            var y=ev.clientY-this.offsetTop;
            document.onmousemove=function(e){
              var ev=e||event;
              var pagex=ev.clientX-x;
              var pagey=ev.clientY-y;
              if(pagex<=0){
                pagex=0;
              }else if(pagex>=winw-w){
                pagex=winw-w;
              }
              if(pagey<=0){
                pagey=0;
              }else if(pagey>=winh-h){
                pagey=winh-h;
              }
              alertbox.style.left=pagex+200+'px';
              alertbox.style.top=pagey+100+'px';
            }
            document.onmouseup=function(){
              document.onmousemove=null;
              document.onmouseup=null;
            }
          }
       }
    }
}