import { useState } from "react";
import Collapsible from "react-collapsible";

function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpening = () => {
    setIsOpen(true);
  };

  const handleClosing = () => {
    setIsOpen(false);
  };

  const bgClassName = isOpen ? "bg-blue-500" : "bg-blue-700";

  return (
    <Collapsible
      transitionTime={800}
      transitionCloseTime={400}
      onOpening={handleOpening}
      onClosing={handleClosing}
      trigger={
        <div
          className={`collapse-title text-primary-content font-bold ${bgClassName}`}
        >
          {title}
        </div>
      }
    >
      <div className={`p-6 ${bgClassName} text-primary-content`}>
        {children}
      </div>
    </Collapsible>
  );
}

export default Collapse;
