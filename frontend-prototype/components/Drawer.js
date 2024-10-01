import * as Icons from "react-icons/hi2";
import Link from "next/link";
import NavComponent from "./NavComponent";
import DG from "../assets/DG.svg";
import BackArrow from "./BackArrow";
function Drawer({ children }) {
  // Constants for the nav bar - icons, sections, and links
  const icons = [
    <Icons.HiOutlineHome className="text-white text-2xl" />,
    <Icons.HiOutlineQueueList className="text-white text-2xl" />,
    <Icons.HiOutlinePhone className="text-white text-2xl" />,
    <Icons.HiOutlineDocumentText className="text-white text-2xl" />,
  ];
  const sections = ["Home", "Dashboard", "Support", "Documentation"];
  const links = {
    Home: "/",
    Dashboard: "/dashboard",
    Support: "/contacts",
    Documentation: "/#",
  };
  return (
    // Drawer component from daisyui with some modifications
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      {/* <!-- Page content here --> */}
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          Menu
        </label>
        <BackArrow />
        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          <div className="flex flex-col items-center justify-center">
            <div className="Logo">
              <div className="w-24 rounded-full my-10">
                <DG />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* Mapping the icons, sections and links */}
            {sections.map((section, index) => {
              return (
                <Link href={links[section]} key={section}>
                  <NavComponent icon={icons[index]} text={section} />
                </Link>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Drawer;
