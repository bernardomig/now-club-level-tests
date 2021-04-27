import React, { useState } from "react";
import {
  Fab,
  Popover,
  Typography,
  List,
  Avatar,
  ListItem,
  Box,
  Button,
  ListItemText,
  Divider,
  ButtonBase,
  useTheme,
  makeStyles,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useAuth0 } from "@auth0/auth0-react";

const useStyle = makeStyles(
  ({ spacing, palette: { primary, background, divider }, shadows }) => ({
    button: {},
    buttonMain: {
      padding: spacing(1, 2),
    },

    profileInfo: {
      padding: spacing(2),
      display: "flex",
      gap: spacing(1),
    },
  })
);

export default function Menu() {
  const classes = useStyle();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <ButtonBase
          onClick={handleClick}
          color="inherit"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 8,
          }}
        >
          <Avatar style={{ width: 32, height: 32 }} src={user.picture} />
          <Typography variant="body2">{user.name}</Typography>
        </ButtonBase>
      ) : (
        <Button color="inherit" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isAuthenticated ? (
          <div className={classes.profileInfo}>
            <Avatar src={user.picture}></Avatar>
            <div>
              <Typography variant="body1">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </div>
          </div>
        ) : (
          <Box p={2} display="flex" alignItems="center">
            <Typography variant="subtitle1">You are not logged in!</Typography>
          </Box>
        )}

        <Divider></Divider>
        <List>
          {isAuthenticated ? (
            <ListItem
              button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              <ListItemText>Logout</ListItemText>
            </ListItem>
          ) : (
            <ListItem button onClick={() => loginWithRedirect()}>
              <ListItemText>Login</ListItemText>
            </ListItem>
          )}
          <ListItem button>
            <ListItemText>Help</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
