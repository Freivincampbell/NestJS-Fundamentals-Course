// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//
// export const Public = createParamDecorator(
// 	(defaultValue: string, ctx: ExecutionContext) => {
// 		const request = ctx.switchToHttp().getRequest();
// 		return request.protocol;
// 	}
// );

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
