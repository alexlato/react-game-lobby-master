import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import PlayerContext from "../Context/PlayerProvider";
import Player from "../Player/Player";
import { Container, Grid, Paper, Button, Avatar } from "@mui/material";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const PlayerLobby = (props) => {
  const { players } = useContext(PlayerContext);

  const { currentUser, logout, upload } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch {}
  }

  //upload
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState();
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  function handleUpload() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  //player lobby that gets rendered by the mapping of Player
  return (
    <>
      {players.map((player) => (
        <Player key={player.id} player={player} />
      ))}

      <div>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={4}
            justifyContent="center"
            fontSize={18}
            alignItems="center"
            columns={4}
            paddingTop={8}
            paddingBottom={8}
            paddingLeft={8}
            paddingRight={8}
          >
            <Grid item xs={2} borderRadius={8}>
              <Paper>Email: {currentUser.email}</Paper>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            fontSize={18}
            alignItems="center"
            columns={4}
            paddingTop={8}
            paddingBottom={8}
            paddingLeft={8}
            paddingRight={8}
          >
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
            <input type="file" onChange={handleImageChange} />
            <Button onClick={handleUpload} disabled={loading || !photo}>
              Upload
            </Button>
            <Avatar
              alt="Remy Sharp"
              src={photoURL}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default PlayerLobby;
