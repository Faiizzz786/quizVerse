import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyResetToken = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:9099/api/auth/reset-password?token=${token}`);
        const data = await response.text();

        if (response.ok && data.includes("Token is valid")) {
          // ✅ Redirect to reset password page
          navigate(`/reset-password?token=${token}`);
        } else {
          alert("Invalid or expired token");
          navigate("/forgot-password"); // Redirect to forgot password page
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Try again.");
        navigate("/forgot-password");
      }
    };

    verifyToken();
  }, [token, navigate]);

  return <div>Verifying token...</div>; // Optional loading message
};

export default VerifyResetToken;



