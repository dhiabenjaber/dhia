import { CONSTANTS } from "../actions";
import { uuid } from "uuidv4";

export const addList = ({ text, boardID }) => {
  const id = uuid();
  return async (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const firestore = getFirebase().firestore();
    await firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(id)
      .set({ title: text, boardID: boardID, listID: id })
      .then(() => {
        dispatch({
          type: CONSTANTS.ADD_LIST,
          payload: { text, boardID, id },
        });
      })
      .catch((err) => {
        dispatch({ type: "ADD_LIST_ERROR", err });
      });
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: CONSTANTS.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID,
      },
    });
  };
};

export const editTitle = ({ listID, listTitle, boardID }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(listID)
      .update({
        title: listTitle,
      })
      .then(() => {
        dispatch({ type: CONSTANTS.EDIT_LIST_TITLE });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_PRODUCT_FROM_Wishlist_ERR" }, err);
      });
  };
};

export const deleteList = ({ listID, boardID }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("Boards")
      .doc(boardID)
      .collection("lists")
      .doc(listID)
      .delete()
      .then(() => {
        dispatch({ type: CONSTANTS.DELETE_LIST });
      })
      .catch((err) => {
        dispatch({ type: "REMOVE_PRODUCT_FROM_Wishlist_ERR" }, err);
      });
  };
};
