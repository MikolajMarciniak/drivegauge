function NavContainer({ children }) {
  return (
    <div className="w-full h-full bg-slate-700">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  );
}

export default NavContainer;
