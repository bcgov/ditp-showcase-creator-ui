'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';

// @ts-ignore // TODO type
export default function TranslationsProvider({ children, locale, namespaces, resources }) {
    const i18n = createInstance();

    void initTranslations({ locale, namespaces, i18nInstance: i18n, resources });

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
