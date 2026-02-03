import translations from './language'

type LangCode = 'en' | 'vi' | 'la' | 'th' | 'zh'

function mapLanguage(type: LangCode): Record<string, string> {
  const mappedTranslations: Record<string, string> = {}
  for (const key in translations) {
    if (type === 'vi') mappedTranslations[key] = key
    else mappedTranslations[key] = (translations as any)[key][type] ?? ''
  }

  return mappedTranslations
}

export default {
  en: mapLanguage('en'),
  vi: mapLanguage('vi'),
  la: mapLanguage('la'),
  th: mapLanguage('th'),
  zh: mapLanguage('zh'),
}
