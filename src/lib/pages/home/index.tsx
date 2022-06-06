import {
  Box,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import { NextSeo } from "next-seo";

const colors = ["#ffc107", "#ff5722", "#03a9f4", "#4caf50", "#00bcd4", "#f44336", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#009688", "#607d8b"]

interface Props {
}


const Home = ({

}: Props) => {
  const bgCard = useColorModeValue("white", "#191919");


  return (
    <>
      <NextSeo
        title='LidoDash | Business Intelligence Dashboard for Lido.Fi'
        description='Track the latest stats and trends on Terra'
        openGraph={{
          url: 'https://LidoDash.vercel.app/ust',
          title: 'LidoDash | Business Intelligence Dashboard for Lido.Fi',
          description: 'Track the latest stats and trends on Terra',
          images: [
            {
              url: 'https://ogLidoDash.vercel.app/ogLidoDash.png',
              width: 1200,
              height: 630,
              alt: 'Overview Terra Information',
              type: 'image/png',
            },
          ],
          site_name: 'LidoDash',
        }}
        twitter={{
          handle: "@flipsidecrypto",
          cardType: "summary_large_image",
        }}
      />
      <Box mx={"auto"} px={{ base: 6, sm: 2, md: 8 }}>
        <SimpleGrid
          my={"6"}
          columns={{ base: 1, md: 2, lg: 2, "2xl": 3 }}
          spacing={{ base: 5, lg: 8 }}
        >


        </SimpleGrid>
        <SimpleGrid
          position={'relative'}
          transition={'all 0.9s ease-in-out'}
          py={"6"}
          zIndex={100}
          columns={{ sm: 1, md: 1, lg: 2, "2xl": 3 }}
          spacing={{ base: 1, md: 2, lg: 4 }}
        >


        </SimpleGrid>
      </Box>
    </>
  );
};

export default Home;
