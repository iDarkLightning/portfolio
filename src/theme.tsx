import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { heading: "Playfair Display", body: "Inter" };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    bg: {
      800: "#1D1D1D",
      900: "#181818",
    },
    accentBlue: "#92FCEC",
    accentPink: {
      200: "#E9C8D0",
      300: "#FFB6B6",
      400: "#FC8DA7",
    },
    text: "#FFF",
  },
  styles: {
    global: () => ({
      body: {
        backgroundColor: "bg.800",
      },
    }),
  },
  fonts,
  breakpoints,
});

export default theme;
