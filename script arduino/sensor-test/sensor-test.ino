#include <SimpleDHT.h>

SimpleDHT11 dht11;

const int sPin = 0;

void setup() {
  Serial.begin(115200);
}

void loop() {
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

  // DHT11 sampling rate is 1HZ.
  delay(1500);
}