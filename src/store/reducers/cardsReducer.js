import { CONSTANTS } from "../actions";

const initialState = {
  "card-0": {
    text: "Last Episode",
    id: `card-0`,
    list: "list-0",
  },
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD:
      return state;

    case CONSTANTS.EDIT_CARD:
      return state;

    case CONSTANTS.DELETE_CARD:
      console.log("DELETE_CARD");
      return state;

    case "DELETE_CARD_ERR":
      console.log("DELETE_CARD_ERR");
      return state;

    default:
      return state;
  }
};

export default cardsReducer;
