import { Container, Heading } from "@chakra-ui/react";
import CandidateForm from "../Component/CandidateForm";

export default function CandidateFormPage() {
  return (
    <Container maxW="container.md" py={10}>
      <Heading mb={6}>Register New Candidate</Heading>
      <CandidateForm />
    </Container>
  );
}
