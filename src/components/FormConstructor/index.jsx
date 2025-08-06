import React, { useContext } from 'react';

import { FormContext } from '../../state/FormContext';

import { LabeledInput, LabeledSelect } from '../index';

import styles from './FormConstructor.module.css';

export const FormConstructor = () => {
  const { state, setConstructorField, addField } = useContext(FormContext);

  const { fields } = state;
  const {
    label,
    type,
    placeholder,
    optionsText,
    hasCondition,
    conditionFieldId,
    conditionValue,
  } = state.constructor;

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Конструктор формы</h3>
      <LabeledInput
        label="Название поля"
        value={label}
        onChange={(e) => setConstructorField('label', e.target.value)}
        className={styles.input}
      />
      <LabeledSelect
        label="Тип поля"
        value={type}
        onChange={(e) => setConstructorField('type', e.target.value)}
        options={['input', 'select', 'checkbox']}
        className={styles.input}
      />
      {(type === 'input' || type === 'select') && (
        <LabeledInput
          label="Placeholder"
          value={placeholder}
          onChange={(e) => setConstructorField('placeholder', e.target.value)}
          className={styles.input}
        />
      )}
      {(type === 'select' || type === 'checkbox') && (
        <LabeledInput
          label="Опции (через запятую)"
          value={optionsText}
          onChange={(e) => setConstructorField('optionsText', e.target.value)}
          placeholder="например: опция 1, опция 2"
          className={styles.input}
        />
      )}
      {fields.length === 0 ? (
        <p className={styles.hint}>
          Пожалуйста, добавьте поле, прежде чем задавать условие отображения.
        </p>
      ) : (
        <>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={hasCondition}
              onChange={(e) =>
                setConstructorField('hasCondition', e.target.checked)
              }
            />
            Показывается по условию
          </label>
          {hasCondition && (
            <>
              <LabeledSelect
                label="Поле для проверки условия"
                value={conditionFieldId}
                onChange={(e) =>
                  setConstructorField('conditionFieldId', e.target.value)
                }
                options={[
                  ...fields.map((field) => ({
                    label: field.label || field.id,
                    value: field.id,
                  })),
                ]}
                className={styles.input}
              />
              <LabeledInput
                label="Значение для проверки"
                value={conditionValue}
                onChange={(e) =>
                  setConstructorField('conditionValue', e.target.value)
                }
                placeholder="опция 1"
                className={styles.input}
              />
            </>
          )}
        </>
      )}
      <button
        onClick={addField}
        disabled={
          !label.trim() ||
          (['select', 'checkbox'].includes(type) && !optionsText.trim())
        }
        className={styles.button}
      >
        Добавить
      </button>
    </div>
  );
};


