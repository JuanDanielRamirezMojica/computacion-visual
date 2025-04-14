import gifAnimation.*; //Libreria para exportar gif.

GifMaker gifExport;
int frameLimit = 480; // Total de frames (~6 segundos a 60fps)

float[][] vertices = new float[6][3];

void setup() {
  size(600, 600, P3D); //Canvas size.
  frameRate(60);
  
  // Inicializar exportación de GIF
  gifExport = new GifMaker(this, "Taller_1_processing_hexagono.gif");
  gifExport.setRepeat(0);      // 0 = loop infinito
  gifExport.setQuality(10);    // Calidad (1–255)
  gifExport.setDelay(16);      // Delay entre frames en ms (~60fps)
  
  // Calculamos las coordenadas de los vértices del hexágono en 3D
  for (int i = 0; i < 6; i++) {
    float angle = TWO_PI / 6 * i;
    vertices[i][0] = cos(angle) * 100;  // X
    vertices[i][1] = sin(angle) * 100;  // Y
    vertices[i][2] = 0;                 // Z (en el plano XY)
  }
}

void draw() {
  background(#4a4e69);
  //background(0);
  float t = millis() / 1000.0; // Tiempo en segundos
  
  // Parámetros de transformación
  float escala = 1 + 0.3 * sin(t);     // Escalado oscilante
  float angulo = t;                    // Rotación progresiva
  float offsetX = 150 * sin(t / 2);    // Movimiento ondulado en X
  float offsetY = 100 * cos(t / 3);    // Movimiento suave en Y

  // Color cambiante con sin/cos
  float r = 150 + 100 * sin(t);
  float g = 80;
  float b = 200 + 50 * cos(t);
  fill(r, g, b);
  
  translate(width / 2 + offsetX, height / 2 + offsetY);  // Traslación
  rotateX(angulo);   // Rotación en el eje X
  rotateY(angulo);   // Rotación en el eje Y
  scale(escala);     // Escalado cíclico

  beginShape();
  for (int i = 0; i < 6; i++) {
    vertex(vertices[i][0], vertices[i][1], vertices[i][2]); // Coordenadas 3D
  }
  endShape(CLOSE);
  
  // Añadir frame al GIF
  gifExport.addFrame();

  // Detener cuando se alcance el límite
  if (frameCount == frameLimit) {
    gifExport.finish();
    println("GIF guardado");
    noLoop();
  }
}
