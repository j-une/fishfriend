import { Card, CardContent, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

// TODO: entire page
function FishFriend() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 3 }}>
        <Typography variant="h4" gutterBottom>
          Fish Friend
        </Typography>
        <Typography gutterBottom>
          Here you can find all the details on Fish Friend, your all-in-one
          smart fish tank system.
        </Typography>
        <Typography id="sensors" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Sensors
        </Typography>
        <Typography gutterBottom>
          Fish Friend uses a pH sensor and a temperature sensor that are always
          checking these values of your tank water and storing their changes
          over time. This way, we can keep you notified about unusual changes in
          pH or temperature and whether they are in a safe range for your fish.
          We also plot this data on graphs in the Your Tank section, so you can
          visualize and monitor how they vary over time.
        </Typography>
        <Typography id="feeder" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Automatic Feeder
        </Typography>
        <Typography gutterBottom>
          Our automatic feeder can dispense flakes or pellets for your fish at
          set intervals. You can set the automatic feeder under the Your Tank
          section, by specifying the number of times per day to feed and the
          number of rotations. Rotations refers to the number of rotations of
          the feedscrew mechanism that turns to dispense the food.
          {/* TODO: how much to feed. */}
        </Typography>
        <Typography id="heater" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Heater
        </Typography>
        <Typography gutterBottom>
          We use a submersible aquatic heater in our Fish Friend box to evenly
          heat the water in your tank. You can set your desired temperature in
          the Your Tank section, and we will keep your temperature steady using
          the readings from the temperature sensor.
        </Typography>
        <Typography id="filtering" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Filtering
        </Typography>
        <Typography gutterBottom>
          Fish Friend uses a three-stage filtration system consisting of sponge,
          porous substrate, and charcoal. The sponge is a mechanical filter
          which acts as a physical barrier to collect and filter waste. The
          porous substrate is a biological filter that breaks down ammonia from
          fish waste into nitrite, and then nitrite. Lastly, the charcoal is a
          chemical filter which absorbs harmful chemicals such as chlorine
          through carbon cartridges. This keeps your tank water in good
          conditions, by decreasing the harmful components in the water.
          However, you must still perform regular water changes to keep nitrite
          levels manageable.
        </Typography>
        <Typography id="pump-valve" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Pump and valve
        </Typography>
        <Typography gutterBottom>
          Our pump and valve system is used to keep your tank water filtered and
          perform automated water changes. The pump constantly runs and works by
          sucking the tank water through an intake tube, where it travels to our
          Fish Friend box and passes through the three levels of filtration.
          Then, the filtered water flows back into the tank. This continuous
          process keeps your tank water filtered, provides oxygen for your fish,
          and mixes the water to keep it at a steady temperature throughout.
          <br />
          When you request a water change, the valve position changes so the
          water sucked from your tank will exit to waste instead of the normal
          filtration process. Once you have added clean water back into your
          tank, the valve will reset to normal position and continue filtering
          the water.
        </Typography>
        <Typography id="electrical" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Electrical box
        </Typography>
        <Typography gutterBottom>
          The bottom portion of Fish Friend is where all the electrical
          components are stored. This dry box is where all the above components
          are connected and controlled with an Arduino.
        </Typography>
      </Box>
      <Box sx={{ flex: 1, pl: 4 }}>
        <Card sx={{ position: "sticky", top: 24 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6">Contents</Typography>
            <div>
              <Link href="#sensors">Sensors</Link>
            </div>
            <div>
              <Link href="#feeder">Automatic Feeder</Link>
            </div>
            <div>
              <Link href="#heater">Heater</Link>
            </div>
            <div>
              <Link href="#filtering">Filtering</Link>
            </div>
            <div>
              <Link href="#pump-valve">Pump and valve</Link>
            </div>
            <div>
              <Link href="#electrical">Electrical box</Link>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default FishFriend;
