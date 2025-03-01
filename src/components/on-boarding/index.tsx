import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";

export default function OnBoarding() {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.authState?.authenticated) navigate("/dashboard");
    else navigate("/login");
  }, []);

  return <></>;
}
