export const CAMPUS_SLUG_MAP: Record<string, string> = {
  'santo-domingo': 'Santo Domingo',
  'santiago': 'Santiago',
  'san-francisco-de-macoris': 'San Fco de Macorís',
  'puerto-plata': 'Puerto Plata',
  'san-juan': 'San Juan',
  'barahona': 'Barahona',
  'mao': 'Mao',
  'hato-mayor': 'Hato Mayor',
  'higuey': 'Higüey',
  'bonao': 'Bonao',
  'la-vega': 'La Vega',
  'bani': 'Baní',
  'azua-de-compostela': 'Azua de Compostela',
  'neyba': 'Neyba',
  'cotui': 'Cotuí',
  'nagua': 'Nagua',
  'dajabon': 'Dajabón',
  'moca': 'Moca',
  'jarabacoa': 'Jarabacoa',
  'san-cristobal': 'San Cristóbal',
  'san-pedro-de-macoris': 'San Pedro de Macorís',
  'montecristi': 'Montecristi',
  'samana': 'Samaná',
  'elias-pina': 'Elías Piña',
  'hermanas-mirabal': 'Hermanas Mirabal',
  'yamasa': 'Yamasá',
  'finca-exp-engombe': 'Finca Exp Engombe',
};

export function getCampusFromSlug(slug: string): string {
  return CAMPUS_SLUG_MAP[slug] || '';
}

export function getSlugFromCampus(campus: string): string {
  const entry = Object.entries(CAMPUS_SLUG_MAP).find(([_, name]) => name === campus);
  return entry ? entry[0] : '';
}
