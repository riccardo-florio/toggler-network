/*
 *  Json parametric GET REST response with ArduinoJSON library
  *  by Mischianti Renzo <https://mischianti.org>
 *
 *  https://mischianti.org/
 *
 */

#include "Arduino.h"
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <ArduinoJson.h>
#include <SimpleDHT.h>

const char* ssid = "iliadbox-109322";
const char* password = "w7sbzq6wkcqnnwtbqntxhs";

// genero l'hostname in modo casuale
int hNum = random(0, 9); //numero random tra 0 e 9
String hostname = "toggler" + String(hNum); //indica toggler#.local (# = hNum)

ESP8266WebServer server(80);
SimpleDHT11 dht11;

void setCrossOrigin() {
  server.sendHeader(F("Access-Control-Allow-Origin"), F("*"));
  server.sendHeader(F("Access-Control-Max-Age"), F("600"));
  server.sendHeader(F("Access-Control-Allow-Methods"), F("PUT,POST,GET,OPTIONS"));
  server.sendHeader(F("Access-Control-Allow-Headers"), F("*"));
};


// Serving Hello world
void getHelloWord() {
  DynamicJsonDocument doc(512);
  doc["name"] = "Hello world";

  //Serial.print(F("Stream..."));
  String buf;
  serializeJson(doc, buf);
  server.send(200, "application/json", buf);
  //Serial.print(F("done."));
}

// Serving Hello world
void getSettings() {
  setCrossOrigin();
  //
  // Allocate a temporary JsonDocument
  // Don't forget to change the capacity to match your requirements.
  // Use arduinojson.org/v6/assistant to compute the capacity.
  //  StaticJsonDocument<512> doc;
  // You can use DynamicJsonDocument as well
  DynamicJsonDocument doc(512);

  doc["ip"] = WiFi.localIP().toString();
  doc["gw"] = WiFi.gatewayIP().toString();
  doc["nm"] = WiFi.subnetMask().toString();
  doc["hostname"] = hostname;
  doc["type"] = "humiture-sensor";

  Serial.print(F("Stream..."));
  String buf;
  serializeJson(doc, buf);
  server.send(200, F("application/json"), buf);
  Serial.println(F("done."));
}

const int led = LED_BUILTIN;
const int sPin = 0;
const char on = LOW;
const char off = HIGH;

// Serving sensor status after measure
void readData() {
  //Leggo i dati dal sensore
  byte temp = 0;
  byte umid = 0;

  int err = SimpleDHTErrSuccess;
  if ((err = dht11.read(sPin, &temp, &umid, NULL)) != SimpleDHTErrSuccess) {
    Serial.print("Read DHT11 failed, err=");
    Serial.println(err);
    delay(1000);
    return;
  }
  Serial.print("Sample OK: ");
  Serial.print((int)temp); Serial.print(" °C, ");
  Serial.print((int)umid); Serial.println(" H");

  //Metto i dati nel json
  setCrossOrigin();
  DynamicJsonDocument doc(512);
  doc["temp"] = (int)temp;
  doc["umid"]=(int)umid;

  //Invio i dati
  Serial.print(F("Stream..."));
  String buf;
  serializeJson(doc, buf);
  server.send(200, "application/json", buf);
  Serial.println(F("done."));
}

// void setSettings() {
//   // expected
//   // {"ip":"192.168.1.129","gw":"192.168.1.1","nm":"255.255.255.0"}
//   //Serial.println(F("postConfigFile"));

//   setCrossOrigin();

//   String postBody = server.arg("plain");
//   Serial.println(postBody);

//   DynamicJsonDocument doc(512);
//   DeserializationError error = deserializeJson(doc, postBody);
//   if (error) {
//     // if the file didn't open, print an error:
//     Serial.print(F("Error parsing JSON "));
//     Serial.println(error.c_str());

//     String msg = error.c_str();

//     server.send(400, F("text/html"), "Error in parsin json body! <br>" + msg);

//   } else {
//     JsonObject postObj = doc.as<JsonObject>();

//     Serial.print(F("HTTP Method: "));
//     Serial.println(server.method());

//     if (server.method() == HTTP_POST) {
//       if ((postObj.containsKey("ip"))) {

//         Serial.print(F("Open config file..."));
//         // Here you can open your file to store your config
//         // Now I simulate It and set configFile a true
//         bool configFile = true;
//         if (!configFile) {
//           Serial.println(F("fail."));
//           server.send(304, F("text/html"), F("Fail to store data, can't open file!"));
//         } else {
//           Serial.println(F("done."));
//           const char* address = postObj[F("ip")];
//           const char* gatway = postObj[F("gw")];
//           const char* netMask = postObj[F("nm")];

//           Serial.print("ip: ");
//           Serial.println(address);
//           Serial.print("gw: ");
//           Serial.println(gatway);
//           Serial.print("nm: ");
//           Serial.println(netMask);

//           //                  server.sendHeader("Content-Length", String(postBody.length()));
//           server.send(201, F("application/json"), postBody);

//           //                  Serial.println(F("Sent reset page"));
//           //                    delay(5000);
//           //                    ESP.restart();
//           //                    delay(2000);
//         }
//       } else {
//         server.send(204, F("text/html"), F("No data found, or incorrect!"));
//       }
//     }
//   }
// }


void sendCrossOriginHeader() {
  //Serial.println(F("sendCORSHeader"));
  server.sendHeader(F("access-control-allow-credentials"), F("false"));
  setCrossOrigin();
  server.send(204);
}

// Define routing
void restServerRouting() {
  server.on("/", HTTP_GET, []() {
    server.send(200, F("text/html"),
                F("Welcome to the REST Web Server"));
  });
  server.on(F("/helloWorld"), HTTP_GET, getHelloWord);
  server.on(F("/settings"), HTTP_OPTIONS, sendCrossOriginHeader);
  server.on(F("/settings"), HTTP_GET, getSettings);
  server.on(F("/readData"), HTTP_OPTIONS, sendCrossOriginHeader);
  server.on(F("/readData"), HTTP_GET, readData);

  //server.on(F("/settings"), HTTP_POST, setSettings);
}

// Manage not found URL
void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}

void setup(void) {
  pinMode(led, OUTPUT);

  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(led, on);
    Serial.print(".");
    delay(250);
    digitalWrite(led, off);
    delay(250);
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  // Activate mDNS this is used to be able to connect to the server
  // with local DNS hostmane toggler#.local
  if (MDNS.begin(hostname)) {
    Serial.print("MDNS responder started: ");
    Serial.print(hostname);
    Serial.println(".local");
  }
  MDNS.addService("http", "tcp", 80);

  // Set server routing
  restServerRouting();
  // Set not found response
  server.onNotFound(handleNotFound);
  // Start server
  server.begin();
  Serial.println("HTTP server started");
}

void loop(void) {
  server.handleClient();
  MDNS.update();
}