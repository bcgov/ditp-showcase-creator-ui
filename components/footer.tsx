import {i18nInstance2} from "@/app/i18n";

export const Footer = () => {
  return (
    <footer className="py-6 bg-light-bg-secondary dark:bg-dark-bg-secondary  dark:text-dark-text text-center relative bottom-0 left-0 w-full">
      <p>
        &copy; {new Date().getFullYear()} {i18nInstance2.t('footer_copyright_label')}
      </p>
    </footer>
  );
};
