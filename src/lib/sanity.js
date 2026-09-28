import { sanityClient } from 'sanity:client';

// نجيب بيانات "عني" (about) بالحقول اللي نحتاجها للنافبار والهيرو
export async function getAbout() {
  const query = `*[_type == "about" && _id == "about"][0]{
    name_ar, name_en,
    tagline_ar, tagline_en,
    tags_ar, tags_en,
    instagram,
    "portraitUrl": portrait.asset->url
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// ترجع النص باللغة المطلوبة فقط (ما نخلط العربي في الصفحة الإنجليزية)
// إذا الحقل فاضي ترجع '' — والمكوّن يقرر يخفيه أو يحط نص احتياطي
export function pick(doc, field, lang) {
  return doc?.[`${field}_${lang}`] || '';
}

// نجيب الإحصائيات (ثلاث أرقام مع نص تحت كل رقم)
export async function getStats() {
  const query = `*[_type == "stats" && _id == "stats"][0].items[]{
    number, plus, label_ar, label_en
  }`;
  return (await sanityClient.fetch(query)) ?? [];
}
