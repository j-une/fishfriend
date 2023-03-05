/*
  Simple WebSocket client for ArduinoHttpClient library
  Connects to the WebSocket server, and sends a hello
  message every 5 seconds

  created 28 Jun 2016
  by Sandeep Mistry
  modified 22 Jan 2019
  by Tom Igoe

  this example is in the public domain
*/
#include <ArduinoHttpClient.h>
#include <Arduino.h>
#include <WifiNINA.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ArduinoJson.h>
#include "arduino_secrets.h"
#include "SPI.h"
#include 


#define HEATER_CONTROL 0
#define VALVE_CONTROL 1
#define PUMP_CONTROL_P 2
#define PUMP_CONTROL_N 3
#define ONE_WIRE_BUS 6
#define TEMP_DATA_BUS_2 7
#define FEED_CONTROL_P 12
#define FEED_CONTROL_N 13

char ssid[] = SECRET_SSID;        
char pass[] = SECRET_PASS;

int keyIndex = 0;            // your network key Index number (needed only for WEP)

int status = WL_IDLE_STATUS;
//Your Domain name with URL path or IP address with path
char server[] = "10.31.27.83";
int port = 80;
int desired_temp = 0;

DynamicJsonBuffer jsonBuffer(200);


char json[] = "{\"LED\": 0}"; 


// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);


// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.

WiFiClient client;
HttpClient httpClient = HttpClient(client, server, 2000);
int count = 0;

void printWifiStatus() {

  // print the SSID of the network you're attached to:

  Serial.print("SSID: ");

  Serial.println(WiFi.SSID());

  // print your board's IP address:

  IPAddress ip = WiFi.localIP();

  Serial.print("IP Address: ");

  Serial.println(ip);

  // print the received signal strength:

  long rssi = WiFi.RSSI();

  Serial.print("signal strength (RSSI):");

  Serial.print(rssi);

  Serial.println(" dBm");
}

void setup() {

  //Initialize serial and wait for port to open:

  Serial.begin(9600);
  sensors.begin();
  pinMode(HEATER_CONTROL, OUTPUT);

  // check for the WiFi module:

  if (WiFi.status() == WL_NO_MODULE) {

    Serial.println("Communication with WiFi module failed!");

    // don't continue

    while (true);

  }

  String fv = WiFi.firmwareVersion();

  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {

    Serial.println("Please upgrade the firmware");

  }

  // attempt to connect to Wifi network:

  while (status != WL_CONNECTED) {

    Serial.print("Attempting to connect to SSID: ");

    Serial.println(ssid);

    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:

    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:

    delay(10000);

  }

  Serial.println("Connected to wifi");

  printWifiStatus();

  // Call sensors.requestTemperatures() to issue a global temperature and Requests to all devices on the bus
  

    // read the status code and body of the response
    // int statusCode = httpClient.responseStatusCode();
    // String response = httpClient.responseBody();


    // client.println("POST /api/world HTTP/1.0"); 
    // client.println("Host: 10.31.27.83");     
    // client.println("Connection: close");
    // client.println("Content-Length: " + postData.length());
    // client.println("Content-Type: application/x-www-form-urlencoded");
    // client.println(postData);

    // client.println("POST /api/world HTTP/1.1"); 
    // client.println("Host: 10.31.27.83");     
    // // client.println("Accept: */*");
    // client.println("Content-Type: application/x-www-form-urlencoded");
    // // client.println("Connection: close");
    // client.println("Content-Length: " + String(postData.length()));
    // // client.println(String(postData.length()));
    // // client.println();
    // client.println(postData);
    // // // client.println("Content-Type: application/x-www-form-urlencoded");
    // // client.println("");
}




