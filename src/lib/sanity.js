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

// نجيب المعارض: الأحدث أولًا، واللي ما لها تاريخ تطلع آخر شي (نفس ترتيب الاستوديو)
export async function getExhibitions() {
  const query = `*[_type == "exhibition"] | order(defined(startDate) desc, startDate desc){
    _id,
    title_ar, title_en,
    description_ar, description_en,
    startDate, endDate,
    venue_ar, venue_en,
    link
  }`;
  return (await sanityClient.fetch(query)) ?? [];
}
