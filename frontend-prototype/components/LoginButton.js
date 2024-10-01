function LoginButton(props) {
  const handleClick = () => {
    // Get the values of the username and password fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Call the handleLogin function passed from the Login component
    props.handleLogin(username, password);
  };
  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      Login
    </button>
  );
}

export default LoginButton;
