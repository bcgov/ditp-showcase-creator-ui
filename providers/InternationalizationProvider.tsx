'use client';

import { I18nextProvider } from "react-i18next";
import initInternationalization from "@/app/i18n";
import { createInstance } from "i18next";
import {InternationalizationProviderArgs} from "@/types";

export default function InternationalizationProvider(args: InternationalizationProviderArgs) {
    const { children, locale, namespaces, resources } = args
    const i18n = createInstance();

    void initInternationalization({ locale, namespaces, i18nInstance: i18n, resources });

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
