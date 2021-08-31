import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import TrelloCreate from "./TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort, setActiveBoard } from "../../store/actions";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// TODO: Fix performance issue

class TrelloBoard extends PureComponent {
  componentDidMount() {
    // set active trello board here
    const { boardID } = this.props.match.params;

    this.props.dispatch(setActiveBoard(boardID));
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists, cards, match, boards } = this.props;

    if (!boards) {
      return <p>Board not found</p>;
    }
    console.log(boards);
    return (
      <div>
        <Navbar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Link to="/">Go Back</Link>
          <h2>{boards["0"].title}</h2>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <ListsContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {lists[`Boards/${match.params.boardID}/lists`] &&
                  lists[`Boards/${match.params.boardID}/lists`].map(
                    (list, index) => {
                      //const list = lists[listID];
                      if (list) {
                        //const listCards = list.cards.map((cardID) => cards[cardID]);

                        return (
                          <TrelloList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            boardID={match.params.boardID}
                            //cards={listCards}
                            index={index}
                          />
                        );
                      }
                    }
                  )}
                {provided.placeholder}
                <TrelloCreate list boardID={match.params.boardID} />
              </ListsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.firestore.ordered,
    boards: state.firestore.ordered.Boards,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "Boards",
      where: ["BoardID", "==", props.match.params.boardID],
    },
    {
      collection: `Boards/${props.match.params.boardID}/lists`,
    },
  ])
)(TrelloBoard);
