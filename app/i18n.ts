import { createInstance,  } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/i18n.config";

let i18nInstance2: any; // Shared instance

// TODO
// @ts-ignore
export default async function initTranslations({ locale, namespaces, i18nInstance, resources}: { locale: string, namespaces: Array<string>, i18nInstance?: any, resources?: any}) { // TODO type
    i18nInstance = i18nInstance || createInstance();

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

    i18nInstance2 = i18nInstance

    return {
        i18n: i18nInstance,
        resources: i18nInstance.services.resourceStore.data,
        t: i18nInstance.t
    };
}

export { i18nInstance2 };
