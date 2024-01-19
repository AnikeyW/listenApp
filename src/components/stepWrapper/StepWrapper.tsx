import React from 'react';
import styles from './stepWrapper.module.scss';
import Stepper from '@/components/UI/Stepper/Stepper';

interface IStepWrapperProps {
  currentStep: number;
  steps: string[];
  children: React.ReactNode;
}

const StepWrapper: React.FC<IStepWrapperProps> = ({
  currentStep,
  children,
  steps,
}) => {
  return (
    <>
      <div className={styles.stepper}>
        <Stepper steps={steps} currentStep={currentStep} />
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default StepWrapper;
