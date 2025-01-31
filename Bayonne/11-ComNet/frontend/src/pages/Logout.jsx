const Logout = ({ isConnected }) => {
    if(isConnected) document.cookie = `comNetToken=null; ;expires=Thu, 01 Jan 1970 00:00:01 GMT";`;
    window.location.replace("/");
}

export default Logout;