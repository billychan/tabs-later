interface NormalizedDateState {
  ids: {
    allIds: (string | number)[]
  },
  byId: Common.ByIdState
}

export const getItemById = (state: Common.ByIdState, id: keyof Common.ByIdState) => state[id];

export const getAllIds = (state: NormalizedDateState) => state.ids.allIds;

export const getAllItems = (state: NormalizedDateState) =>
  getAllIds(state).map(id => getItemById(state.byId, id));
