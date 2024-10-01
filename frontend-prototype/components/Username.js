function Username({}) {
  return (
    <div className="form-control w-full ">
      <label className="label">
        <span className="label-text font-bold">
          Please login to your account
        </span>
        <span className="label-text-alt"></span>
      </label>
      <input
        type="username"
        id="username"
        placeholder="Username"
        className="input input-bordered w-full "
      />
    </div>
  );
}

export default Username;
