# Guia de SEO - MiSemestre

## Implementaciones Realizadas

### 1. Meta Etiquetas en index.html
- Title optimizado con palabras clave principales
- Meta description completa (150-160 caracteres)
- Keywords relevantes para UASD y Programación docente
- Meta robots para indexacion
- Configuracion de idioma (es-DO)

### 2. Open Graph (Facebook/LinkedIn)
- og:type, og:title, og:description
- og:image para previsualizaciones
- og:url y og:locale
- Dimensiones de imagen optimizadas (1200x630)

### 3. Twitter Cards
- twitter:card con summary_large_image
- twitter:title y twitter:description
- twitter:image para previsualizaciones

### 4. Schema.org (JSON-LD)
Implementados tres schemas:
- **WebSite**: Define el sitio y la funcion de busqueda
- **EducationalOrganization**: Define la UASD
- **WebApplication**: Define MiSemestre como aplicacion educativa

### 5. Archivos de SEO
- **robots.txt**: Permite crawling, define sitemap
- **sitemap.xml**: Mapa del sitio con todas las paginas principales
- **site.webmanifest**: PWA manifest con metadata de la app

### 6. Componente SEO Dinamico
- Actualiza title, description, keywords por pagina
- Actualiza Open Graph tags dinamicamente
- Maneja canonical URLs
- Importado en todas las paginas principales

### 7. Canonical URLs
- URLs canonicas para evitar contenido duplicado
- Configuradas por pagina

### 8. Enlaces Hreflang
- Configurados para es-DO y es
- Mejora SEO internacional

## Palabras Clave Principales

### Keywords Primarias
- Programación docente uasd
- uasd
- MiSemestre
- universidad uasd
- horarios uasd

### Keywords Secundarias
- asignaturas uasd
- profesores uasd
- universidad autonoma santo domingo
- inscripciones uasd
- calendario academico uasd
- nrc uasd
- campus uasd

### Keywords por Modalidad
- uasd virtual
- uasd semipresencial
- cursos online uasd
- educacion a distancia uasd

## Mejores Practicas Implementadas

1. **Titulos**: Formato "[Descripcion] - [Marca] | [Categoria]"
2. **Descriptions**: 150-160 caracteres, con CTA implicito
3. **URLs Limpias**: Sin parametros innecesarios
4. **Mobile-First**: Meta viewport y PWA ready
5. **Velocidad**: Build optimizado, assets comprimidos
6. **Estructura**: HTML semantico con tags apropiados
7. **Accesibilidad**: Lang attribute, alt texts

## Recomendaciones Adicionales

### Para Mejorar Ranking:

1. **Contenido Fresco**
   - Actualizar Programación cada semestre
   - Mantener fecha en sitemap.xml
   - Agregar blog con tips academicos

2. **Backlinks**
   - Colaborar con blogs estudiantiles
   - Aparecer en directorios universitarios
   - Redes sociales activas

3. **Velocidad**
   - Optimizar imagenes (WebP)
   - Implementar lazy loading
   - CDN para assets estaticos

4. **Rich Snippets**
   - Agregar FAQ schema para preguntas frecuentes
   - Review schema para resenas de profesores
   - Course schema para asignaturas

5. **Google Search Console**
   - Verificar propiedad del sitio
   - Submit sitemap.xml
   - Monitorear errores de crawling
   - Revisar queries de busqueda

6. **Analytics**
   - Implementar Google Analytics 4
   - Tracking de eventos importantes
   - Monitorear bounce rate
   - Analizar paginas mas visitadas

## Proximos Pasos

1. Crear imagenes para Open Graph (og-image.jpg)
2. Crear favicons en todos los tamanos
3. Implementar Google Analytics
4. Registrar en Google Search Console
5. Crear cuenta de Google My Business (si aplica)
6. Optimizar imagenes existentes
7. Implementar schema para resenas
8. Crear contenido de blog SEO-friendly

## URLs Importantes

- Sitemap: https://misemestre.com/sitemap.xml
- Robots: https://misemestre.com/robots.txt
- Manifest: https://misemestre.com/site.webmanifest

## Verificacion

Para verificar implementacion SEO:
1. Google Rich Results Test: https://search.google.com/test/rich-results
2. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
3. Twitter Card Validator: https://cards-dev.twitter.com/validator
4. PageSpeed Insights: https://pagespeed.web.dev/
5. Mobile-Friendly Test: https://search.google.com/test/mobile-friendly

## Notas Importantes

- Mantener sitemap.xml actualizado
- Actualizar fecha en lastmod cuando cambien paginas
- No usar emojis en meta descriptions
- Evitar keyword stuffing
- Mantener URLs consistentes y limpias
- Usar HTTPS siempre
