import { Namespace, useTranslation, UseTranslationOptions } from 'react-i18next'

export default function useTranslate (ns?: Namespace, options?: UseTranslationOptions) {
  return useTranslation(ns, options).t
}
