#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

// Defina o nome e a senha do ponto de acesso do ESP8266
const char* ssid = "SmartWater";
const char* password = "password";

unsigned long previousMillis = 0;

ESP8266WebServer server(80);

void handleRoot() {
  // Crie a página web com o formulário HTML
  String html = "<!DOCTYPE html>";
  html += "<html lang='pt'>";
  html += "<head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Config. Wifi</title></head>";
  html += "<body>";
  html += "<h1 style='text-align: center; width: 40%;'>Configurar WiFi</h1>";
  html += "<form method='POST' action='/configurar-wifi'>";
  html += "<label for='ssid'>Nome da rede WiFi:</label>";
  html += "<select id='ssid' name='ssid' required>";

  int networks = WiFi.scanNetworks();

  for(int i=0; i < networks; i++)
    html += "<option value='" + WiFi.SSID(i) + "'>" + WiFi.SSID(i) + "</option>";
  
  html += "</select><br><br>";
  html += "<label for='senha'>Senha da rede WiFi:</label>";
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
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }

  // Redirecione o usuário para uma página de sucesso
  server.sendHeader("Location", "http://192.168.4.1/sucesso");
  server.send(302);
}

void handleSucesso() {
  // Envie uma mensagem de sucesso para o usuário
  String html = "<!DOCTYPE html>";
  html += "<html lang='pt'>";
  html += "<head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Config. Wifi</title></head>";
  html += "<body>";
  html += "<h1>Configuração concluída!</h1>";
  html += "<p>O ESP8266 está agora conectado à rede WiFi.</p>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  // Inicie o modo de ponto de acesso do ESP8266
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);

  // Inicie o servidor web
  server.on("/", handleRoot);
  server.on("/configurar-wifi", HTTP_POST, handleConfigurarWiFi);
  server.on("/sucesso", handleSucesso);
  server.begin();
}

void loop() {
  server.handleClient();
  if(WiFi.status() != WL_CONNECTED){
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= 500) {
      previousMillis = currentMillis;
      digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    }
  }else{
    digitalWrite(LED_BUILTIN, LOW);
  }
}
