import { Path } from 'nestjs-i18n';

export type I18nTypes = {
  validation: {
    IS_NOT_EMPTY: string;
    IS_STRING: string;
    LENGTH: string;
    MAX_LENGTH: string;
    MIN_LENGTH: string;
    IS_NUMBER: string;
    IS_INT: string;
    MIN: string;
    MAX: string;
    IS_DATE: string;
    IS_DATE_STRING: string;
    MIN_DATE: string;
    MAX_DATE: string;
    IS_BOOLEAN: string;
    IS_EMAIL: string;
    IS_UUID: string;
    IS_JWT: string;
    IS_ENUM: string;
    IS_ARRAY: string;
    IS_JSON: string;
    IS_AFTER: string;
    IS_LESSTHAN_OR_EQUAL: string;
    IS_TDP_OR_CRN: string;
    IS_URL: string;
  };
};
export type I18nPath = Path<I18nTypes>;
