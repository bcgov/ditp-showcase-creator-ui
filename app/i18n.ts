import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/i18n.config";
import {InitInternationalizationArgs} from "@/types";

export default async function initInternationalization(args: InitInternationalizationArgs) {
    const { locale = document.cookie
        .split('; ')
        .find(row => row.startsWith('preferredLanguage='))
        ?.split('=')[1]
        , namespaces = ['common'], i18nInstance = createInstance(), resources} = args

    i18nInstance.use(initReactI18next);

    if (!resources) {
        i18nInstance.use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`@/locales/${language}/${namespace}.json`)
            )
        );
    }

    await i18nInstance.init({
        lng: locale,
        resources,
        fallbackLng: i18nConfig.defaultLocale,
        supportedLngs: i18nConfig.locales,
        defaultNS: namespaces[0],
        fallbackNS: namespaces[0],
        ns: namespaces,
        preload: resources ? [] : i18nConfig.locales
    });

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t
    };
}
