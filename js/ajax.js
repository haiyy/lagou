var getJson=function(url){
  return new Promise(function(resolve,reject){
      var xml=null;
      if(window.XMLHttpRequest){
          xml=new XMLHttpRequest()
      }else{
          xml=new ActiveXObject("Microsoft.XMLHTTP");
      }
      xml.open('GET',url,true);
      xml.send(null);
      xml.onreadystatechange=function(){
          if(xml.readyState!=4) return;
          if(xml.status===200){
              resolve(xml.responseText);
          }else{
             reject(xml.statusText);
          }
      }
  })
}
