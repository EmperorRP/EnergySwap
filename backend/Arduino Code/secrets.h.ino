#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include "secrets.h"
#include <WiFiUdp.h>
#include <NTPClient.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(512); // Increased buffer size for larger payloads

unsigned long lastMillis = 0;

void connect() {
  Serial.print("Checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.print("\nConnecting...");
  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println("\nConnected!");
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  timeClient.begin();
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  connect();
}

void loop() {
  client.loop();
  delay(10); 

  if (!client.connected()) {
    connect();
  }

  timeClient.update();

  // Publish data every 5 seconds
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();

    // Create JSON document
    StaticJsonDocument<200> doc;
    doc["timestamp"] = timeClient.getEpochTime();// Add timestamp

    // Simulate data
    doc["source"] = "solar"; 
    String weather = random(0, 2) ? "sunny" : "normal"; // random weather
    doc["weather"] = weather;

    // If the weather is sunny, we produce more units
    if (weather == "sunny") {
        doc["units_produced"] = random(80, 100); // random number of units produced
    } else {
        doc["units_produced"] = random(10, 50); // random number of units produced
    }


    char jsonBuffer[512];
    serializeJson(doc, jsonBuffer);

    client.publish("energy/production", jsonBuffer);

    doc.clear(); // Clear the document for re-use

    doc["timestamp"] = timeClient.getEpochTime();  // Add timestamp
    doc["units_consumed"] = random(1, 30); // random number of units consumed

    serializeJson(doc, jsonBuffer);

    client.publish("energy/consumption", jsonBuffer);
  }
}
