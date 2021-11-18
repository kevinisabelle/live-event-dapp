import { AppBar, Button, Card, CardActions, CardContent } from "@mui/material";

function LiveEventDetails(props) {
  const { eventDetails } = props;

  return (
    <Card className="p-5">
      <AppBar position="relative" className="p-2">
        <h1>{eventDetails.name}</h1>
      </AppBar>

      <CardContent>
        <h2>Event date and location</h2>
        <h3>Total number of tickets</h3>
        <h4>Event </h4>
      </CardContent>

      <CardActions>
        <Button variant="contained">Buy Tickets</Button>
      </CardActions>
    </Card>
  );
}

export default LiveEventDetails;
