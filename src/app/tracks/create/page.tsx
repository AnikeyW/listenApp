'use client';
import React, { useState } from 'react';
import StepWrapper from '@/components/UI/Stepper/stepWrapper/StepWrapper';
import styles from './page.module.scss';
import PreviewNewTrack from '@/components/track/previewNewTrack/PreviewNewTrack';
import CreateTrackFormStepOne from '@/components/track/createTrackFormStepOne/CreateTrackFormStepOne';
import CreateTrackFormStepTwo from '@/components/track/createTrackFormStepTwo/CreateTrackFormStepTwo';
import CreateTrackFormStepThree from '@/components/track/createTrackFormStepThree/CreateTrackFormStepThree';
import CreateTrackButtons from '@/components/track/createTrackButtons/CreateTrackButtons';
import { useMutation } from '@tanstack/react-query';
import trackService from '@/services/Track.service';
import { CreateTrackDtoType } from '@/types/track';

const steps = ['Информация о треке', 'Загрузка изображения', 'Загрузка аудио'];

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const createTrackMutation = useMutation({
    mutationKey: ['createTrack'],
    mutationFn: (data: CreateTrackDtoType) => trackService.create(data),
    onSuccess: () => {},
  });

  return (
    <div className={styles.root}>
      {!createTrackMutation.isPending ? (
        <>
          <h2 className={styles.root__title}>Загрузка нового трека</h2>
          <div className={styles.root__content}>
            <StepWrapper currentStep={currentStep} steps={steps}>
              <PreviewNewTrack step={currentStep} />
              <div style={{ flex: 1 }}>
                {currentStep === 1 && <CreateTrackFormStepOne />}
                {currentStep === 2 && <CreateTrackFormStepTwo />}
                {currentStep === 3 && <CreateTrackFormStepThree />}
              </div>
            </StepWrapper>
          </div>

          <CreateTrackButtons
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            mutate={createTrackMutation.mutate}
          />
        </>
      ) : (
        <div className={styles.root__loading}>LOADING....</div>
      )}
    </div>
  );
};

export default Page;
