import gsap from "gsap";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import { useRefs } from "../context";
import { IHero } from "../query";
import { motion } from "framer-motion";
import { Button } from "./button";
import { ChevronDownIcon } from "@chakra-ui/icons";

gsap.registerPlugin(ScrollTrigger);

const MotionText = motion(Text);

export const Hero: React.FC<IHero> = ({ title, name, description }) => {
  const { projects, headingRef, imgRef } = useRefs();

  useEffect(() => {
    gsap
      .timeline()
      .to(imgRef.current, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: 0.6,
        duration: 0.8,
      })
      .from(headingRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.1,
      })
      .to(headingRef.current, {
        scrollTrigger: {
          trigger: projects.current,
          start: "top bottom",
          scrub: 1,
        },
        y: -300,
      })
      .to(imgRef.current, {
        scrollTrigger: {
          trigger: projects.current,
          start: "top bottom",
          scrub: 1,
        },
        scale: 1.1,
      });
  }, []);

  return (
    <Box h="100vh" display="flex" mt="-4.5rem" overflowY="hidden">
      <Flex
        flexDir="column"
        justifyContent="center"
        gap="1rem"
        ref={headingRef}
        position="relative"
      >
        <Text fontFamily="Space Mono" color="accent" fontSize="1rem">
          {name}
        </Text>
        <Heading
          fontSize={{ base: "3rem", lg: "5rem" }}
          textTransform="uppercase"
          maxWidth="25ch"
        >
          {title}
        </Heading>
        <Text
          color="text.100"
          fontSize={{ base: "1rem", lg: "1.25rem" }}
          maxWidth="64ch"
        >
          {description}
        </Text>
        <Button
          mt="2rem"
          onClick={() =>
            projects.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          View My Work
        </Button>
      </Flex>
      <Flex
        clipPath="polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        ref={imgRef}
        opacity={{ base: "60%", md: "100%" }}
        w={{ base: "100%", lg: "50%" }}
        position="absolute"
        h={{ base: "50vh", lg: "100vh" }}
        right={0}
        top={0}
        zIndex="-1"
        background="url(/hero.png)"
        backgroundSize="cover"
      />
    </Box>
  );
};
