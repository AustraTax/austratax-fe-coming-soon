const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function parseResponse(res) {
  const json = await res.json();
  if (!res.ok || json.status !== "success") {
    throw new Error(json.message || "Request failed.");
  }
  return json;
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const errorMessage = data?.errors?.[0] || data.message || "Signup failed.";
    throw new Error(errorMessage);
  }

  return data;
}

export async function confirmEmail(token) {
  const res = await fetch(`${BASE_URL}/users/confirm-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Email confirmation failed.");
  }

  return data.message || "Email confirmed.";
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok || !data.token || data.status?.code !== 200) {
    throw new Error(data.message || "Login failed.");
  }

  return data; // includes { user, token }
}

export async function loginWithToken(token) {
  try {
    // You could decode it on the frontend, or verify it via backend if needed
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to fetch user");
    }

    return {
      user: data.user,
      token,
    };
  } catch (err) {
    throw new Error(err.message || "Google login failed.");
  }
}
