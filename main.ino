// Author: Nihesh Anderson K
// Date  : 23/03/2017
// File  : main.ino

String systemEN;                                        // Parameters 
int weatherCode, Moisture1, Moisture2;                  // Parameters
int presentMoisture1, presentMoisture2;                 // Moisture sensor readings
int baudrate = 9600;                                    // Speed of serial data
int waterflowDuration = 5000;                           // Motor run time
long frequency = 600000;                                // Frequency of node check
int motorPin = 3;                                       // Pin that activates the water pump
int moistureWeatherShift = 50;                          // Decreases moisture requirement by 100
void setup() {
  Serial.begin(baudrate);
  getsettings();
  pinMode(motorPin, OUTPUT);
  pinMode(13, OUTPUT); //
}
void senddata(String message){                          // Sending data to python server through serial port
  Serial.println("fetch");
  Serial.println(message);
}
void updatemoisture(int node, int moisture){            // Updates node moisture in settings file
  senddata(String(node)+" "+String(moisture));  
}
void getsettings(){                                     // Gets settings file data from server
  Serial.println("throw");
  while(1){
    if(Serial.available() > 0){
      systemEN = Serial.readString();
      break;
    }
  }
  while(1){
    if(Serial.available() > 0){
      weatherCode = Serial.readString().toInt();
      break;
    }
  }
  if(weatherCode == 0){ 
    digitalWrite(13, HIGH);   
  }
  else{
    digitalWrite(13, LOW);
  }
  while(1){
    if(Serial.available() > 0){
      Moisture1 = Serial.readString().toInt();
      if(Moisture1 == 0){
        Moisture1 = 1023;
      }
      break;
    }
  }
  while(1){
    if(Serial.available() > 0){
      Moisture2 = Serial.readString().toInt();
      if(Moisture2 == 0){
        Moisture2 = 1023;
      }
      break;
    }
  }
}
void loop() {
  getsettings();
  if(systemEN.equals("ON")){
    presentMoisture1 = analogRead(A0);
    presentMoisture2 = analogRead(A1);
    updatemoisture(1, presentMoisture1);
    updatemoisture(2, presentMoisture2);
    if(weatherCode/100 != 2 || weatherCode/100 != 3 || weatherCode/100 != 5 || weatherCode == 0){
      if(presentMoisture1 < Moisture1 || presentMoisture2 < Moisture2){
        digitalWrite(motorPin, HIGH);
        delay(waterflowDuration);
        digitalWrite(motorPin, LOW);
      }
    }
    else{
      if(presentMoisture1 < Moisture1 - moistureWeatherShift || presentMoisture2 < Moisture2 - moistureWeatherShift){
        digitalWrite(motorPin, HIGH);
        delay(waterflowDuration);
        digitalWrite(motorPin, LOW);
      }
    }
    delay(frequency - 1000);
  }
  delay(1000);
}

