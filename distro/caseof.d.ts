/// <reference types="koa-compose" />
import * as koa from "koa";
export interface IMiddlewareCases<IContext extends koa.Context> {
    [key: string]: koa.Middleware<any, IContext>;
}
declare const _default: <IContext extends koa.Context = koa.Context>(on: string, cases: IMiddlewareCases<IContext>) => import("koa-compose").Middleware<koa.ParameterizedContext<any, IContext>>;
export default _default;
