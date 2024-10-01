function Password(props) {
  // Password component for the login page
  return (
    <div className="form-control w-full mt-2">
      <input
        type="password"
        id="password"
        placeholder="Password"
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default Password;
