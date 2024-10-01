function HomeNav() {
  // Home page navigation component
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="..//">
          DriveGauge
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="../login">Sign in</a>
          </li>
          <li>
            <a href="../contacts">Contact us</a>
          </li>
          <li tabIndex={10}></li>
        </ul>
      </div>
    </div>
  );
}

export default HomeNav;
