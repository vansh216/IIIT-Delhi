import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/",
  withCredentials: true,
});

// Turns any API error into one readable sentence.
export function errorMessage(err) {
  if (!err.response) return "Can’t reach the server. Check your connection and try again.";
  const { error, details } = err.response.data ?? {};
  if (details) {
    const first = Object.values(details).flat()[0];
    if (first) return first;
  }
  return error ?? "Something went wrong. Try again.";
}

// Field-level messages from a validation error, e.g. { email: "Invalid email" }.
export function fieldErrors(err) {
  const details = err.response?.data?.details;
  if (!details) return {};
  return Object.fromEntries(Object.entries(details).map(([k, v]) => [k, [].concat(v)[0]]));
}