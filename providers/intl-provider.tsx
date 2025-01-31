'use client';

import { I18nextProvider } from "react-i18next";
import intlInit from "@/app/i18n";
import { createInstance } from "i18next";
import {IntlProviderArgs} from "@/types";

export default function IntlProvider(args: IntlProviderArgs) {
    const { children, locale, namespaces, resources } = args
    const i18n = createInstance();

    void intlInit({ locale, namespaces, i18nInstance: i18n, resources });

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
