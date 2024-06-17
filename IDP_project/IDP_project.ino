#include "Wire.h"


//const int analogInPin = A0;
//int sensorValue = 0;
int inputpinOne = 13;
int inputpinTwo = 11;
int inputpinThree = 9;
int inputpinFour = 7;
int inputpinFive = 5;
int inputpinSix = 4;
int patientOne, patientTwo, highlevelOne, highlevelTwo, lowlevelOne, lowlevelTwo;
int num, numtwo;

#include <SoftwareSerial.h>
SoftwareSerial ESP8266(3, 2);  // Rx, Tx

long writingTimer = 17;
long startTime = 0;
long waitTime = 0;

unsigned char check_connection = 0;
unsigned char times_check = 0;
boolean error;

String myAPIkey = "RX8F2BH50SZGT7TF";  // Your Write API Key from Thingsspeak

void setup() {
  Serial.begin(9600);
  Wire.begin();
  pinMode(inputpinOne,INPUT);
  pinMode(inputpinTwo,INPUT);
  pinMode(inputpinThree,INPUT);
  pinMode(inputpinFour,INPUT);
  pinMode(inputpinFive,INPUT);
  pinMode(inputpinSix,INPUT);
  ESP8266.begin(9600);
  startTime = millis();
  delay(2000);
  Serial.println("Connecting to Wifi");
  while (check_connection == 0) {
    Serial.print(".");
    ESP8266.print("AT+CWJAP=\"EyuMobile\",\"11111112\"\r\n");
    ESP8266.setTimeout(5000);
    if (ESP8266.find("WIFI CONNECTED\r\n") == 1) {
      Serial.println("WIFI CONNECTED");
      break;
    }
    times_check++;
    if (times_check > 3) {
      times_check = 0;
      Serial.println("Trying to Reconnect..");
    }
  }
}

void loop() {
  // ***logic goes here***
  Serial.begin(9600);
  patientOne = digitalRead(inputpinOne);      //green-white 13
  patientTwo = digitalRead(inputpinTwo);      //orange 11
  highlevelOne = digitalRead(inputpinThree);  //brown-white 9
  highlevelTwo = digitalRead(inputpinFour);   //brown 7
  lowlevelOne = digitalRead(inputpinFive);    //orange-white 5
  lowlevelTwo = digitalRead(inputpinSix);     //green 4
  Serial.print(patientOne);
  Serial.print(patientTwo);
  Serial.print(highlevelOne);
  Serial.print(highlevelTwo);
  Serial.print(lowlevelOne);
  Serial.println(lowlevelTwo);
  delay(100);
  
  if(patientOne == 1){
    Serial.println("patient One calls nurse");
    num = 2;
    numtwo = 0;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else if(patientTwo == 1){
    Serial.println("patient Two calls nurse");
    num = 3;
    numtwo = 0;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else if(highlevelOne == 1){
    Serial.println("patient One is on emergency level high");
    num = 2;
    numtwo = 8;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else if(highlevelTwo == 1){
    Serial.println("patient Two is on emergency level high");
    num = 3;
    numtwo = 8;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else if(lowlevelOne == 1){
    Serial.println("patient One is on emergency level low");
    num = 2;
    numtwo = 4;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else if(lowlevelTwo == 1){
    Serial.println("patient Two is on emergency level low");
    num = 3;
    numtwo = 4;
    writeThingSpeak(num,numtwo);
    delay(100);
  }
  else{
    Serial.println("None");
    num = 0;
    numtwo = 0;
    delay(100);
  }
}

void writeThingSpeak(int emergencylevel, int patientinfo) {
  startThingSpeakCmd();
  String getStr = "GET /update?api_key=";
  getStr += myAPIkey + "&field1=" + String(emergencylevel) + "&field2=" + String(patientinfo);  // Adjust this according to your ThingSpeak channel
  getStr += "\r\n\r\n";
  GetThingspeakcmd(getStr);
}

void startThingSpeakCmd() {
  ESP8266.flush();
  String cmd = "AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",80";
  ESP8266.println(cmd);
  Serial.print("Start Commands: ");
  Serial.println(cmd);

  if (ESP8266.find("Error")) {
    Serial.println("AT+CIPSTART error");
    return;
  }
}

String GetThingspeakcmd(String postStr) {
  String cmd = "AT+CIPSEND=";
  cmd += String(postStr.length());
  ESP8266.println(cmd);
  Serial.println(cmd);

  if (ESP8266.find(">")) {
    ESP8266.print(postStr);
    Serial.println(postStr);
    //delay(500);

    String response = "";
    while (ESP8266.available()) {
      char c = ESP8266.read();
      response += c;
    }

    Serial.print("Response received: ");
    Serial.println(response);

    ESP8266.println("AT+CIPCLOSE");
    Serial.println("AT+CIPCLOSE");

    // Check for success or failure in the response
    if (response.indexOf("200 OK") != -1) {
      Serial.println("GET request successful");
    } else {
      Serial.println("GET request failed");
    }

    return response;
  } else {
    ESP8266.println("AT+CIPCLOSE");
    Serial.println("AT+CIPCLOSE");
    Serial.println("Error sending GET request");
  }
  return "";
}
