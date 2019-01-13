import { LISTS_NAMESPACE, buildNamespaceFn } from '../actionNameSpaces';

const ns = buildNamespaceFn(LISTS_NAMESPACE);

export const CREATE_LIST = ns('CREATE_LIST');
export const UPDATE_LIST = ns('UPDATE_LIST');
export const FETCH_LISTS_REQUEST = ns('FETCH_LISTS_REQUEST');
export const FETCH_LISTS_SUCCESS = ns('FETCH_LISTS_SUCCESS');
