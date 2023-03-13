import { SetMetadata } from '@nestjs/common';

export const AllowAnonymous = (arg: boolean) =>
  SetMetadata('allow-anonymous', arg);
