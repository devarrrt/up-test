export const LabeledInput = ({
  label,
  labelStyle,
  className,
  ...inputProps
}) => (
  <>
    <label style={labelStyle}>{label}</label>
    <input className={className} {...inputProps} />
  </>
);
