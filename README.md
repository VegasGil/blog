# CYBER-AD

Landing page estática de CYBER-AD, proyecto freelance de ciberseguridad (Blue Team): hardening de Windows, Microsoft Defender, Intune, auditoría básica, detección de malware y análisis forense básico.

Sitio 100 % estático (HTML + CSS + JS), sin backend propio, sin base de datos y sin cookies. Pensado para alojarse en GitHub Pages.

Índice
Estructura
Puesta en marcha
Configuración pendiente (TODO)
Seguridad
Privacidad y RGPD
Accesibilidad
Checklist previa a publicar
Mantenimiento
Aviso
Estructura
/
├── index.html            # Página principal (CSP, metadatos, contenido)
├── styles.css            # Estilos
├── app.js                # Menú, animaciones y envío del formulario
├── cyber-ad-logo.png     # Logotipo
├── cyber-ad-office.png   # Imagen del hero
├── fonts/
│   ├── inter-var.woff2
│   └── jetbrains-mono-var.woff2
├── aviso-legal.html      # Pendiente de crear
├── privacidad.html       # Pendiente de crear
├── condiciones.html      # Pendiente de crear
└── README.md

JS y CSS van en archivos externos a propósito: permite una CSP sin 'unsafe-inline' en script-src.

Puesta en marcha

Local

bash
# Cualquier servidor estático sirve; no abras index.html con file://
python3 -m http.server 8080
# → http://localhost:8080

GitHub Pages

Sube los archivos a la raíz del repositorio.
Settings → Pages → Deploy from a branch → main / (root).
Opcional: configura un dominio propio y activa Enforce HTTPS.
Configuración pendiente (TODO)
Dónde	Qué cambiar
index.html → <link rel="canonical"> y og:image	Sustituir TU-USUARIO/TU-REPO por la URL real
fonts/	Descargar Inter y JetBrains Mono en formato .woff2 variable y colocarlas con los nombres indicados
aviso-legal.html, privacidad.html, condiciones.html	Crearlas con tus datos reales (ver RGPD)
Formspree	Configurar restricción de dominio, captcha y retención (ver Seguridad)
index.html → JSON-LD	Ajustar datos si cambian (email, tarifa, zona)
Seguridad
Superficie de ataque
Sitio estático: sin servidor propio, sin base de datos, sin autenticación ni sesiones.
No hay secretos en el código. El ID del formulario de Formspree y el token de Cloudflare Web Analytics son públicos por diseño.
No se usa innerHTML, eval ni similares; los mensajes al usuario se insertan con textContent.
Sin dependencias de terceros en runtime salvo Formspree (formulario) y Cloudflare (analítica).
Content-Security-Policy (vía <meta>)
default-src 'self';
script-src 'self' https://static.cloudflareinsights.com;
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data:;
connect-src 'self' https://formspree.io https://cloudflareinsights.com;
form-action https://formspree.io;
base-uri 'self';
object-src 'none';
style-src 'unsafe-inline' se mantiene por los atributos style=""; el riesgo es bajo comparado con permitirlo en scripts.
Si añades otro servicio de terceros, tendrás que ampliar la CSP explícitamente.
Limitaciones de GitHub Pages

GitHub Pages no permite cabeceras HTTP personalizadas. Estas protecciones no funcionan vía <meta> y requieren cabecera real:

frame-ancestors / X-Frame-Options (anti-clickjacking)
X-Content-Type-Options: nosniff
Strict-Transport-Security (HSTS)
Permissions-Policy
report-uri / report-to

Solución recomendada: poner el dominio detrás del proxy de Cloudflare y añadirlas con Rules → Transform Rules → Modify Response Header:

X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: frame-ancestors 'none'

Después comprueba el resultado en https://securityheaders.com.

Si activas el proxy de Cloudflare con la inyección automática de Web Analytics, elimina el <script> manual del beacon para no duplicarlo.

Formulario (Formspree)
Honeypot _gotcha incluido (con aria-hidden y tabindex="-1").
En el panel de Formspree, activa: restricción de dominios permitidos, reCAPTCHA/hCaptcha o límite de envíos, y notificaciones de spam.
Como el endpoint es público, cualquiera puede hacerle POST: el honeypot no sustituye al captcha ni a la restricción de dominio.
Trata el contenido recibido como no confiable (posible phishing o payloads en el mensaje). No abras adjuntos ni enlaces sin verificar.
Reporte de vulnerabilidades

Si encuentras un problema de seguridad en este sitio, escribe a contacto@cyber-ad.dev con el asunto Seguridad. Por favor, no lo publiques hasta que haya podido corregirlo.

Privacidad y RGPD

Esta sección es una guía técnica, no asesoramiento jurídico. Antes de captar clientes, conviene que un profesional revise los textos legales.

