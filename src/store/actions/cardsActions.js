import { CONSTANTS } from "../actions";
import { uuid } from "uuidv4";

export const addCard = ({ listID, text, boardID }) => {
  const id = uuid();
  return async (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const firestore = getFirebase().firestore();
    await firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(listID)
      .collection("Cards")
      .doc(id)
      .set({ listID, text, boardID, id })
      .then(() => {
        dispatch({
          type: CONSTANTS.ADD_CARD,
          payload: { listID, text, boardID, id },
        });
      })
      .catch((err) => {
        dispatch({ type: "ADD_LIST_ERROR", err });
      });
  };
};

export const editCard = ({ id, listID, cardText, boardID }) => {
  console.log(boardID);
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(listID)
      .collection("Cards")
      .doc(id)
      .update({
        text: cardText,
      })
      .then(() => {
        dispatch({ type: CONSTANTS.EDIT_CARD });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_PRODUCT_FROM_Wishlist_ERR" }, err);
      });
  };
};

export const deleteCard = ({ id, listID, boardID }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(listID)
      .collection("Cards")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: CONSTANTS.DELETE_CARD });
      })
      .catch((err) => {
        dispatch({ type: "DELETE_CARD_ERR" }, err);
      });
  };
};
