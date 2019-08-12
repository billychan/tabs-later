export const UPDATE_PREFERENCE = 'UPDATE_PREFERENCE';

export interface UpdatePreferenceAction {
  type: typeof UPDATE_PREFERENCE;
  payload: {
    data: object;
  }
}