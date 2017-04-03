var path = "D:\\Anderson\ Files\\Official\\Projects\\IntelliWater\\Intelliwaterv1.1\\settings.txt";

    window.onload=function(){
      document.getElementById("getit").disabled=true;
    }

    function onoff(){
      document.getElementById("on").style.display='none';
      document.getElementById("off").style.display='';
      writeTextFile("Status : ON");
    }

    function onoff3(){
      document.getElementById("off").style.display='none';
      document.getElementById("on").style.display='';
      writeTextFile("Status : OFF");
    }

    function onoff1(){
       document.getElementById('onoff1').style.display='none';
       document.getElementById('onoff2').style.display='';
       document.getElementById("getit").disabled=false;
       getLocation();
    }

    function onoff2(){
       var fso=new ActiveXObject("Scripting.FileSystemObject");
       document.getElementById('onoff1').style.display='';
       document.getElementById('onoff2').style.display='none';
       document.getElementById("getit").disabled=true;
       var fh=fso.OpenTextFile(path,1,false,-2);
       var ftext=fh.ReadAll();
        fh.close();
        var a=ftext.indexOf("Weathercode :");
         var b=ftext.indexOf("Node ID : 1");
         var c=ftext.substring(a,b);
         var p=ftext.replace(c,"Weathercode :  "+"\n");
         var fh=fso.CreateTextFile(path,true);
         fh.write(p);
         fh.close();
         var r=document.getElementById("ka");
         r.innerHTML=" ";
         var r=document.getElementById("ki");
         r.innerHTML=" ";
    }

    function writeTextFile(output){
    	
      var fso=new ActiveXObject("Scripting.FileSystemObject");
      var fh=fso.OpenTextFile(path,1,false,-2);
      var ftext=fh.ReadAll();
      fh.close();
      var a=ftext.indexOf("Status :");
      var b=ftext.indexOf("\n");
      var c=ftext.substring(a,b+1);
      var p=ftext.replace(c,"");
      var f=fso.CreateTextFile(path,true);
      f.Write(output+"\n"+p);
      f.close();
    }
    function getLocation(){
    	var x=document.getElementById("ki");
    	if(navigator.geolocation){
    		navigator.geolocation.watchPosition(showPosition);
    	}
    	else{
    		x.innerHTML="geolocation is not supported by the browser";
    	}
    }
    function showPosition(position){
    	var lat=position.coords.latitude;
    	var long=position.coords.longitude;
    	var url="http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID=3e8d4059ab2a8cd35d449b90a307a1fc";
    	 $.ajax({
   		 dataType: "jsonp",
   		 url: url,
   		 method:"GET",
    	 jsonCallback: 'jsonp',
   		 cache: false,
    	success: function (data) {
         var fso=new ActiveXObject("Scripting.FileSystemObject");
      	 var r=document.getElementById("ka");
      	 r.innerHTML=data.weather[0].description;
      	 var r=document.getElementById("ki");
      	 r.innerHTML=data.name;
         var fh=fso.OpenTextFile(path,1,false,-2);
         var ftext=fh.ReadAll();
         fh.close();
         var a=ftext.indexOf("Weathercode :");
         var b=ftext.indexOf("Node ID : 1");
         var c=ftext.substring(a,b);
         var p=ftext.replace(c,"Weathercode : "+data.weather[0].id+"\n");
         var fh=fso.CreateTextFile(path,true);
         fh.write(p);
         fh.close();
   		 },
    	error: function(data) {
      	alert("OOPS");
   		 }
  		});
     	 
}
function hose(){
	document.getElementById("id1").style.visibility='hidden';
	document.getElementById("id2").style.visibility='visible';
  

  
}
function seho(){
	document.getElementById("id2").style.visibility='hidden';
	document.getElementById("id1").style.visibility='visible';
  
}
function change(){

  document.getElementById("setwater").style.display='';
}
function change1(){
  var output1=document.getElementById("sample3");
  var output=output1.options[output1.selectedIndex].value;
 
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,-2);
  var ftext=fh.ReadAll();
  var n=ftext.indexOf("Node ID : "+output);
  var n1=ftext.indexOf(": ",n);
  var n2=ftext.indexOf("Node Moisture Requirement :",n1+1);
  var n3=ftext.indexOf("Present Moisture :",n2+1);
  var y=ftext.indexOf("\n",n1);
  var y1=ftext.indexOf("\n",n2);
  var y2=ftext.indexOf("\n",n3);
  var res=ftext.substring(n1+2,y+1);
  var res1=ftext.substring(n2+27,y1+1);
  var res2=ftext.substring(n3+18,y2+1);
  fh.close();
  if(n == -1){
  document.getElementById("dataw").innerHTML=" ";
  document.getElementById("datav").innerHTML=" ";
  document.getElementById("dataq").innerHTML=" ";
  document.getElementById("viewnode").style.display='';
  }
  else{
  document.getElementById("dataw").innerHTML=res;
  document.getElementById("datav").innerHTML=res1;
  document.getElementById("dataq").innerHTML=res2;}
  document.getElementById("viewnode").style.display='';
}
function change2(){
  var output1=document.getElementById("sample4");
  var output=output1.options[output1.selectedIndex].value;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,-2);
  var ftext=fh.ReadAll();
  var n=ftext.indexOf("Node ID : "+output);
  fh.close();
  if(n == -1){
    document.getElementById("hi").innerHTML=" ";
  }
  else{
  var n1=ftext.indexOf("Present Moisture :",n);
  var n2=ftext.indexOf("\n",n1);
  var res=ftext.substring(n1+19,n2);
  document.getElementById("hi").innerHTML=res;}
 
  //timerset();
}
function done(){
  var output1=document.getElementById("sample5");
  var output2=document.getElementById("sample").value;
  if (isNaN(output2) || output2 < 0 || output2 > 1023) {
        alert("Input not valid");

    } else {
        
    
  var output=output1.options[output1.selectedIndex].value;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,0);
  var ftext=fh.ReadAll();
  fh.close();
  var x=ftext.indexOf("Node ID : "+output);
  if(x == -1){
  var fh=fso.OpenTextFile(path,8,true);
  fh.WriteLine("Node ID : "+ output);
  fh.WriteLine("Node Moisture Requirement : "+output2+"\nPresent Moisture : "+"\n");
  fh.close();
  document.getElementById("setwater").style.display='';}
  else{
    var a=ftext.indexOf("Present Moisture :",x);
    var b=ftext.indexOf("\n",a);
    var c=ftext.slice(x,b+1);
    var p=ftext.replace(c,"Node ID : "+ output+"\n"+"Node Moisture Requirement : "+output2+"\nPresent Moisture : "+"\n");
    var fh=fso.CreateTextFile(path,true);
    fh.Write(p);
    //fh.WriteLine("Node ID : "+ output);
    fh.close();
    document.getElementById("setwater").style.display='';
  }
  alert("Node ID : "+ output+"\n"+"Node Moisture Requirement : "+output2);}
  document.getElementById("sample").value=null;
  document.getElementById("setwater").style.display='none';
 
 
  
  
}

