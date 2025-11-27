export const login = (username, password) => {
  if (username === "Admin" && password === "MegaAdmin01") {
    localStorage.setItem("isAdmin", "true");
    return true;
  }
  return false;
};

export const isAdmin = () => {
  return localStorage.getItem("isAdmin") === "true";
};

export const logout = () => {
  localStorage.removeItem("isAdmin");
};