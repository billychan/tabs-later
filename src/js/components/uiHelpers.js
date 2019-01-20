import { Intent, Toaster } from '@blueprintjs/core';

/**
 * Note the Toaster's api is imperative, it expected to be called inside component instead of
 * relying on state change such as SAVE_XXX_SUCCESS action type.
 * As a workaround, some actions handing async operations have been adjusted to return a promise so
 * that component knows the time of success and could call this helper.
 */
export const showSuccessMessage = (message) => {
  Toaster.create().show({
    message,
    intent: Intent.SUCCESS,
  });
};
