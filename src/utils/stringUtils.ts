export function removeDiacritics(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function normalizeText(text: string | null | undefined): string {
  if (!text) return '';
  // 1. Normalizar unicode
  // 2. Convertir a minúsculas
  // 3. Remover diacríticos
  // 4. Reemplazar múltiples espacios por uno solo
  // 5. Trim espacios al inicio y final
  return removeDiacritics(text)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}