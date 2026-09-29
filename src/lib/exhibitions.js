// أدوات المعارض — نستخدمها وقت البناء وفي المتصفح كمان
// (نفس القاعدة الموجودة في الاستوديو: schemaTypes/exhibition.js)

// تاريخ اليوم بتوقيت قطر بشكل 2026-09-29
// نحدد قطر بالاسم لأن سيرفر البناء (Cloudflare) يشتغل بتوقيت غرينتش
function todayInQatar() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Qatar' });
}

// حالة المعرض تُحسب من التاريخ: 'upcoming' أو 'current' أو 'past'
export function exhibitionStatus(startDate, endDate) {
  if (!startDate) return null;
  const today = todayInQatar();
  const end = endDate || startDate; // لو ما فيه تاريخ نهاية نعتبره يوم واحد
  if (today < startDate) return 'upcoming';
  if (today > end) return 'past';
  return 'current';
}

export const statusLabels = {
  ar: { upcoming: 'قريبًا', current: 'معروض حاليًا', past: 'عُرض سابقًا' },
  en: { upcoming: 'Upcoming', current: 'On view now', past: 'Past' },
};

// يحوّل التواريخ إلى شكل: 03.09—28.11.2026
// لو البداية والنهاية في نفس السنة ما نكرر السنة مع البداية
export function formatDateRange(startDate, endDate) {
  const toDots = (date) => date.split('-').reverse().join('.'); // 2026-09-03 ← 03.09.2026
  if (!startDate) return endDate ? toDots(endDate) : '';
  if (!endDate || endDate === startDate) return toDots(startDate);

  const sameYear = startDate.slice(0, 4) === endDate.slice(0, 4);
  const start = sameYear ? toDots(startDate).slice(0, 5) : toDots(startDate); // 03.09
  return `${start}—${toDots(endDate)}`;
}
