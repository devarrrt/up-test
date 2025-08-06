export const CheckboxGroup = ({ label, options, checkedValues, onChange }) => (
  <>
    <label style={{ fontWeight: 'bold', display: 'block' }}>{label}</label>
    {options.map(opt => (
      <label key={opt} style={{ display: 'block' }}>
        <input
          type="checkbox"
          checked={checkedValues.includes(opt)}
          onChange={() => onChange(opt)}
        />
        {opt}
      </label>
    ))}
  </>
);