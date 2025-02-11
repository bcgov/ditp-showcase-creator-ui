import { EditStepScreen } from "@/components/scenario-screen/edit-step-screen";
import { ScenarioScreen } from "@/components/scenario-screen/scenario-screen";
import { PageParams } from "@/types";
  import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function Scenario({ params }: { params: PageParams }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("scenario");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex gap-12 container mx-auto px-4 py-8 mt-20">
        <div className="w-2/5 rounded left-col text-foreground">
          <div className="flex w-full">
            <div>
              <h2 className="text-4xl font-bold text-foreground">
                {t('header_title')}
              </h2>
              <p className="w-full mt-3">
                {t('header_subtitle')}
              </p>
            </div>
          </div>
          <ScenarioScreen />
        </div>
        <EditStepScreen/>
      </div>
    </div>
  );
}
