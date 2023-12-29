import React, { createContext, useState } from "react";

export const DesignerContext = createContext(null);
const DesignerContextProvider = ({ children }) => {
  const [elements, setElements] = useState([]);

  const addElement = (index, element) => {
    setElements((prev) => {
      const newElement = [...prev];
      newElement.splice(index, 0, element);
      return newElement;
    });
  };

  const removeElement = (index) => {
    setElements((prev) => {
      prev.filter((element) => element.id !== index);
    });
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
};

export default DesignerContextProvider;
