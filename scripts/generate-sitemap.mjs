/**
 * Script para generar el sitemap.xml con todas las URLs de profesores
 * Ejecutar: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'public', 'data.json');
const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');

// Read the data
const rawData = readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

// Extract unique professor names
const professorSet = new Set();
data.forEach(item => {
  const profesor = item.profesor;
  if (profesor && profesor !== 'NaN' && profesor.trim() !== '' && profesor.trim() !== 'Sin profesor asignado') {
    // Normalize: trim whitespace and collapse double spaces
    professorSet.add(profesor.trim().replace(/\s+/g, ' '));
  }
});

const professors = Array.from(professorSet).sort();
console.log(`Found ${professors.length} unique professors`);

const today = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { loc: 'https://misemestre.com/', changefreq: 'daily', priority: '1.0', lastmod: '2026-03-27' },
  { loc: 'https://misemestre.com/virtual', changefreq: 'daily', priority: '0.9', lastmod: '2026-03-21' },
  { loc: 'https://misemestre.com/semipresencial', changefreq: 'daily', priority: '0.9', lastmod: '2026-03-21' },
];

// Campus pages
const campuses = [
  'santo-domingo', 'santiago', 'san-francisco-de-macoris', 'puerto-plata',
  'san-juan', 'barahona', 'la-vega', 'san-pedro-de-macoris', 'san-cristobal',
  'higuey', 'bonao', 'mao', 'bani', 'hato-mayor', 'azua-de-compostela',
  'neyba', 'cotui', 'nagua', 'dajabon', 'moca', 'jarabacoa', 'montecristi',
  'samana', 'elias-pina', 'hermanas-mirabal', 'yamasa', 'finca-exp-engombe'
];

const campusPages = campuses.map((campus, i) => ({
  loc: `https://misemestre.com/campus/${campus}`,
  changefreq: 'daily',
  priority: i < 3 ? '0.95' : i < 8 ? '0.80' : '0.75',
  lastmod: '2026-03-21'
}));

// Other static pages
const otherPages = [
  { loc: 'https://misemestre.com/foro', changefreq: 'daily', priority: '0.8', lastmod: '2026-03-21' },
  { loc: 'https://misemestre.com/faq', changefreq: 'weekly', priority: '0.7', lastmod: '2026-03-21' },
  { loc: 'https://misemestre.com/terms', changefreq: 'monthly', priority: '0.3', lastmod: '2026-03-21' },
  { loc: 'https://misemestre.com/privacy', changefreq: 'monthly', priority: '0.3', lastmod: '2026-03-21' },
  { loc: 'https://misemestre.com/community-rules', changefreq: 'monthly', priority: '0.3', lastmod: '2026-03-21' },
];

// Professor pages
const professorPages = professors.map(name => ({
  loc: `https://misemestre.com/profesor/${encodeURIComponent(name)}`,
  changefreq: 'weekly',
  priority: '0.7',
  lastmod: today
}));

// Build the XML
const allPages = [...staticPages, ...campusPages, ...otherPages, ...professorPages];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const page of allPages) {
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`Sitemap generated with ${allPages.length} URLs (${professorPages.length} professors)`);
console.log(`Saved to: ${sitemapPath}`);
