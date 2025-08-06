export const isVisible = (field, values) => {
  if (!field.condition) return true;

  const currentValue = values[field.condition.fieldId];
  if (currentValue == null) return false;

  if (Array.isArray(currentValue)) {
    return currentValue.includes(field.condition.value);
  }

  if (typeof currentValue === 'boolean') {
    return String(currentValue) === field.condition.value;
  }

  return currentValue === field.condition.value;
};
