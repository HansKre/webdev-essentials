export enum SupportedLanguages {
  de = 'de',
  en = 'en',
  fr = 'fr',
}

export default function userLanguage<L>(): keyof typeof SupportedLanguages {
  const browserLng = navigator.language.substr(0, 2);
  if (Object.values(SupportedLanguages).includes(browserLng as any)) {
    return browserLng as keyof typeof SupportedLanguages;
  } else {
    return SupportedLanguages.en;
  }
}
