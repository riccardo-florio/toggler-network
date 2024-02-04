int randomNumber = random(0,9);

void setup() {
  // Imposta il baut del monitor seriale a 115200, 
  // altrimenti vedrai caratteri strani
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello World!");
  Serial.println(randomNumber);
  delay(1000);
}