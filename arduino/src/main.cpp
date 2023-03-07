#include <ArduinoHttpClient.h>
#include <Arduino.h>
#include <WifiNINA.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>
#include "arduino_secrets.h"
#include "SPI.h"
#include <Drive.h>
#include <Servo.h>

#define HEATER_CONTROL 0
#define VALVE_CONTROL 1
#define PUMP_CONTROL_P 2
#define PUMP_CONTROL_N 3
#define ONE_WIRE_BUS 6
#define TEMP_DATA_BUS_2 7
#define FEED_CONTROL_P 12
#define FEED_CONTROL_N 13
#define pH_SENSOR_PIN A1

const int IN1 = FEED_CONTROL_P;
const int IN2 = FEED_CONTROL_N;
const int IN3 = PUMP_CONTROL_P;
const int IN4 = PUMP_CONTROL_N;

unsigned long int avgValue; 
int buf[10],temp;

char ssid[] = SECRET_SSID;        
char pass[] = SECRET_PASS;

int keyIndex = 0;

int status = WL_IDLE_STATUS;
//Your Domain name with URL path or IP address with path
char server[] = "10.31.27.83";
int port = 80;
int desired_temp = 0;

char json[] = "{\"LED\": 0}"; 

DynamicJsonBuffer jsonBuffer(200);

// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

WiFiClient client;
HttpClient httpClient = HttpClient(client, server, 2000);

Servo myservo;

Drive drive(IN1, IN2, IN3, IN4);

int count = 0;
int pos = 0;

float phMeasurement() {
  for(int i=0;i<10;i++)       //Get 10 sample value from the sensor for smooth the value
  { 
    buf[i]=analogRead(pH_SENSOR_PIN);
    delay(5);
  }
  for(int i=0;i<9;i++)        //sort the analog from small to large
  {
    for(int j=i+1;j<10;j++)
    {
      if(buf[i]>buf[j])
      {
        temp=buf[i];
        buf[i]=buf[j];
        buf[j]=temp;
      }
    }
  }
  avgValue=0;
  for(int i=2;i<8;i++)                      //take the average value of 6 center sample
    avgValue+=buf[i];
  float phValue=(float)avgValue*5.0/1024/6; //convert the analog into millivolt
  phValue=3.5*phValue;     

  return float(phValue);

}

void feedFish(int foodQuantity) {
  for(int i = 0; i < foodQuantity; i++){

    analogWrite(IN2, 500);
    analogWrite(IN1, LOW);

    delay(3000);

    drive.stopMoving();

  }
  analogWrite(IN1, LOW);
}

void waterChange(){
  //Turn pump off
  analogWrite(IN3, LOW);
  analogWrite(IN4, LOW);
  
  //Turn valve servo to waste output
  for (pos = 0; pos <= 180; pos += 1) {
    myservo.write(pos);          
    delay(50);                       
  }

  //Turn pump on to pump waste water
  analogWrite(IN3, 500);
  analogWrite(IN4, LOW);
  delay(50000); //Enough time to clear the tank

  //Turn pump off
  analogWrite(IN3, LOW);
  analogWrite(IN4, LOW);

  //Turn valve servo to normal output
  for (pos = 180; pos >= 0; pos -= 1) { 
    myservo.write(pos);              
    delay(50);
  }
}


void printWifiStatus() {

  // print the SSID of the network you're attached to:

  //Serial.print("SSID: ");

  //Serial.println(WiFi.SSID());

  // print your board's IP address:

  IPAddress ip = WiFi.localIP();

  //Serial.print("IP Address: ");

  //Serial.println(ip);

  // print the received signal strength:

  long rssi = WiFi.RSSI();

  //Serial.print("signal strength (RSSI):");

  //Serial.print(rssi);

  //Serial.println(" dBm");
}


void setup() {

  //Initialize //Serial and wait for port to open:

  Serial.begin(9600);
  sensors.begin();

  /* Initialize HEATER_CONTROL*/
  /* Initialize Motor Driver (Pump and Feeder Control)*/
  /* Initialize Temperature Sensor*/
  /* Initialize pH Sensor*/

  pinMode(HEATER_CONTROL, OUTPUT);
  pinMode(FEED_CONTROL_N,OUTPUT);

  myservo.attach(VALVE_CONTROL);

  //Initially turn off all motors
  drive.stopMoving();
  delay(100);

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {

    //Serial.println("Communication with WiFi module failed!");

    while (true);

  }

  String fv = WiFi.firmwareVersion();

  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {

    //Serial.println("Please upgrade the firmware");

  }

  // attempt to connect to Wifi network:

  while (status != WL_CONNECTED) {

    //Serial.print("Attempting to connect to SSID: ");

    //Serial.println(ssid);

    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:

    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:

    delay(10000);

  }

  //Serial.println("Connected to wifi");

  printWifiStatus();
}




void loop() {   

  while(client.connect(server, 2000)) {
    // Get temp sensor data
    sensors.requestTemperatures();


    ////Serial.println("making POST request");
    String contentType = "application/x-www-form-urlencoded";

    // Store sensor data in variables
    String tempData = String(sensors.getTempCByIndex(0));
    String pHval = String(phMeasurement());

    // Make POST request with data we want to send
    String postData = "temperature=" + tempData + "&ph=" + pHval + "&food_level=5&status=normal&feeder=off";
    httpClient.post("/api/sensors", contentType, postData);
    int statusCode = httpClient.responseStatusCode();
    String response = httpClient.responseBody();

    // Make a GET request
    httpClient.get("/api/commands");
    // Check if GET request suceeded
    int statusCode_get = httpClient.responseStatusCode();
    String response_get = httpClient.responseBody();
    // Parse GET request
    JsonObject& root = jsonBuffer.parseObject(response_get);

    // Check to see if GET request was parsed
    if(!root.success()) {
      //Serial.println("parseObject() failed");
    }  

    analogWrite(IN3, 1000);
    analogWrite(IN4, LOW);

    //Store GET request data into variables 
    int food = root["feeder"];
    int temp_des = root["temperature"];
    bool water_change_req = root["water_change_req"];
    bool water_change_complete = root["water_change_complete"];

    // Keep heater within operating range
    if (sensors.getTempCByIndex(0) < temp_des){
      digitalWrite(HEATER_CONTROL, HIGH);
      delay(10);
    }
    else
    {
      digitalWrite(HEATER_CONTROL, LOW);
      delay(10);
    }

    // Feed the fish based on value from user (only turn if value not 0)
    if (food != 0){
      Serial.println("Yog Sucks");
      feedFish(food);
      Serial.println("Yog Blows");
      delay(10);
    }

    // Water change
    if (water_change_req){
      //Water Change Sequence
      waterChange();
    }

    // Clear jsonBuffer variable to prevent disconnection from client
    jsonBuffer.clear();


  }
}
