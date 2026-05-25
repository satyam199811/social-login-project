"use client";

import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {

      const formData = new URLSearchParams();

      formData.append("grant_type", "convert_token");
      formData.append(
        "client_id",
        process.env.NEXT_PUBLIC_DJANGO_CLIENT_ID!
      );

      formData.append(
        "client_secret",
        process.env.NEXT_PUBLIC_DJANGO_CLIENT_SECRET!
      );

      formData.append("backend", "google-oauth2");

      formData.append(
        "token",
        tokenResponse.access_token
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/convert-token`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem(
          "access_token",
          data.access_token
        );

        window.location.href = "/dashboard";
      } else {
        console.log("Login failed:", data);
      }
    },
  });

  return (
    <main style={{ padding: "40px" }}>
      <h1>Social Login App</h1>

      <button onClick={() => login()}>
        Login with Google
      </button>
    </main>
  );
}

export default function Home() {
  return (
    <GoogleOAuthProvider
      clientId={
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
      }
    >
      <LoginPage />
    </GoogleOAuthProvider>
  );
}