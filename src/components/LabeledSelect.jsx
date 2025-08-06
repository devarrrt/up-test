export const LabeledSelect = ({
  label,
  options,
  className,
  labelStyle,
  placeholder = 'Выберите вариант ответа',
  ...selectProps
}) => (
  <>
    <label style={labelStyle}>{label}</label>
    <select className={className} {...selectProps}>
      <option value="">{placeholder}</option>
      {options.map((opt) =>
        // main select
        typeof opt === 'string' ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          // conditional select
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ),
      )}
    </select>
  </>
);
