import { CONSTANTS } from "../actions";

const initialState = {
  "board-0": {
    id: "board-0",
    lists: ["list-0"],
    title: "myboard",
  },
};

const boardsReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      return state;

    case CONSTANTS.DRAG_HAPPENED:
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type,
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;

    case CONSTANTS.DELETE_LIST:
      console.log("REMOVE_PRODUCT");
      return state;

    case CONSTANTS.ADD_BOARD:
      return state;

    default:
      return state;
  }
};

export default boardsReducer;
