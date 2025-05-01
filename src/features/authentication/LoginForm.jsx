import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogIn } from "./useLogIn";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*
test user: greg@gmail.com / greg69420
*/
function LoginForm() {
  const { isLogging, logIn } = useLogIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    logIn(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLogging}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLogging}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLogging}>
            {!isLogging ? "Log in" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Container>
    </Form>
  );
}

export default LoginForm;
