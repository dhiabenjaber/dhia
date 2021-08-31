import { CONSTANTS } from "../actions";
import { uuid } from "uuidv4";

export const setActiveBoard = (id) => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id,
  };
};

export const addBoard = (title) => {
  const id = uuid();
  return async (dispatch, getState, { getFirebase }) => {
    //make async call to database
    const firestore = getFirebase().firestore();
    const userID = getFirebase().auth().currentUser.uid;
    await firestore
      .collection("Boards")
      .doc(id)
      .set({
        BoardID: id,
        title: title,
        userID: userID,
      })
      .then(() => {
        dispatch({ type: CONSTANTS.ADD_BOARD, payload: { title, id } });
      })
      .catch((err) => {
        dispatch({ type: "ADD_BOARD_ERROR", err });
      });
  };
};

/*export const setActiveBoard = id => {
  return {
    type: CONSTANTS.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const addBoard = title => {
  const id = uuid();
  return {
    type: CONSTANTS.ADD_BOARD,
    payload: { title, id }
  };
};*/
