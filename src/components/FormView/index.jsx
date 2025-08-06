import React, { useContext } from 'react';

import { FormContext } from '../../state/FormContext';

import { isVisible } from '../../utils/visibility';

import { LabeledInput, LabeledSelect, CheckboxGroup } from '../index';

import styles from './FormView.module.css';

export const FormView = () => {
  const { state, handleChangeValue, removeField } = useContext(FormContext);
  const { fields, values } = state;

  return (
    <div className={styles.container}>
      <h3>Превью формы</h3>
      {fields.length > 0
        ? fields.map((field) => {
            const value = values[field?.id] || '';
            return isVisible(field, values) ? (
              <div key={field.id} className={styles.field}>
                {field.type === 'input' && (
                  <LabeledInput
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      handleChangeValue(field.id, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className={styles.input}
                  />
                )}
                {field.type === 'select' && (
                  <LabeledSelect
                    label={field.label}
                    value={value}
                    onChange={(e) =>
                      handleChangeValue(field.id, e.target.value)
                    }
                    options={field.options}
                    className={styles.input}
                  />
                )}
                {field.type === 'checkbox' && (
                  <CheckboxGroup
                    label={field.label}
                    options={field.options}
                    checkedValues={values[field.id] || []}
                    onChange={(opt) => handleChangeValue(field.id, opt, true)}
                  />
                )}
                <button
                  className={styles.deleteButton}
                  onClick={() => removeField(field)}
                >
                  Удалить
                </button>
              </div>
            ) : null;
          })
        : 'Создайте первую форму'}
    </div>
  );
};