function timerset(){
  document.getElementById("viewnode2").style.display='';
  document.getElementById("continue").style.display='none';
  change2();
  document.getElementById("sample4").disabled=true;
  if(document.getElementById("hi").innerHTML == " " ){
    var reset2=document.getElementById("reset1");
    document.getElementById("time").innerHTML=" ";
     reset2.onclick=function(){
     document.getElementById("viewnode2").style.display='none';
     document.getElementById("sample4").disabled=false;
    change2();
   }
  }
  else{
  duration=60*5;
  display=document.getElementById("time");
   var timer = duration, minutes, seconds;
   var reset2=document.getElementById("reset1");
   var reset1=document.getElementById("reset");
    var eri=setInterval(clock, 1000); 
    reset1.onclick=function(){
    clearInterval(eri);
    eri=null;
    timer=duration;
    change2();
    eri=setInterval(clock, 1000);
   }
   reset2.onclick=function(){
     document.getElementById("continue").style.display='';
     document.getElementById("sample4").disabled=false;
     document.getElementById("viewnode2").style.display='none';
     clearInterval(eri);
    eri=null;
    timer=duration;
    change2();
   }
    function clock(){
      minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
            var output=document.getElementById("sample4").value;
            var fso=new ActiveXObject("Scripting.FileSystemObject");
            var fh=fso.OpenTextFile(path,1,false,0);
            var ftext=fh.ReadAll();
            var n=ftext.indexOf("Node ID : "+output);
            var n1=ftext.indexOf("Present Materialoisture : ",n);
            var n2=ftext.indexOf("\n",n1);
            var res=ftext.substring(n1+19,n2);
            document.getElementById("hi").innerHTML=res;
        }
    }
  }
}
