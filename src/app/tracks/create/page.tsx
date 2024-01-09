'use client';
import React, { useRef, useState } from 'react';
import StepWrapper from '@/components/stepWrapper/StepWrapper';
import FileUpload from '@/components/fileUploud/FileUpload';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Input from '@/components/UI/Input/Input';
import TextArea from '@/components/UI/TextArea/TextArea';

interface IFormDataStep1 {
  name: string;
  artist: string;
  text: string;
}

const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [picture, setPicture] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [formDataStep1, setFormDataStep1] = useState<IFormDataStep1>({
    name: '',
    artist: '',
    text: '',
  });
  const { handleSubmit, control } = useForm();
  const submitForm1 = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const steps = [
    'Информация о треке',
    'Загрузка изображения',
    'Загрузка аудио',
  ];

  const next = () => {
    if (currentStep === 1) {
      submitForm1.current?.click();
    }
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', formDataStep1.name);
      formData.append('artist', formDataStep1.artist);
      formData.append('text', formDataStep1.text);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios
        .post(process.env.NEXT_PUBLIC_BASE_URL + 'tracks', formData)
        .then((res) => router.push('/tracks'))
        .catch((e) => console.log(e));
    }
  };

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStep1 = (data: any) => {
    setFormDataStep1(data);
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.root__title}>Загрузка нового трека</h2>
      <div className={styles.root__content}>
        <StepWrapper currentStep={currentStep} steps={steps}>
          {currentStep === 1 && (
            <form onSubmit={handleSubmit(handleStep1)} className={styles.form}>
              <div className={styles.form__input}>
                <label htmlFor="name">Название трека: </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input {...field} type="text" />}
                />
              </div>
              <div className={styles.form__input}>
                <label htmlFor="artist">Имя исполнителя: </label>
                <Controller
                  name="artist"
                  control={control}
                  render={({ field }) => <Input {...field} type="text" />}
                />
              </div>
              <div className={styles.form__input}>
                <label htmlFor="text">Слова к треку</label>
                <Controller
                  name="text"
                  control={control}
                  render={({ field }) => <TextArea {...field} rows={4} />}
                />
              </div>
              <input
                type="submit"
                style={{ display: 'none' }}
                ref={submitForm1}
              />
            </form>
          )}
          {currentStep === 2 && (
            <FileUpload setFile={setPicture} accept={'image/*'}>
              <button>Загрузить изображение</button>
            </FileUpload>
          )}
          {currentStep === 3 && (
            <FileUpload setFile={setAudio} accept={'audio/*'}>
              <button>Загрузить аудио</button>
            </FileUpload>
          )}
        </StepWrapper>
      </div>

      <div className={styles.root__btns}>
        <button disabled={currentStep === 1} onClick={back}>
          Назад
        </button>
        <button onClick={next}>
          {currentStep !== steps.length ? 'Вперед' : 'Загрузить'}
        </button>
      </div>
    </div>
  );
};

export default Page;
