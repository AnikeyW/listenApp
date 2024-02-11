'use client';
import React, { useState } from 'react';
import StepWrapper from '@/components/UI/Stepper/stepWrapper/StepWrapper';
import styles from './page.module.scss';
import CreateAlbumStepOne from '@/components/album/createAlbumStepOne/CreateAlbumStepOne';
import PreviewNewAlbum from '@/components/album/previewNewAlbum/PreviewNewAlbum';
import CreateAlbumStepTwo from '@/components/album/createAlbumStepTwo/CreateAlbumStepTwo';
import albumService from '@/services/Album.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CreateAlbumsButtons from '@/components/album/createAlbumsButtons/CreateAlbumsButtons';
import Loader from '@/components/UI/Loader/Loader';
import { useAlbumStore } from '@/stores/albumStore';
import { CreateAlbumDtoType } from '@/types/album';

const steps = ['Информация об альбоме', 'Загрузка изображения'];

const Page = () => {
  const queryCleint = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const resetAllFields = useAlbumStore((state) => state.resetAllFields);

  const { isPending, mutate } = useMutation({
    mutationKey: ['createAlbum'],
    mutationFn: (data: CreateAlbumDtoType) => albumService.create(data),
    onSuccess: () => {
      // queryCleint.invalidateQueries({ queryKey: ['albums'] });
      queryCleint.fetchQuery({ queryKey: ['albums'] });
      resetAllFields();
    },
  });

  return (
    <div className={styles.root}>
      {!isPending ? (
        <>
          <h2 className={styles.root__title}>Загрузка нового Альбома</h2>
          <div className={styles.root__content}>
            <StepWrapper currentStep={currentStep} steps={steps}>
              <PreviewNewAlbum step={currentStep} />
              <div style={{ flex: 1 }}>
                {currentStep === 1 && <CreateAlbumStepOne />}
                {currentStep === 2 && <CreateAlbumStepTwo />}
              </div>
            </StepWrapper>
          </div>
          <CreateAlbumsButtons
            steps={steps}
            currentStep={currentStep}
            mutate={mutate}
            setCurrentStep={setCurrentStep}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Page;
