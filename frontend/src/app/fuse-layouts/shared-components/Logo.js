import { AirplaneTicket } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Root = styled("div")(({ theme }) => ({
  "& > .logo-icon": {
    transition: theme.transitions.create(["width", "height"], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  "& > .badge, & > .logo-text": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <AirplaneTicket />
      <Typography
        className="logo-text text-16 leading-none mx-12 font-medium"
        color="inherit"
      >
        Event Tickets
      </Typography>
      <div
        className="badge flex items-center py-4 px-8 rounded"
        style={{ backgroundColor: "#121212", color: "#61DAFB" }}
      ></div>
    </Root>
  );
}

export default Logo;
