import { useTranslation } from 'react-i18next'

export default function useLanguage () {
  return useTranslation().i18n.language
}
