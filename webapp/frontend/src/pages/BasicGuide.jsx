import { Box, Card, CardContent, Link, Typography } from "@mui/material";

// TODO: entire page
function BasicGuide() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 3 }}>
        <Typography variant="h4" gutterBottom>
          Basic Guide
        </Typography>
        <Typography gutterBottom>
          Taking care of freshwater fish can be a rewarding and enjoyable hobby,
          but it's important to do your research and understand how to properly
          care for your fish. Here's a beginner's guide to help you get started:
        </Typography>
        <Typography id="choose-fish" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Choosing your fish
        </Typography>
        <Box
          component="img"
          sx={{
            height: 200,
            display: "block",
            m: "25px auto",
          }}
          alt="The house from the offer."
          src={require("../fish.jpeg")}
        />
        <Typography gutterBottom>
          When it comes to picking a fish, there are a few things to consider.
          First, you'll want to think about the size of your tank. Different
          fish have different space requirements, so make sure to choose fish
          that will be comfortable in the size of tank you have. As a general
          rule of thumb, allow for 1 inch of fish per gallon of water.
          <br />
          <br />
          Second, consider the compatibility of the fish you want to keep. Some
          fish are more aggressive than others and may not get along well with
          certain species. Research the temperament of each fish you're
          interested in to ensure that they will be compatible with each other.
          <br />
          <br />
          Finally, consider the level of care required for each species. Some
          fish are hardier and require less maintenance, while others may be
          more delicate and require more attention. Examples of popular
          freshwater fish for beginners include guppies, platies, neon tetras,
          and danios. Make sure to research the specific needs of each species
          before making your final decision.
        </Typography>
        <Typography id="buy" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          What to buy
        </Typography>
        <Box
          component="img"
          sx={{
            height: 200,
            display: "block",
            m: "25px auto",
          }}
          alt="The house from the offer."
          src={require("../store.jpeg")}
        />
        <Typography gutterBottom>
          Once you've decided which fish you want to keep, it's time to start
          gathering the necessary supplies. Here's a list of what you'll need:
          <ul>
            <li>
              <b>Tank:</b> A 20-gallon tank is a good starting point for
              beginners. However, if you have larger fish or want to keep more
              fish, you may need a larger tank.
            </li>
            <li>
              <b>Filter:</b> A filter is necessary to keep the water clean and
              clear. Make sure to choose a filter that is appropriate for the
              size of your tank. A good rule of thumb is to choose a filter that
              can process the entire volume of your tank at least 4 times per
              hour.
            </li>
            <li>
              <b>Heater:</b> Many freshwater fish require a specific temperature
              range, so a heater is essential to keep your tank at the proper
              temperature. Make sure to choose a heater that is appropriate for
              the size of your tank and that can maintain a consistent
              temperature.
            </li>
            <li>
              <b>Food:</b> Choose a high-quality food that is appropriate for
              the type of fish you have. Some fish require a specific type of
              food, such as pellets or flakes, so make sure to research the
              dietary needs of your fish.
            </li>
            <li>
              <b>Test kit:</b> A test kit will help you monitor the levels of
              ammonia, nitrite, and nitrate in your tank. These levels can
              indicate the health of your tank and help you determine when to
              perform water changes.
            </li>
            <li>
              <b>Decorations and plants:</b> Plants and decorations not only
              make your tank look nicer, but they also provide hiding places for
              your fish. Make sure to choose decorations that are safe for your
              fish and won't harm them.
            </li>
            <li>
              <b>Substrate:</b> Gravel is a popular choice for freshwater tanks.
              Make sure to rinse the gravel thoroughly before adding it to your
              tank to remove any dust or debris.
            </li>
            <li>
              <b>Net:</b> A net is useful for catching your fish when you need
              to move them. Make sure to choose a net that is appropriate for
              the size of your fish to avoid injuring them.
            </li>
          </ul>
        </Typography>
        <Typography id="setup" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          Setting up your tank
        </Typography>
        <Box
          component="img"
          sx={{
            height: 250,
            display: "block",
            m: "25px auto",
          }}
          alt="The house from the offer."
          src={require("../tank.jpeg")}
        />
        <Typography gutterBottom>
          Now that you have all of your supplies, it's time to set up your tank.
          <ul>
            <li>
              <b>Choose the right location:</b> The location of your tank is
              important for the health and well-being of your fish. Make sure to
              choose a spot that is away from direct sunlight and drafts, as
              these can cause temperature fluctuations in the water. Also, make
              sure the location is stable and can support the weight of the tank
              when filled with water.
            </li>
            <li>
              <b>Set up the substrate:</b> Once you've chosen the location for
              your tank, it's time to set up the substrate. Gravel is a popular
              choice for freshwater aquariums. Rinse the gravel thoroughly with
              water to remove any dirt or debris before adding it to your tank.
              Make sure to add enough gravel to create a depth of about 2-3
              inches in the tank.
            </li>
            <li>
              <b>Add decorations and plants:</b> Adding decorations and plants
              not only makes your tank look more attractive, but it also
              provides hiding places for your fish. Choose decorations and
              plants that are safe for your fish and won't harm them. Live
              plants are a great option for freshwater aquariums as they help
              maintain water quality by absorbing nitrates and carbon dioxide.
            </li>
            <li>
              <b>Install Fish Friend:</b> Attach Fish Friend to hang off the
              back of your fish tank, with the intake tube from the pump on the
              inside. Plug in the power and you’re ready to go! Without Fish
              Friend, you would need to take additional steps to install your
              filter, heater, and optional feeder separately.
            </li>
            <li>
              <b>Fill the Tank with Water:</b> Fill your tank with water slowly
              to avoid disturbing the substrate and decorations. Don’t worry
              that the water is clouded-up, it will likely be clear in the
              morning.
            </li>
            <li>
              <b>Cycle the Tank:</b> Before adding any fish to your tank, it's
              important to cycle the tank. Cycling refers to the process of
              establishing beneficial bacteria in the filter and substrate that
              convert harmful ammonia and nitrite into less harmful nitrate.
              This process typically takes 4-6 weeks. During this time, test the
              water regularly with a test kit to monitor the levels of ammonia,
              nitrite, and nitrate.
            </li>
            <li>
              <b>Add Fish:</b> Once the tank has cycled, it's time to add fish.
              Start with a small number of fish and gradually add more over
              time. Introduce fish slowly to avoid overloading the filtration
              system. Make sure to choose fish that are compatible with each
              other in terms of size and temperament. Also, make sure to feed
              your fish a high-quality food that is appropriate for their
              species.
            </li>
          </ul>
        </Typography>
        <Typography id="care-fish" variant="h5" sx={{ mt: 3, mb: 0.5 }}>
          How to care for your fish
        </Typography>
        <Box
          component="img"
          sx={{
            height: 200,
            display: "block",
            m: "25px auto",
          }}
          alt="The house from the offer."
          src={require("../yog.jpg")}
        />
        <Typography gutterBottom>
          <ul>
            <li>
              <b>Maintain the tank:</b> To keep your tank healthy and thriving,
              it's important to perform regular maintenance tasks, such as:
            </li>
            <ul>
              <li>
                Changing the water: Perform partial water changes of 20-30%
                every 1-2 weeks to remove accumulated waste and maintain water
              </li>
              <li>
                Cleaning the filter: Clean the filter regularly according to the
                manufacturer's instructions to maintain its effectiveness.
              </li>
              <li>
                Testing the water: Test the water regularly with a test kit to
                monitor the levels of ammonia, nitrite, and nitrate.
              </li>
              <li>
                Cleaning the substrate: Use a gravel vacuum, which uses the flow
                of the siphon to lift up the gravel and wash it thoroughly. It
                uses a wider opening to prevent all the gravel from being sucked
                out of the aquarium.
              </li>
            </ul>
            <li>
              <b>Feed Your fish properly:</b> Feed your fish a balanced diet
              that is appropriate for their species. Overfeeding can lead to
              poor water quality and health issues for your fish. Feed your fish
              only what they can eat within 2-3 minutes, and remove any uneaten
              food.
            </li>
            <li>
              <b>Monitor your fish:</b> Observe your fish regularly to make sure
              they are healthy and behaving normally. Look for signs of illness,
              such as lethargy, loss of appetite, or abnormal swimming behavior.
              If you notice any issues, take action immediately to treat your
              fish.
            </li>
            <li>
              <b>Maintain a consistent temperature:</b> Keep a consistent
              temperature in your tank using a heater. Most freshwater fish
              prefer temperatures between 72-82°F (22-28°C). Sudden changes in
              temperature can stress your fish, so avoid exposing them to
              temperature fluctuations.
            </li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ flex: 1, pl: 4 }}>
        <Card sx={{ position: "sticky", top: 24 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6">Contents</Typography>
            <div>
              <Link href="#choose-fish">Choosing your fish</Link>
            </div>
            <div>
              <Link href="#buy">What to buy</Link>
            </div>
            <div>
              <Link href="#setup">Setting up your tank</Link>
            </div>
            <div>
              <Link href="#care-fish">How to care for your fish</Link>
            </div>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ flex: 1, pl: 4 }}></Box>
    </Box>
  );
}

export default BasicGuide;
