'use client';
import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import styles from './Stepper.module.scss';

interface IStepperProps {
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<IStepperProps> = ({ currentStep, steps = [] }) => {
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (currentStep === steps.length) {
      setComplete(true);
    }
  }, []);
  return (
    <>
      <div className={styles.stepper}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.stepper__item} ${
              currentStep === index + 1 && styles.active
            } ${(index + 1 < currentStep || complete) && styles.complete}`}
          >
            <div className={styles.stepper__step}>
              {index + 1 < currentStep || complete ? (
                <HiCheck color={'white'} />
              ) : (
                index + 1
              )}
            </div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