Qué datos se tratan
Dato	Origen	Finalidad	Base jurídica (orientativa)
Nombre / empresa, email, servicio de interés, mensaje	Formulario de contacto	Responder a la solicitud y, en su caso, precontrato	Consentimiento (checkbox) y/o medidas precontractuales (art. 6.1.a / 6.1.b RGPD)
Datos de navegación agregados (páginas vistas, país, dispositivo)	Cloudflare Web Analytics	Estadísticas de uso	Interés legítimo (art. 6.1.f)
Encargados de tratamiento y transferencias
Formspree recibe y almacena los envíos. Actúa como encargado de tratamiento y sus servidores están fuera de la UE (EE. UU.). Debes: revisar y aceptar su DPA, comprobar el mecanismo de transferencia internacional que aplican (p. ej., cláusulas contractuales tipo o Data Privacy Framework) y mencionarlo en la política de privacidad.
Cloudflare (analítica): según su documentación, Web Analytics no usa cookies ni almacenamiento local y no toma huellas del dispositivo. Verifícalo en su documentación vigente antes de afirmarlo en tu política.
GitHub Pages registra IPs en logs de servidor; el hosting es un tercero a tener en cuenta en la política.
Decisiones de diseño orientadas a privacidad
Fuentes autoalojadas: no se envía la IP del visitante a Google Fonts.
Sin cookies ni almacenamiento local propios: no hay banner de cookies porque no se usan cookies no exentas. Si en el futuro añades analítica con cookies, publicidad, vídeos embebidos o mapas, tendrás que incorporar un gestor de consentimiento (LSSI art. 22.2).
Checkbox de aceptación de la política de privacidad, obligatorio para enviar el formulario.
Texto informativo junto al formulario que indica que los datos se procesan a través de Formspree (no se afirma "nunca se comparten con terceros").
Minimización: solo se piden los campos necesarios.
Documentos legales a crear

aviso-legal.html (LSSI-CE, art. 10): titular (nombre o razón social), NIF/CIF, domicilio, email de contacto, datos registrales si aplica, condiciones de uso, propiedad intelectual y ley aplicable.

privacidad.html (RGPD art. 13), debe incluir como mínimo:

Identidad y datos de contacto del responsable.
Finalidades y base jurídica de cada tratamiento.
Destinatarios y encargados (Formspree, Cloudflare, GitHub) y transferencias internacionales con sus garantías.
Plazo de conservación (define uno concreto, p. ej. hasta resolver la consulta + plazo de prescripción de responsabilidades).
Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad, y cómo ejercerlos.
Derecho a retirar el consentimiento y a reclamar ante la AEPD (https://www.aepd.es).

condiciones.html: alcance de los servicios, tarifa (30–60 €/h + IVA), forma de presupuesto y facturación, confidencialidad, límites de responsabilidad y autorización de acceso a sistemas del cliente.

Al prestar servicios sobre infraestructura de clientes, firma un contrato o acuerdo de encargo de tratamiento (art. 28 RGPD) cuando accedas a datos personales, y un acuerdo de confidencialidad y autorización expresa por escrito antes de cualquier prueba, auditoría o análisis forense.

Obligaciones operativas
Registro de actividades de tratamiento (art. 30 RGPD): documento sencillo con los tratamientos de esta web y de tus servicios.
Retención: configura en Formspree la retención y elimina periódicamente los envíos que ya no necesites.
Ejercicio de derechos: responde en el plazo legal (1 mes). Ten un procedimiento para localizar y borrar datos de una persona en Formspree y en tu correo.
Brechas de seguridad: si afecta a datos personales y hay riesgo, notificación a la AEPD en 72 h (art. 33 RGPD).
Facturación y fiscalidad: aplica IVA según proceda y conserva la documentación el tiempo exigido por la normativa.
Accesibilidad
Enlace de salto al contenido (skip link) y lang="es".
Jerarquía de títulos h1 → h2 → h3.
Menú móvil con aria-expanded / aria-controls; cerrado no es enfocable con teclado y se cierra con Esc.
Mensajes del formulario con role="status" y role="alert".
Indicador de foco visible y respeto de prefers-reduced-motion.
Contenido visible aunque JavaScript esté desactivado.
Checklist previa a publicar
 Fuentes .woff2 subidas a /fonts (sin 404 en consola)
 canonical y og:image con la URL real
 aviso-legal.html, privacidad.html y condiciones.html creadas y revisadas
 DPA de Formspree aceptado y transferencias documentadas en la política
 Formspree: dominio restringido, captcha/límite activo, retención definida
 Cabeceras HTTP añadidas vía Cloudflare (si aplica) y verificadas en securityheaders.com
 Consola del navegador sin errores de CSP
 Prueba de envío del formulario (éxito y error) y recepción del email
 Prueba con teclado, lector de pantalla y JavaScript desactivado
 Prueba de Lighthouse (rendimiento, accesibilidad, SEO)
 Beacon de Cloudflare no duplicado
Mantenimiento
Revisa la CSP cada vez que añadas un recurso externo.
Vigila que el token de analítica y el endpoint de Formspree sigan siendo los tuyos.
Actualiza tarifas, datos de contacto y textos legales cuando cambien.
Revisa los envíos de Formspree y borra los antiguos según tu política de retención.
Repite la comprobación de cabeceras tras cualquier cambio en Cloudflare o en el dominio.
Aviso

Este repositorio contiene el sitio web de un servicio profesional. Las indicaciones legales y de cumplimiento normativo son orientativas y pueden no adaptarse a tu caso concreto; valídalas con un profesional (abogado o DPD) antes de operar.

© 2026 CYBER-AD — Operador freelance independiente.