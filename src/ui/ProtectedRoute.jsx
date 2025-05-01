import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
  height: 100dvh;
  width: 100dvw;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Load authenticated user
  const { isAuthenticated, isFetchingUser } = useUser();

  // If not authenticated, navigate to a login page
  useEffect(() => {
    if (!isFetchingUser && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, isFetchingUser, navigate]);

  // Show a spinner while loading
  if (isFetchingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // User authenticated? Render the app!
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
