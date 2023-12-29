// TextField.jsx
import React from "react";
import { MdTextFields } from "react-icons/md";

const type = "TextField";

const extraAttributes = {
  label: "Text Field",
  helperText: "Helper text",
  required: false,
  placeholder: "Value here ...",
};

export const TextFieldPageElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes,
  }),
  designBtnElement: {
    icon: <MdTextFields />,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: () => <input type="text" placeholder="Text Field" />,
  propertiesComponent: () => <div>TextField Properties Component</div>,
};

function DesignerComponent({ elementInstance }) {
  const element = elementInstance;
  const { label, required, placeholder, helperText } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <label>
        {label}
        {required && <span>*</span>}
      </label>
      <input readOnly disabled placeholder={placeholder}>
        {helperText && (
          <p className="text-[0.8rem] text-slate-500">{helperText}</p>
        )}
      </input>
    </div>
  );
}
