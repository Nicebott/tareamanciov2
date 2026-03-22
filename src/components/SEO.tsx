import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'MiSemestre - Programación Docente UASD 2026-10 | Horarios, Profesores y Reseñas',
  description = 'Consulta la programación docente UASD 2026-10. Busca horarios de clases, información de profesores, reseñas estudiantiles y NRC. Modalidades presencial, virtual y semipresencial en todos los recintos de República Dominicana.',
  keywords = 'programacion docente uasd, programacion uasd, uasd 2026-10, horarios uasd, profesores uasd, resenas profesores uasd, nrc uasd, universidad autonoma santo domingo, uasd virtual, uasd semipresencial',
  ogImage = 'https://misemestre.com/og-image.png',
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime
}) => {
  const location = useLocation();
  const canonicalUrl = canonical || `https://misemestre.com${location.pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MiSemestre - Programación UASD" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="es_DO" />
      <meta property="og:locale:alternate" content="es_ES" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@MiSemestre" />
      <meta name="twitter:creator" content="@MiSemestre" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hreflang="es-do" href={canonicalUrl} />
      <link rel="alternate" hreflang="es" href={canonicalUrl} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
    </Helmet>
  );
};

export default SEO;
