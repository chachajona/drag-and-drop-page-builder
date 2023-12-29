import PageBuilder from "../Demo2/components/PageBuilder";
import DesignerContextProvider from "../Demo2/components/context/DesignerContext";

const Demo2 = () => {
  return (
    <DesignerContextProvider>
      <PageBuilder />
    </DesignerContextProvider>
  );
};

export default Demo2;
