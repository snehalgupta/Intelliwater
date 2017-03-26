var path = "C:\\Users\\Snehal\\Desktop\\IntelliWater\\settings.txt";


  	

    /*function onoff(){
      currentvalue=document.getElementById('onoff').value;
      if(currentvalue == "TURN-OFF"){
        document.getElementById('onoff').value="TURN-ON";
        writeTextFile("Status : OFF");
      }
      else{
        document.getElementById('onoff').value="TURN-OFF";
        writeTextFile("Status : ON");
      }
    }*/

    function onoff(){
      document.getElementById("on").style.display='none';
      document.getElementById("off").style.display='';
      writeTextFile("Status : ON");
    }

    function onoff2(){
      document.getElementById("off").style.display='none';
      document.getElementById("on").style.display='';
      writeTextFile("Status : OFF");
    }

    function onoff1(){
      var fso=new ActiveXObject("Scripting.FileSystemObject");
      currentvalue=document.getElementById('onoff1').innerHTML;
      if(currentvalue == "Weather-OFF"){
        document.getElementById('onoff1').innerHTML="Weather-ON";
        var fh=fso.OpenTextFile(path,1,false,0);
        var ftext=fh.ReadAll();
        fh.close();
        var a=ftext.indexOf("Weathercode :");
         var b=ftext.indexOf("Node ID : 1");
         var c=ftext.substring(a,b);
         var p=ftext.replace(c,"Weathercode : "+"\n");
         var fh=fso.CreateTextFile(path,true);
         fh.write(p);
        // fh.Write("Weathercode : "+data.weather[0].id+"\n"+p);
         fh.close();
         var r=document.getElementById("ka");
         r.innerHTML=" ";
         var r=document.getElementById("ki");
         r.innerHTML=" ";
      }
      else{
        //currentvalue1=document.getElementById('onoff').value;
        document.getElementById('onoff1').innerHTML="Weather-OFF";
        //writeTextFile("Status : "+currentvalue1);
        getLocation();
      }
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
      //var fso=new ActiveXObject("Scripting.FileSystemObject");
      var f=fso.CreateTextFile(path,true);
      f.Write(output+"\n"+p);
      //fh.Write(p);
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
      //var currentvalue1=document.getElementById('onoff').value;
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
        // fh.Write("Weathercode : "+data.weather[0].id+"\n"+p);
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
  //setreq();

  
}
function seho(){
	document.getElementById("id2").style.visibility='hidden';
	document.getElementById("id1").style.visibility='visible';
  document.getElementById("sample3").options.length = 0;
 // document.getElementById("v1").style.visibility='hidden';
 // document.getElementById("v2").style.visibility='hidden';
}
function change(){
  var output=document.getElementById("sample5").value;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,0);
  var ftext=fh.ReadAll();
  fh.close();
  var x=ftext.indexOf("Node ID : "+output);
  if(x == -1){
  var fh=fso.OpenTextFile(path,8,true);
  fh.WriteLine("\nNode ID : "+ output);
  fh.close();
  document.getElementById("setwater").style.display='';}
  else{
    var a=ftext.indexOf("Present Moisture : ",x);
    var b=ftext.indexOf("\n",a);
    var c=ftext.slice(x,b+2);
    var p=ftext.replace(c,"");
    var fh=fso.CreateTextFile(path,true);
    fh.Write(p);
    fh.WriteLine("\nNode ID : "+ output);
    fh.close();
    document.getElementById("setwater").style.display='';
  }
}
function change1(){
  var output1=document.getElementById("sample3");
  var output=output1.options[output1.selectedIndex].value;
 // document.write(output);
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,0);
  var ftext=fh.ReadAll();
  var n=ftext.indexOf("Node ID : "+output);
  var n1=ftext.indexOf(": ",n);
  var n2=ftext.indexOf(": ",n+9);
  var n3=ftext.indexOf(": ",n2+2);
  var y=ftext.indexOf("\n",n1);
  var y1=ftext.indexOf("\n",n2);
  var y2=ftext.indexOf("\n",n3);
  var res=ftext.substring(n1+2,y+1);
  var res1=ftext.substring(n2+2,y1+1);
  var res2=ftext.substring(n3+2,y2+1);
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
  var output=document.getElementById("sample4").value;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,1,false,0);
  var ftext=fh.ReadAll();
  var n=ftext.indexOf("Node ID : "+output);
  fh.close();
  if(n == -1){
    document.getElementById("hi").innerHTML=" ";
  }
  else{
  var n1=ftext.indexOf("Present Moisture : ",n);
  var n2=ftext.indexOf("\n",n1);
  var res=ftext.substring(n1+19,n2);
  document.getElementById("hi").innerHTML=res;}
 
  //timerset();
}
function done(){
  var output=document.getElementById("sample").value;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var fh=fso.OpenTextFile(path,8,true);
  fh.WriteLine("Node Moisture Requirement : "+output+"\nPresent Moisture : ");
  fh.close();
  var output1=document.getElementById("sample5").value;
  document.getElementById("sample").value=null;
  document.getElementById("setwater").style.display='none';
  document.getElementById("sample5").value=null;
  var sel = document.getElementById("sample3");
  var opt = document.createElement("option");
  opt.innerHTML = output1 ;
  opt.value = output1 ;
  sel.appendChild(opt);
  
  
}
function setreq(){
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var f=fso.OpenTextFile(path,1,false,0);
  var ftext=f.ReadAll();
  f.close();
  var n=ftext.indexOf("Node ID : ");
  var arr = [];
  var sel = document.getElementById("sample3");
  while(n != -1){
    var i=ftext.indexOf("\n",n);
    arr.push(ftext.substring(n+10,i));
    n=ftext.indexOf("Node ID : ",n+1);
  }
  for (var j = 0; j < arr.length; j++) {
        var opt = document.createElement("option");
        opt.innerHTML = arr[j];
        opt.value = arr[j];
        sel.appendChild(opt);
    }
}

function timerset(){
  document.getElementById("viewnode2").style.display='';
  change2();
  if(document.getElementById("hi").innerHTML == " " ){
    var reset2=document.getElementById("reset1");
    document.getElementById("time").innerHTML=" ";
     reset2.onclick=function(){
     document.getElementById("viewnode2").style.display='none';
     document.getElementById("sample4").value=null;
    change2();
   }
  }
  else{
  duration=60*5;
  display=document.getElementById("time");
   var timer = duration, minutes, seconds;
   var reset1=document.getElementById("reset");
   var reset2=document.getElementById("reset1");
    var eri=setInterval(clock, 1000); 
    reset1.onclick=function(){
    clearInterval(eri);
    eri=null;
    timer=duration;
    change2();
    eri=setInterval(clock, 1000);
   }
   reset2.onclick=function(){
     document.getElementById("viewnode2").style.display='none';
     document.getElementById("sample4").value=null;
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