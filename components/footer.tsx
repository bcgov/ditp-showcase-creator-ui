import intlInit from "@/app/i18n";

type Props = {
    locale: string
}

export const Footer = async (props: Props) => {
  const { t } = await intlInit({ locale: props.locale })
  return (
    <footer className="py-6 bg-light-bg-secondary dark:bg-dark-bg-secondary  dark:text-dark-text text-center relative bottom-0 left-0 w-full">
      <p>
        &copy; {new Date().getFullYear()} {t('footer.copyright_label')}
      </p>
    </footer>
  );
};
