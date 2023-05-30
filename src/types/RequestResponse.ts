import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export interface BodyRequest<T> extends Request {
  body: T;
}

export interface ParamsRequest<T extends ParamsDictionary> extends Request {
  params: T;
}

export interface QueryRequest<T extends ParsedQs> extends Request {
  query: T;
}

export interface BodyParamsRequest<T, U extends ParamsDictionary> extends BodyRequest<T>, ParamsRequest<U> {
  body: T;
  params: U;
}