void loop() {

  // if there are incoming bytes available

  // // from the server, read them and print them:

  // while (client.available()) {

  //   char c = client.read();

  //   Serial.write(c);

  // }

   
  
  // Serial.print("Celsius temperature: ");
  // // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
  // Serial.print(sensors.getTempCByIndex(0)); 
  // Serial.print(" - Fahrenheit temperature: ");
  // Serial.println(sensors.getTempFByIndex(0));
  delay(100);
  Serial.println("Did not fail");
  
  while(client.connect(server, 2000)) {
    count++;
    Serial.println(count);
    sensors.requestTemperatures();
    Serial.println("making POST request");
    String contentType = "application/x-www-form-urlencoded";
    // String postData = "name=Alice&age=12";
    //String postData = "temperature=" + String(sensors.getTempCByIndex(0))+  "pH=" + String(sensors.getTempCByIndex(0)) "food_level=" + String(sensors.getTempCByIndex(0)) + "status=" + String(sensors.getTempCByIndex(0));
    //String postData = "temperature=1&ph=3&food_level=5&status=normal";
    String tempData = String(sensors.getTempCByIndex(0));
    String postData = "temperature=" + tempData + "&ph=5&food_level=5&status=normal&feeder=off";
    Serial.println("pre-post");
    httpClient.post("/api/sensors", contentType, postData);
    int statusCode = httpClient.responseStatusCode();
    String response = httpClient.responseBody();
    // Serial.print("Status code: ");
    // Serial.println(statusCode);
    // Serial.print("Response: ");
    // Serial.println(response);
    Serial.println("pre-get");
    httpClient.get("/api/commands");
    int statusCode_get = httpClient.responseStatusCode();
    String response_get = httpClient.responseBody();
    JsonObject& root = jsonBuffer.parseObject(response_get);
    // Serial.print("Status code: ");
    // Serial.println(statusCode_get);
    // Serial.print("Response: ");
    // Serial.println(response_get);
    if(!root.success()) {
      Serial.println("parseObject() failed");
    }   
    const char* food = root["feeder"];
    int temp_des = root["temperature"];
    const char* water = root["water_change"];
    if (sensors.getTempCByIndex(0) < temp_des){
      digitalWrite(HEATER_CONTROL, HIGH);
      Serial.println("BITCH");
      delay(10);
    }
    else
    {
      digitalWrite(HEATER_CONTROL, LOW);
      delay(10);
    }
    Serial.println(food);
    Serial.println(water);
    Serial.print("Temp: ");
    Serial.println(String(temp_des));
    jsonBuffer.clear();
    

    // if (strcmp(LED, "off") == 0) {
    //   digitalWrite(led, LOW); 
    //   Serial.println("BITCH ITS OFF");
    // }
    // else if (strcmp(LED, "on") == 0) {
    //   digitalWrite(led, HIGH);
    //   Serial.println("BITCH ITS ON"); 
    // }

    // Heater Shit


  }


  // if (currentLine.endsWith("GET /H")) {
  //         digitalWrite(led, HIGH);               // GET /H turns the LED on
  //       }
  // if (currentLine.endsWith("GET /L")) {
  //         digitalWrite(led, LOW);                // GET /L turns the LED off
      //}
  
  // if the server's disconnected, stop the client:

  // if (!client.connected()) {

  //   Serial.println();

  //   Serial.println("disconnecting from server.");

  //   client.stop();

  //   // do nothing forevermore:

  //   while (true);

  // }
}



/* THIS IS FOR GET REQUEST

void setup() {

  //Initialize serial and wait for port to open:

  Serial.begin(9600);

  while (!Serial) {

    ; // wait for serial port to connect. Needed for native USB port only

  }

  // check for the WiFi module:

  if (WiFi.status() == WL_NO_MODULE) {

    Serial.println("Communication with WiFi module failed!");

    // don't continue

    while (true);

  }

  String fv = WiFi.firmwareVersion();

  if (fv < WIFI_FIRMWARE_LATEST_VERSION) {

    Serial.println("Please upgrade the firmware");

  }

  // attempt to connect to Wifi network:

  while (status != WL_CONNECTED) {

    Serial.print("Attempting to connect to SSID: ");

    Serial.println(ssid);

    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:

    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:

    delay(10000);

  }

  Serial.println("Connected to wifi");

  printWifiStatus();

  Serial.println("\nStarting connection to server...");

  // if you get a connection, report back via serial:

  if (client.connect(server, 2000)) {

    Serial.println("connected to server");

    // Make a HTTP request:
    client.println("GET /api/hello");

    client.println("Host: 10.31.27.83");

    client.println("Connection: close");

    client.println();


  }

}


void loop() {

  // if there are incoming bytes available

  // from the server, read them and print them:

  while (client.available()) {

    char c = client.read();

    Serial.write(c);

  }

  // if the server's disconnected, stop the client:

  if (!client.connected()) {

    Serial.println();

    Serial.println("disconnecting from server.");

    client.stop();

    // do nothing forevermore:

    while (true);

  }
}

*/
