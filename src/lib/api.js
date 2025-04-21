const BASE_URL = "https://appv1-dd1c5910c109.herokuapp.com/api/v1";

export async function registerUser({ firstName, lastName, email, password }) {
  const full_name = `${firstName} ${lastName}`;

  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: { full_name, email, password },
    }),
  });

  const data = await response.json();

  if (!response.ok || data.status !== "success") {
    const errorMsg =
      data.errors?.join(", ") || data.message || "Registration failed.";
    throw new Error(errorMsg);
  }

  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}/users/sign_in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: { email, password } }),
  });

  const data = await response.json();

  if (!response.ok || data.status?.code !== 200) {
    throw new Error(data.status?.message || "Login failed");
  }

  return data; // contains token + user
}
