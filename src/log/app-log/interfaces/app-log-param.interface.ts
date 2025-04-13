import { LogLevelEnum } from 'src/shared/enums';

export interface AppLogParamsInterface {
  level: LogLevelEnum;
  message: string;
  trace?: string;
  userId?: number;
  info?: string;
  entity?: string;
}
