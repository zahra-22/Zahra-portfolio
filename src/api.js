export const API_BASE_URL = "http://localhost:5000";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token"); //  read token from local storage

  const options = {
    method,
    credentials: "include", // send cookies (optional)
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), //  attach JWT token
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  // If unauthorized, return special flag
  if (response.status === 401) {
    return { unauthorized: true };
  }

  return response.json();
};
