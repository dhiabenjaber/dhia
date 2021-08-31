import "firebase/storage";
import firebase from "../../../config/fbConfig";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Divider,
  Typography,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));
function AccountProfile(props) {
  const [url, seturl] = useState("");
  const classes = useStyles();

  const state = {
    image: null,
    progress: 0,
    downloadURL: null,
    user: {
      avatar: "",
      city: "Los Angeles",
      country: "USA",
      jobTitle: "Senior Developer",
      name: "Mohamed Jed",
      timezone: "GTM-7",
    },
  };

  const user = {
    avatar: "/static/images/avatars/avatar_6.png",
    city: "Los Angeles",
    country: "USA",
    jobTitle: "Senior Developer",
    name: "Mohamed Jed",
    timezone: "GTM-7",
  };

  useEffect(() => {
    // Update the document title using the browser API
    var storage = firebase.storage();
    var storageRef = storage.ref();
    storageRef
      .child("profile/" + props.auth.uid)
      .getDownloadURL()
      .then((URL) => {
        seturl(URL);
      });
  }, [url]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      state.image = e.target.files[0];
    }
  };
  // console.log(e.target.files[0])

  const handleUpload = () => {
    let file = state.image;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef.child("profile/" + props.auth.uid).put(file);

    uploadTask.then((_) => {
      storageRef
        .child("profile/" + props.auth.uid)
        .getDownloadURL()
        .then((URL) => {
          seturl(URL);

          document.getElementById("file").value = null;
        });
    });
  };
  console.log(props.user_detail);
  return (
    <Card style={{ display: "flex", flexDirection: "column" }} {...props}>
      <CardContent style={{ flexGrow: 1 }}>
        <Box
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            spacing={3}
            justify="center"
            alignItems="center"
            direction="row"
            container
          >
            <Grid xs={12} item>
              <Grid
                justify="center"
                alignItems="center"
                direction="row"
                container
              >
                <Grid xs={3} item>
                  <Avatar
                    src={url}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid
                justify="center"
                alignItems="center"
                direction="row"
                container
              >
                <Grid xs={2} item>
                  <input
                    className={classes.input}
                    id="file"
                    onChange={handleChange}
                    type="file"
                  />
                  <label htmlFor="file">
                    <Button
                      style={{
                        backgroundColor: "cornflowerblue",
                        textTransform: "none",
                      }}
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Upload
                    </Button>
                  </label>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid
                justify="center"
                alignItems="center"
                direction="row"
                container
              >
                <Grid xs={11} item>
                  <Typography color="textPrimary" gutterBottom variant="h3">
                    {props.user_detail && props.user_detail.firstName}{" "}
                    {props.user_detail && props.user_detail.lastName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid
                justify="center"
                alignItems="center"
                direction="row"
                container
              >
                <Grid xs={6} item>
                  <Typography color="textSecondary" variant="body1">
                    {props.user_detail && props.user_detail.state}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} item>
              <Grid
                justify="center"
                alignItems="center"
                direction="row"
                container
              >
                <Grid xs={6} item>
                  {" "}
                  <Typography color="textSecondary" variant="body1">
                    {`${moment().format("hh:mm A")} ${user.timezone}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ backgroundColor: "cornflowerblue" }}>
        <Button
          onClick={handleUpload}
          color="primary"
          fullWidth
          variant="text"
          style={{ color: "#fff", textTransform: "none" }}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(AccountProfile);
