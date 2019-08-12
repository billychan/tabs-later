import {
  UPDATE_PREFERENCE
} from './types';

export const updatePreferences = (preferences: object) => ({
  type: UPDATE_PREFERENCE,
  payload: {
    data: preferences
  }
})