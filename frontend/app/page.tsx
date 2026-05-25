"use client";

export default function Home() {
  const login = () => {
    localStorage.setItem(
      "access_token",
      "uxLa5IENGsBg28U4fVp907HsPilfgP"
    );

    window.location.href = "/dashboard";
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Social Login App</h1>
      <button onClick={login}>Login with Google</button>
    </main>
  );
}
