export const getItemById = (state = {}, id) => state[id];

export const getAllIds = state => state.ids.allIds;

export const getAllItems = state => getAllIds(state).map(id => getItemById(state.byId, id));
