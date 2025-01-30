"use client";

import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import i18nConfig from '@/i18n.config';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const languages = [
  { label: "English", value: i18nConfig.locales[0] },
  { label: "French", value: i18nConfig.locales[1] },
  { label: "German", value: i18nConfig.locales[2] },
];

export const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18nConfig.locales[0]);
  const router = useRouter();
  const currentPathname = usePathname();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  useEffect((): void => {
    if (currentLocale) {
      refreshUrl(currentLocale);
      setSelectedLanguage(currentLocale);
    }
  }, []);

  const handleSelectLanguage = (value: string): void => {
    setSelectedLanguage(value);
    // Set cookie with 1 year expiry
    const oneYear = new Date();
    oneYear.setFullYear(oneYear.getFullYear() + 1);
    document.cookie = `preferredLanguage=${value};expires=${oneYear.toUTCString()};path=/`;
    refreshUrl(value);
    setOpen(false);
  };

  const refreshUrl = (locale: string): void => {
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.replace('/' + locale + currentPathname);
    } else {
      router.replace(
          currentPathname.replace(`/${currentLocale}`, `/${locale}`)
      );
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-48 justify-between"
        >
          {selectedLanguage ? languages.find(
            (language) => language.value === selectedLanguage
          )?.label : "Select language"}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  onSelect={() => handleSelectLanguage(language.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLanguage === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
