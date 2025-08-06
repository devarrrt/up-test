import { v4 as uuidv4 } from 'uuid';

import { isVisible } from '../utils/visibility';

import {сonstructorStateInit} from './FormContext';

const createNewField = (constructor) => {
  const {
    label,
    type,
    placeholder,
    optionsText,
    hasCondition,
    conditionFieldId,
    conditionValue,
  } = constructor;

  const options = optionsText
    .split(',')
    .map((opt) => opt.trim())
    .filter(Boolean);

  return {
    id: uuidv4(),
    label,
    type,
    placeholder,
    options,
    condition: hasCondition && conditionFieldId && conditionValue
      ? { fieldId: conditionFieldId, value: conditionValue }
      : null,
  };
};

const updateFieldById = (fields, updatedField) =>
  fields.map((field) => (field.id === updatedField.id ? updatedField : field));

const cleanUpForm = (fields, values, fieldIdToRemove) => {
  const updatedFields = fields
    .filter(({ id }) => id !== fieldIdToRemove)
    .map((field) =>
      field.condition?.fieldId === fieldIdToRemove
        ? { ...field, condition: null }
        : field
    );

  const restValues = Object.fromEntries(
    Object.entries(values).filter(([key]) => key !== fieldIdToRemove)
  );

  const visibleIds = new Set(
    updatedFields
      .filter((field) => isVisible(field, restValues))
      .map((field) => field.id)
  );

  const cleanedValues = Object.fromEntries(
    Object.entries(restValues).filter(([key]) => visibleIds.has(key))
  );

  return { filteredFields: updatedFields, cleanedValues };
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONSTRUCTOR_FIELD': {
      const { field, value } = action.payload;
      return {
        ...state,
        constructor: {
          ...state.constructor,
          [field]: value,
        },
      };
    }

    case 'ADD_FIELD': {
      const newField = createNewField(state.constructor);
      return {
        ...state,
        fields: [...state.fields, newField],
        values: {
          ...state.values,
          [newField.id]: newField.type === 'checkbox' ? [] : '',
        },
        constructor: сonstructorStateInit
      };
    }

    case 'UPDATE_FIELD': {
      return {
        ...state,
        fields: updateFieldById(state.fields, action.payload),
      };
    }

    case 'REMOVE_FIELD': {
      const fieldIdToRemove = action.payload;
      const { filteredFields, cleanedValues } = cleanUpForm(
        state.fields,
        state.values,
        fieldIdToRemove
      );

      return {
        ...state,
        fields: filteredFields,
        values: cleanedValues,
      };
    }

    case 'SET_VALUE': {
      const { id, value } = action.payload;
      return {
        ...state,
        values: {
          ...state.values,
          [id]: value,
        },
      };
    }

    case 'RESET_CONSTRUCTOR':
      return {
        ...state,
        constructor: сonstructorStateInit,
      };

    default:
      return state;
  }
}
