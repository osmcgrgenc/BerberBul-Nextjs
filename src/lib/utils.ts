/**
 * Türkçe karakterleri ve özel karakterleri URL uyumlu hale getirir
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Unicode normalizasyonu
    .replace(/[\u0300-\u036f]/g, '') // Aksanları kaldır
    .replace(/[^a-z0-9\s-]/g, '') // Alfanumerik ve boşluk dışındaki karakterleri kaldır
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .replace(/-+/g, '-') // Birden fazla tireyi tek tireye dönüştür
    .replace(/^-+/, '') // Baştaki tireleri kaldır
    .replace(/-+$/, '') // Sondaki tireleri kaldır
} 