// TextField.jsx
import React from "react";
import { MdTextFields } from "react-icons/md";

const type = "TextField";

export const TextFieldPageElement = {
  type,
  construct: (id) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here ...",
    },
  }),
  designBtnElement: {
    icon: <MdTextFields />,
    label: "Text Field",
  },
  designComponent: () => <div>TextField Design Component</div>,
  formComponent: () => <input type="text" placeholder="Text Field" />,
  propertiesComponent: () => <div>TextField Properties Component</div>,
};
