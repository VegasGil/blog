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


Aviso

Este repositorio contiene el sitio web de un servicio profesional. Las indicaciones legales y de cumplimiento normativo son orientativas y pueden no adaptarse a tu caso concreto; valídalas con un profesional (abogado o DPD) antes de operar.

© 2026 CYBER-AD — Operador freelance independiente.