import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import MDRenderer from "lib/components/basic/MDRenderer";

const About = () => {
  const bgCard = useColorModeValue("white", "#191919");
  return (
    <>
      <Box mx={"auto"} py="6" px={{ base: 6, sm: 2, md: 8 }}>
        <Box
          width={"100%"}
          px="6"
          py="2"
          shadow="base"
          borderRadius={"lg"}
          backgroundColor={bgCard}
          pb={8}
          aria-label="about this dashboard"
        >

          <MDRenderer>
            {`

## About

This dashboard is made with love by members of the Ethereum community, in partnership with Flipside Crypto. We hope it serves as a valuable window into high-level metrics that display the vitality and growth of the Lido.Fi.

  


  
### Methodology

-   Data is drawn from a combination of Flipside Crypto’s Ethereum tables and existing APIs.
    
-   For charts where data comes from Flipside’s data, a link to the underlying query is provided in the Settings gear wheel at the top right of each visualization.
    
-   By default, charts are set to refresh hourly
    
    
  
_**Do you have metrics you would like to see on this dashboard? Reach out to GJ via [Twitter](https://twitter.com/GJFlannery19) or Telegram (@Sunslinger) and we’ll do our best to incorporate them into our roadmap!**_


Last Updated: __Jun 6, 2022__
`}
          </MDRenderer>
        </Box>
      </Box>
    </>
  );
};

export default About;
