function Container({ children }) {
  // Container component that wraps the entire page
  return (
    <div className="w-full h-full bg-gradient-to-r from-slate-800 to-blue-700">
      { children }
    </div>
  )
}

export default Container;
