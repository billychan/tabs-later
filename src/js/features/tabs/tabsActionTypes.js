import { TABS_NAMESPACE, buildNamespaceFn } from 'common/actionNameSpaces';

const ns = buildNamespaceFn(TABS_NAMESPACE);

export const FETCH_TABS_REQUEST = ns('FETCH_TABS_REQUEST');
export const FETCH_TABS_SUCCESS = ns('FETCH_TABS_SUCCESS');
export const TAB_CHECKED_TOGGLE = ns('TAB_CHECKED_TOGGLE');
export const TABS_CHECKED_TOGGLE = ns('TABS_CHECKED_TOGGLE');
