import LiveEventDetails from "../app/main/live-events/LiveEventDetails";

export default {
  component: LiveEventDetails,
  title: "Components/LiveEventDetails",
};

const Template = (args) => <LiveEventDetails {...args} />;

const eventDetails = {
  id: 2,
  name: "Great concert",
  contractBalance: 387,
  location: "Centra Bell|45.49713461630518, -73.56935821901432",
  atDateTime: new Date(),
  categories: ["Front", "Middle", "Back"],
  seatCounts: [10, 150, 2000],
  prices: [1000, 500, 20],
  toSell: [
    { seller: "0x23948798987", category: 0, salePrice: 1001, amount: 3 },
    { seller: "0x12345456456", category: 2, salePrice: 25, amount: 30 },
  ],
  metadata: { artists: ["Daddy Yankee", "Natti Natasha"] },
  mainImageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/c/c0/J_Balvin_2014.jpg",
};

export const Primary = Template.bind({});
Primary.args = {
  eventDetails: eventDetails,
};
