#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
#include "secrets.h"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;

// Defina o nome e a senha do ponto de acesso do ESP8266
const char* ssid = "SmartWater";
const char* password = "password";

unsigned long previousMillis = 0;
String macId = "";

ESP8266WebServer server(80);

void handleRoot() {
  // Crie a página web com o formulário HTML
  WiFi.disconnect();
  String html = "<!DOCTYPE html>";
  html += "<html lang='pt'>";
  html += "<head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Config. Wifi</title></head>";
  html += "<body>";
  html += "<h1 style='text-align: center'>Configurar WiFi</h1>";
  html += "<form method='POST' action='/configurar-wifi'>";
  html += "<label for='ssid'>Nome da rede WiFi:</label><br>";
  html += "<select id='ssid' name='ssid' required>";

  int networks = WiFi.scanNetworks();

  for (int i = 0; i < networks; i++)
    html += "<option value='" + WiFi.SSID(i) + "'>" + WiFi.SSID(i) + "</option>";

  html += "</select><br><br>";
  html += "<label for='senha'>Senha da rede WiFi:</label><br>";
  html += "<input type='password' id='senha' name='senha' required><br><br>";
  html += "<input type='submit' value='Conectar'>";
  html += "</form></body></html>";

  // Envie a página web para o cliente
  server.send(200, "text/html", html);
}

void handleConfigurarWiFi() {
  // Obtenha as informações de login da rede WiFi do formulário HTML
  String ssid = server.arg("ssid");
  String senha = server.arg("senha");

  // Configure o ESP8266 para se conectar à rede WiFi
  WiFi.begin(ssid, senha);

  int time = 0;
  while (WiFi.status() != WL_CONNECTED && time < 6) {
    delay(1000);
    time++;
    Serial.println(time);
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Não conectado!");
    WiFi.disconnect();
    server.sendHeader("Location", "http://192.168.4.1/falha");
    server.send(302);
    Serial.println("Redirecionado");
  } else {
    server.sendHeader("Location", "http://192.168.4.1/sucesso");
    server.send(302);
  }
}

void handleFalha() {
  String html = "<!DOCTYPE html>";
  html += "<html lang='pt'>";
  html += "<head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Config. Wifi</title></head>";
  html += "<body>";
  html += "<h1>Senha incorreta!</h1>";
  html += "<p>A senha colocada está incorreta.</p>";
  html += "<a href='http://192.168.4.1/'>Voltar</a>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleSucesso() {
  // Envie uma mensagem de sucesso para o usuário
  String html = "<!DOCTYPE html>";
  html += "<html lang='pt'>";
  html += "<head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Config. Wifi</title></head>";
  html += "<body>";
  html += "<h1>Configuração concluída!</h1>";
  html += "<p>O seu dispositivo agora está conectado à sua rede WiFi.</p>";
  html += "</body></html>";
  server.send(200, "text/html", html);

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Login Firebase Ok");
    signupOK = true;
  } else
    Serial.printf("%s\n", config.signer.signupError.message.c_str());

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void startId() {
  uint8_t mac[6];
  WiFi.macAddress(mac);
  char macStr[18];
  sprintf(macStr, "%02X:%02X:%02X:%02X:%02X:%02X", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  macId = String(macStr);
}

void setup() {
  Serial.begin(9600);
  startId();
  Serial.println(macId);
  pinMode(LED_BUILTIN, OUTPUT);
  // Inicie o modo de ponto de acesso do ESP8266
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);

  // Inicie o servidor web
  server.on("/", handleRoot);
  server.on("/configurar-wifi", HTTP_POST, handleConfigurarWiFi);
  server.on("/sucesso", handleSucesso);
  server.on("/falha", handleFalha);
  server.begin();
}

void loop() {
  server.handleClient();

  if (WiFi.status() != WL_CONNECTED) {
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= 500) {
      previousMillis = currentMillis;
      digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    }
  } else {
    digitalWrite(LED_BUILTIN, HIGH);
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= 1000) {
      if (Firebase.ready() && signupOK) {
        if (Firebase.RTDB.setString(&fbdo, "devices/" + macId, random(101))) {
          Serial.println("PASSED");
          Serial.println("PATH: " + fbdo.dataPath());
          Serial.println("TYPE: " + fbdo.dataType());
        } else {
          Serial.println("FAILED");
          Serial.println("REASON: " + fbdo.errorReason());
        }
      }
      previousMillis = currentMillis;
    }
  }
}
