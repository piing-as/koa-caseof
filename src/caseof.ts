import * as koa from "koa";
import getAtPath from "lodash.get"

/*
 * A koa Middleware that acts like a switch, taking a path and finding that value on the ctx:IRequestContext
 * Then using the coresponding Middleware in the map of cases.
*/

interface IMiddlewareCases<IContext extends koa.Context> {
	[key: string]: koa.Middleware<any, IContext>;
}

// tslint:disable-next-line
export default <IContext extends koa.Context = koa.Context> 
	(on: string, cases: IMiddlewareCases<IContext>): koa.Middleware<any, IContext> => async(ctx: IContext, next) => {
		const key: string = getAtPath(ctx, on) as string;
		const matched: koa.Middleware<any, IContext> = cases[key];
		
		if(!matched)
			return await next();
		
		return await matched(ctx, next);
	};