export const getAccessToken = () => {
  return localStorage.getItem("token");
};

export const isLoggedIn = () => {
  return !!getAccessToken();
};

export const studentLogout = () => {
  localStorage.removeItem("token");
  window.location.href("/student-login");
};
