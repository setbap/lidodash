/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "LidoDash",
  titleTemplate: "%s | Business Intelligence Dashboard for Lido.fi",
  defaultTitle:
    "LidoDash | Business Intelligence Dashboard for Lido.fi ",
  description:
    "Best Business Intelligence Dashboard for Lido.fi by Flipside Crypto and Setbap ",
  canonical: "https://LidoDash.vercel.app/",
  openGraph: {
    url: "https://LidoDash.vercel.app/",
    title: "LidoDash",
    description:
      "Best Business Intelligence Dashboard for Lido.fi by Flipside Crypto and Setbap ",
    images: [
      {
        url: "https://og-image.sznm.dev/**LidoDash**.vercel.app.png?theme=dark&md=1&fontSize=125px",
        alt: "LidoDash by Flipside Crypto and Setbap",
      },
    ],
    site_name: "LidoDash",
  },
  twitter: {
    handle: "@flipsidecrypto",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
