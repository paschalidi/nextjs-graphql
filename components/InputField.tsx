import React from "react";
import { FieldProps } from "formik";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export default ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const error = touched[field.name] && errors[field.name];
  return (
    <div>
      <input type="text" {...field} {...props} />
      {error && <div style={{color:'#cc0000'}}>{errors[field.name]}</div>}
    </div>
  );
};
