import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import TrelloCreate from "./TrelloCreate";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { editTitle, deleteList } from "../../store/actions/listsActions";
import Icon from "@material-ui/core/Icon";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin: 0 8px 0 0;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  outline-color: blue;
  border-radius: 3px;
  margin-bottom: 3px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const DeleteButton = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const ListTitle = styled.h4`
  transition: background 0.3s ease-in;
  ${TitleContainer}:hover & {
    background: #ccc;
  }
`;

const TrelloList = ({
  title,
  cards,
  listID,
  index,
  deleteList,
  editTitle,
  boardID,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const renderEditInput = () => {
    return (
      <form onSubmit={handleFinishEditing}>
        <StyledInput
          type="text"
          value={listTitle}
          onChange={handleChange}
          autoFocus
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        />
      </form>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setListTitle(e.target.value);
  };

  const handleFinishEditing = (e) => {
    setIsEditing(false);
    editTitle({ listID, listTitle, boardID });
  };

  const handleDeleteList = () => {
    deleteList({ listID, boardID });
  };

  return (
    <Draggable draggableId={String(listID)} index={index}>
      {(provided) => (
        <ListContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(listID)} type="card">
            {(provided) => (
              <div>
                <div>
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <TitleContainer onClick={() => setIsEditing(true)}>
                      <ListTitle>{listTitle}</ListTitle>
                      <DeleteButton onClick={handleDeleteList}>
                        delete
                      </DeleteButton>
                    </TitleContainer>
                  )}
                </div>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {cards[`Boards/${boardID}/lists/${listID}/Cards`] &&
                    cards[`Boards/${boardID}/lists/${listID}/Cards`].map(
                      (card, index) => (
                        <TrelloCard
                          key={card.id}
                          text={card.text}
                          id={card.id}
                          index={index}
                          listID={listID}
                          boardID={boardID}
                        />
                      )
                    )}
                  {provided.placeholder}
                  <TrelloCreate listID={listID} boardID={boardID} />
                </div>
              </div>
            )}
          </Droppable>
        </ListContainer>
      )}
    </Draggable>
  );
};
const mapStateToProps = (state) => {
  return {
    cards: state.firestore.ordered,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editTitle: (list) => dispatch(editTitle(list)),
    deleteList: (list) => dispatch(deleteList(list)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => [
    {
      collection: "Boards",
      where: ["BoardID", "==", props.boardID],
    },
    {
      collection: `Boards/${props.boardID}/lists/${props.listID}/Cards`,
    },
  ])
)(TrelloList);
