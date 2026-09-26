import { sanityClient } from 'sanity:client';

// نجيب بيانات "عني" (about) بالحقول اللي نحتاجها للنافبار والهيرو
export async function getAbout() {
  const query = `*[_type == "about" && _id == "about"][0]{
    name_ar, name_en,
    tagline_ar, tagline_en,
    tags,
    instagram,
    "portraitUrl": portrait.asset->url
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// ترجع النص باللغة المطلوبة، وإذا الإنجليزي فاضي ترجع العربي
export function pick(doc, field, lang) {
  return doc?.[`${field}_${lang}`] || doc?.[`${field}_ar`] || '';
}
