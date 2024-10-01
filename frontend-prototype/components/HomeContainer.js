function HomeContainer({children}) {
  // Container for home page
  return (
        <div className="rounded-md mx-auto my-32 py-5 px-2 space-y-3 w-3/6 h-2/5 bg-base-100 shadow-lg shadow-black">
          {children}
        </div>
  );
}

export default HomeContainer;
