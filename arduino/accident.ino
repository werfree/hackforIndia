#include <Wire.h>
#include <Adafruit_Sensor.h> 
#include <Adafruit_ADXL345_U.h>

#define ledACCIDENT 9
#define ledALCOHOL 8
#define buz 7
#define samples 10
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();

int sensorPin = A0;
int alcohol=0;
int isAccident;
int xsample=0;
int ysample=0;
int zsample=0;

int xPre=0;
int yPre=0;
int zPre=0;


void setup(void) 
{
    pinMode(ledACCIDENT,OUTPUT);
    pinMode(ledALCOHOL,OUTPUT);
    pinMode(4,OUTPUT);
    pinMode(buz,OUTPUT);
    isAccident=0;
   Serial.begin(9600);  
   if(!accel.begin())
   {
      Serial.println("No ADXL345 sensor detected.");
      while(1);
   }else{
    digitalWrite(ledACCIDENT,HIGH);
    digitalWrite(ledALCOHOL,HIGH);

    for(int i=0;i<samples;i++)
  {
   sensors_event_t event; 
   accel.getEvent(&event);
    xsample+=event.acceleration.x;
    ysample+=event.acceleration.y;
    zsample+=event.acceleration.z;
    delay(500);
  }

   xsample/=samples;
   ysample/=samples;
   zsample/=samples;
   Serial.println(xsample);
   Serial.println(ysample);
   Serial.println(zsample);
   delay(1000);}
    
   
   digitalWrite(ledACCIDENT, LOW);
   digitalWrite(ledALCOHOL,LOW);
   digitalWrite(4,HIGH);
}




void loop(void) 
{
  int Value = analogRead(sensorPin);
  //Serial.println(Value-50);
  if (Value-50 > 350) {
    alcohol=1;
    alcoholDetected(1);
  }else{
    alcohol=0;
    alcoholDetected(0);
  }

   sensors_event_t event; 
   accel.getEvent(&event);
   int x=event.acceleration.x;
   int y=event.acceleration.y;
   int z=event.acceleration.z;
   //boolean isAccidentTrue=checkAccident(x,y,z);
   float j=(sqrt((x*x)+(y*y)+(z*z))/9.8);
   if(j>2.30 && alcohol==0){
    Serial.println(j);
    callAccident();
   }

  /* if(isAccidentTrue){
    callAccident();
   }*/
}

/*boolean checkAccident(int x,int y, int z){
  int a=x+y+z;
    if(x!=xsample  && z!=zsample && y==ysample){
      if(isAccident==75){
      Serial.print("Accident");
      return true;
      }else{
        isAccident+=1; 
      }
    }else if(y!=ysample && x==xsample &&(z==zsample || z==zsample+1)){
      if(isAccident==75){
      Serial.print("Accident");
      return true;
      }else{
        isAccident+=1; 
      }
    }
      else if(y!=ysample && z!=zsample&& (x==xsample || x==xsample+1))
      {
       if(isAccident==75){
      Serial.print("Accident");
      return true;
      }else{
        isAccident+=1; 
      }
      
    }
    if(){
    }
    }
      else{
    
     isAccident=0;
    Serial.println("In");
    Serial.println(x);
    Serial.println(y);
    Serial.println(z); 
  }
  return false;
}*/
void callAccident(){
  Serial.print(",n");
  isAccident=1;
  digitalWrite(ledACCIDENT, HIGH);
  
  if(isAccident==1){
    tone(buz,350,15000);
  }
   else{
    noTone(buz);
   }
  delay(15000);
    Serial.println("Latitude= ");
  Serial.println("Longtitude= ");
  
}

void alcoholDetected(int a){
  if (a){
  digitalWrite(ledALCOHOL, HIGH);
  digitalWrite(ledACCIDENT, LOW);
  tone(buz,100,5000);
  }else{
  digitalWrite(ledALCOHOL, LOW);
  digitalWrite(ledACCIDENT, LOW);
  noTone(buz);
}
}
