import xhrBackend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

export const languages = ['en', 'zh-CN'] as const

export type SupportedLanguage = typeof languages[number]

export async function loadI18n (language: SupportedLanguage) {
  await i18n
    .use(xhrBackend)
    .use(initReactI18next)
    .init({
      lng: language,
      fallbackLng: 'en',
      load: 'currentOnly',
      react: { useSuspense: false },
      backend: {
        loadPath: '/locales/{{lng}}.json'
      }
    })

  return i18n
}
