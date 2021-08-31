import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { addBoard } from "../../store/actions";
import Navbar from "../../components/layout/Navbar";
import BoardThumbnail from "./BoardThumbnail";

const Thumbnails = styled.div`
  flex: 1;
  height: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CreateTitle = styled.h3`
  font-size: 48px;
  color: white;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
`;

const CreateInput = styled.input`
  width: 400px;
  height: 80px;
  font-size: 22px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  outline-color: blue;
  box-shadow: 0 2px 4px grey;
  align-self: center;
`;

const Home = ({ boards, dispatch, userID }) => {
  // this is the home site that shows you your boards and you can also create a Board here.

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleChange = (e) => {
    setNewBoardTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBoard(newBoardTitle));
  };

  const renderBoards = () => {
    if (boards) {
      return (
        boards &&
        boards.map((bo) => {
          const board = bo;

          return (
            <Link
              key={board.id}
              to={`/${board.id}`}
              style={{ textDecoration: "none" }}
            >
              <BoardThumbnail title={board.title} />
            </Link>
          );
        })
      );
    } else {
      return;
    }
  };

  const renderCreateBoard = () => {
    return (
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <CreateTitle>Create a new Board</CreateTitle>
        <CreateInput
          onChange={handleChange}
          value={newBoardTitle}
          placeholder="Your boards title..."
          type="text"
        />
      </form>
    );
  };

  return (
    <div>
      <Navbar />
      <HomeContainer>
        <Thumbnails>{renderBoards()}</Thumbnails>
        {renderCreateBoard()}
      </HomeContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userID: state.firebase.auth.uid,
    boards: state.firestore.ordered.Boards,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    {
      collection: "Boards",
      where: ["userID", "==", props.userID],
    },
  ])
)(Home);
