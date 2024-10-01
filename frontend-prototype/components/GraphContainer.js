function GraphContainer({ children }) {
  // Container for graphs
  return (
    <div
      className={`w-full h-full bg-slate-50 rounded-md max-w-full max-h-full`}
    >
      {children}
    </div>
  );
}

export default GraphContainer;
