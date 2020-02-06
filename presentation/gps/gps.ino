#include <SoftwareSerial.h>
#include <TinyGPS.h>

TinyGPS gps;
SoftwareSerial serialgps(2,3);
int year;
byte month, day, hour, minute, second, hundredths;
unsigned long chars;
unsigned short sentences, failed_checksum;

void setup()
{

Serial.begin(9600);
serialgps.begin(9600);
Serial.println("==========================");
Serial.println("GPS");
Serial.println("===========================");
}

void loop()
{
while(serialgps.available()) 
{
int c = serialgps.read(); 
if(gps.encode(c)) 
{
float latitude, longitude;
gps.f_get_position(&latitude, &longitude);
Serial.print("Lat/Long: "); 
Serial.print(latitude,6); 
Serial.print(","); 
Serial.println(longitude,6); 
Serial.println();
gps.stats(&chars, &sentences, &failed_checksum);
delay(2000);
}
}
}
