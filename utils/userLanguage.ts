import { Languages } from '../types';

export default function userLanguage(): keyof typeof Languages {
  const browserLng = navigator.language.substr(0, 2);
  if (Object.values(Languages).includes(browserLng as any)) {
    return browserLng as keyof typeof Languages;
  } else {
    return Languages.en;
  }
}
