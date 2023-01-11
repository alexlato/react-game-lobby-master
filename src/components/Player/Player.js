import React, { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import PlayerContext from "../Context/PlayerProvider";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { ClassNames, withTheme } from "@emotion/react";
import { blue, green, red, yellow } from "@mui/material/colors";
import { color } from "@mui/system";

const colors = [
  { value: red[500], label: "Red" },
  { value: green[500], label: "Green" },
  { value: blue[500], label: "Blue" },
  { value: yellow[500], label: "Yellow" },
];

const Player = (props) => {
  const { changePlayerColor, players } = useContext(PlayerContext);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    changePlayerColor(props.player.id, newColor);
  };

  //map available colors after looping
  const availableColors = [];

  //loop to find the color where the label is the player props.player.color
  for (const color of colors) {
    let isColorAllowed = true;

    for (const player of players) {
      if (player.color === color.label) {
        isColorAllowed = false;
      }
    }

    if (props.player.color === color.label) {
      isColorAllowed = true;
    }

    if (isColorAllowed) {
      availableColors.push(color);
    }
  }

  //making a new variable and setting it to the result of "finding the color in colors that matches the props.player.color label"
  const selectedColor = colors.find((color) => {
    return props.player.color === color.label;
  });
  console.log(props.player);
  //?. optional chaining operator, if available (not undefined or null) grab value, if undefined or null stop right there
  return (
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
          <Grid
            item
            xs={2}
            backgroundColor={selectedColor?.value}
            borderRadius={8}
          >
            <Paper className={ClassNames.customBorderRadius}>
              Player {props.player?.id}
            </Paper>
            <FormControl>
              <InputLabel></InputLabel>
              <Select
                value={props.player.color ?? "default"}
                onChange={handleColorChange}
              >
                <MenuItem value={"default"}>No Color</MenuItem>
                {availableColors.map((color) => {
                  return (
                    <MenuItem key={color.label} value={color.label}>
                      {color.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Player;
