import { sanityClient } from 'sanity:client';

// نجيب بيانات "عني" (about) بالحقول اللي نحتاجها للنافبار والهيرو
export async function getAbout() {
  const query = `*[_type == "about" && _id == "about"][0]{
    name_ar, name_en,
    tagline_ar, tagline_en,
    tags_ar, tags_en,
    instagram,
    "portraitUrl": portrait.asset->url,
    "portraitHotspot": portrait.hotspot{ x, y }
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

// نجيب قسم "أعمال مختارة": العنوان والنص التعريفي والأعمال (ستة بالكثير)
// رابط الصورة نطلبه بعرض مناسب وبصيغة خفيفة (webp) عشان الصفحة ما تثقل
export async function getSelectedWorks() {
  const query = `*[_type == "selectedWorks" && _id == "selectedWorks"][0]{
    heading_ar, heading_en,
    intro_ar, intro_en,
    "works": works[defined(image.asset)]{
      _key,
      title_ar, title_en,
      detail_ar, detail_en,
      "imageUrl": image.asset->url + "?w=1200&fit=max&auto=format",
      // نسخة أكبر للعرض بحجم كامل (lightbox) لما الزائر يضغط على الصورة
      "fullUrl": image.asset->url + "?w=2560&fit=max&auto=format",
      "alt_ar": image.alt_ar, "alt_en": image.alt_en
    }
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// نجيب قسم "عن الفنانة": الاقتباس والنبذة والتكريم (اختياري)
export async function getAboutArtist() {
  const query = `*[_type == "aboutArtist" && _id == "aboutArtist"][0]{
    quote_ar, quote_en,
    bio_ar, bio_en,
    award{ year, title_ar, title_en }
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// نجيب قسم "محطات مختارة": العنوان والمحطات، مرتبة من الأحدث للأقدم حسب السنة
export async function getMilestones() {
  const query = `*[_type == "milestones" && _id == "milestones"][0]{
    heading_ar, heading_en,
    "items": items[defined(year)] | order(year desc){
      _key,
      year,
      title_ar, title_en,
      description_ar, description_en
    }
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// نجيب بيانات "تواصل": رابط الإنستغرام والبريد الإلكتروني (اختياري)
export async function getContact() {
  const query = `*[_type == "contact" && _id == "contact"][0]{
    instagram,
    email
  }`;
  return (await sanityClient.fetch(query)) ?? {};
}

// نجيب "روابط مهمة" للفوتر (خمس بالكثير، بنفس ترتيب الاستوديو)
export async function getImportantLinks() {
  const query = `*[_type == "importantLinks" && _id == "importantLinks"][0].links[defined(url)]{
    _key,
    title_ar, title_en,
    url
  }`;
  return (await sanityClient.fetch(query)) ?? [];
}
