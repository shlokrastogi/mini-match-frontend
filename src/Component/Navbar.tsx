import { Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={6}
      py={4}
      borderBottomWidth="1px"
      bg="gray.100"
    >
      <Heading size="md" color="teal.700">
        Mini Match
      </Heading>

      <Button colorScheme="teal" onClick={() => navigate("/candidate/new")}>
        Register Candidate
      </Button>
    </Flex>
  );
}
