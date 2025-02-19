import apiClient from "../axiosConfig"

const Logout = ({isConnected}) => {
  if (!isConnected) window.location.replace("/");;
  const logout = async () => {
    try {
      await apiClient.get("/api/user/logout", { withCredentials: true });
      window.location.replace("/");
    } catch (error) {
      window.location.replace("/");
    }
  }
  logout();
}

export default Logout