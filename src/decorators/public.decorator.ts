import { SetMetadata } from '@nestjs/common';

// We set the Metadata IS_PUBLIC_KEY to true so we can assign which
// Controllers or Requests/Handler() in controllers are Public using Public()
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);