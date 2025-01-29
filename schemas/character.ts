import { z } from "zod";
import { i18nInstance2 } from '@/app/i18n';

export const characterSchema = z.object({
  name: z.string().min(1, i18nInstance2.t('character_edit_name_error_message')),
  type: z.string().min(1, i18nInstance2.t('character_edit_role_error_message')),
  description: z.string().min(1, i18nInstance2.t('character_edit_description_error_message')),
});
