import { experimentalMethodDecorator } from '@library/presource';
import { logger } from '@common/logger';

// For making a class method abstracted
export const abstract = experimentalMethodDecorator(({ key }) => {
  logger.error(`${key} is not implemented in subclass`);
});

// For making a class method deprecated
export const deprecated = experimentalMethodDecorator(({ key }) => {
  // tslint:disable-next-line:no-console
  logger.warn(`${key} is deprecated`);
});
