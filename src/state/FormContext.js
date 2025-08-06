import React, { createContext, useReducer } from 'react';

import { reducer } from './reducer';

export const FormContext = createContext();

export const сonstructorStateInit = {
  label: '',
  type: 'input',
  placeholder: '',
  optionsText: '',
  hasCondition: false,
  conditionFieldId: '',
  conditionValue: '',
};

const initialState = {
  fields: [],
  values: {},
  constructor: сonstructorStateInit,
};

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleCheckboxValue = (current = [], value) =>
    current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

  const handleChangeValue = (fieldId, optionOrValue, isCheckbox = false) => {
    const value = isCheckbox
      ? toggleCheckboxValue(state.values[fieldId], optionOrValue)
      : optionOrValue;

    dispatch({
      type: 'SET_VALUE',
      payload: { id: fieldId, value },
    });
  };

  const setConstructorField = (field, value) => {
    dispatch({ type: 'SET_CONSTRUCTOR_FIELD', payload: { field, value } });
  };

  const addField = () => dispatch({ type: 'ADD_FIELD' });

  const removeField = (field) => dispatch({ type: 'REMOVE_FIELD', payload: field.id });

  return (
    <FormContext.Provider
      value={{
        state,
        dispatch,
        handleChangeValue,
        setConstructorField,
        addField,
        removeField,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
