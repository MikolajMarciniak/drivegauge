export async function fetchData(requestBody) {
  try {
    const response = await fetch("http://127.0.0.1:5000/backend/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: requestBody,
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Request failed due to network error:", error);
  }
}

export async function loginUser(user) {
  try {
    const response = await fetch("http://127.0.0.1:5000/backend/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${user}`,
      credentials: "include",
      redirect: "follow",
    });
    if (response.ok) {
      return response;
    } else {
      return console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("Request failed due to network error:", error);
  }
}
