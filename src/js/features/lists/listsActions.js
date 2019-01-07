import { v4 } from 'node-uuid';
import {
  CREATE_LIST,
} from './listsActionTypes';

export const createList = ({ name }) => ({
  type: CREATE_LIST,
  payload: {
    id: v4(),
    name,
  },
});
