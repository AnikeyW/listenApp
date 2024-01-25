'use client';
import React, { useState } from 'react';
import StepWrapper from '@/components/stepWrapper/StepWrapper';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import { usePlayerStore } from '@/stores/playerStore';
import Button from '@/components/UI/Button/Button';
import PreviewNewTrack from '@/components/previewNewTrack/PreviewNewTrack';
import CreateTrackFormStepOne from '@/components/createTrackFormStepOne/CreateTrackFormStepOne';
import { useCreateTrackStore } from '@/stores/createTrackStore';
import CreateTrackFormStepTwo from '@/components/createTrackFormStepTwo/CreateTrackFormStepTwo';
import CreateTrackFormStepThree from '@/components/createTrackFormStepThree/CreateTrackFormStepThree';

const steps = ['Информация о треке', 'Загрузка изображения', 'Загрузка аудио'];

const Page = () => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const [currentStep, setCurrentStep] = useState(1);
  const validateStepOne = useCreateTrackStore((state) => state.validateStepOne);
  const validateStepTwo = useCreateTrackStore((state) => state.validateStepTwo);
  const validateStepThree = useCreateTrackStore(
    (state) => state.validateStepThree,
  );
  const createTrack = useCreateTrackStore((state) => state.createTrack);
  const isLoading = useCreateTrackStore((state) => state.isLoading);
  const router = useRouter();

  const next = () => {
    if (currentStep === 1 && !validateStepOne()) return;
    if (currentStep === 2 && !validateStepTwo()) return;
    if (currentStep === 3 && !validateStepThree()) return;
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      createTrackFndReturn();
    }
  };

  async function createTrackFndReturn() {
    await createTrack();
    await router.push('/tracks');
  }

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div
      className={`${styles.root} ${activeTrack ? styles.withActiveTrack : ''}`}
    >
      {!isLoading ? (
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

          <div className={styles.root__btns}>
            <Button disabled={currentStep === 1} onClick={back}>
              Назад
            </Button>
            <Button onClick={next}>
              {currentStep !== steps.length ? 'Далее' : 'Загрузить'}
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.root__loading}>LOADING....</div>
      )}
    </div>
  );
};

export default Page;
