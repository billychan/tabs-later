import { 
  UPDATE_PREFERENCE,

  UpdatePreferenceAction,
} from './types';

const DEFAULT_PREFERENCES_STATE = {
  closeTabAfterSaving: true,
}

const preferences = (
  state = DEFAULT_PREFERENCES_STATE, action: UpdatePreferenceAction
): Common.ByIdState => {
  switch (action.type) {
    case UPDATE_PREFERENCE:
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};

export default preferences;