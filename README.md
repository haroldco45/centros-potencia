# Centros PotencIA al Día — Vibras Positivas HM

App ciudadana (PWA, español e inglés) de seguimiento al caso **Centros PotencIA**:
$234.399 millones, 60 centros prometidos y ninguno funcionando.

## Qué trae
- **Hoy**: fecha y contadores en hora real de Colombia, noticias del caso, búsqueda en vivo al abrir, filtro de 24 h / semana y botón **Actualizar**.
- **Robot** (GitHub Actions) que busca noticias reales cada 30 minutos y les saca la foto de cada artículo.
- Cifras animadas, línea de tiempo, "Al tuétano" (preguntas sin respuesta), versiones de cada lado, municipios y un **derecho de petición** listo para copiar.

## Publicar
1. Cree el repo `haroldco45/centros-potencia` y suba todos los archivos respetando las carpetas
   (`data/`, `scripts/`, `.github/workflows/`, `media/`).
2. GitHub → Settings → Pages → rama `main`, carpeta `/ (root)`.
3. GitHub → Settings → Actions → General → *Workflow permissions* → **Read and write permissions**.
4. Actions → "Robot de noticias" → **Run workflow** para la primera corrida.
5. En Netlify, conecte el repo: queda en `centros-potencia.netlify.app`.

## Foto o video de portada (opcional)
Ponga un archivo `media/hero.jpg` o `media/hero.mp4` y la portada lo muestra de fondo solo.
