String systemEN, weatherCode, Moisture1, Moisture2;
void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}
void senddata(String message){
  Serial.println("fetch");
  Serial.println(message);
}
void updatemoisture(int node, int moisture){
  senddata(String(node)+" "+String(moisture));  
}
void getsettings(){
  Serial.println("throw");
  while(1){
    if(Serial.available() > 0){
      systemEN = Serial.readString();
      break;
    }
  }
  digitalWrite(13, HIGH);
  while(1){
    if(Serial.available() > 0){
      weatherCode = Serial.readString();
      break;
    }
  }
  while(1){
    if(Serial.available() > 0){
      Moisture1 = Serial.readString();
      break;
    }
  }
  while(1){
    if(Serial.available() > 0){
      Moisture2 = Serial.readString();
      break;
    }
  }
}
void loop() {
  //updatemoisture(1, 330);
  //updatemoisture(2, 330);
  getsettings();
  //Serial.print("Status : ");
  //Serial.println(systemEN);
  //Serial.print("Weather : ");
  //Serial.println(weatherCode);
  //Serial.print("Node 1 : ");
  //Serial.println(Moisture1);
  //Serial.print("Node 2 : ");
  //Serial.println(Moisture2);  
  delay(1000);
}

