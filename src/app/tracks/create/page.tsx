'use client';
import React, { useRef, useState } from 'react';
import StepWrapper from '@/components/stepWrapper/StepWrapper';
import FileUpload from '@/components/fileUploud/FileUpload';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Input from '@/components/UI/Input/Input';
import { usePlayerStore } from '@/stores/playerStore';
import Button from '@/components/UI/Button/Button';
import { RiImageAddLine } from 'react-icons/ri';
import Image from 'next/image';
import addAudioIcon from '@/assets/add-audio.png';
import PreviewNewTrack from '@/components/previewNewTrack/PreviewNewTrack';

export interface IFormDataStep1 {
  name: string;
  artist: string;
  text: string;
}

const Page = () => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const [currentStep, setCurrentStep] = useState(1);
  const [picture, setPicture] = useState<any>(null);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>('');
  const [audio, setAudio] = useState<any>(null);
  const [formDataStep1, setFormDataStep1] = useState<IFormDataStep1>({
    name: '',
    artist: '',
    text: '',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      artist: '',
      text: '',
    },
    mode: 'all',
  });
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
      if (
        errors?.artist ||
        errors?.name ||
        formDataStep1.name === '' ||
        formDataStep1.artist === ''
      )
        return;
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

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture(e.target.files[0]);
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === 'string') {
          setImagePreviewSrc(img.result);
        }
      };
      img.readAsDataURL(e.target.files[0]);
    }
  };

  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio(e.target.files[0]);
    }
  };

  return (
    <div
      className={`${styles.root} ${activeTrack ? styles.withActiveTrack : ''}`}
    >
      <h2 className={styles.root__title}>Загрузка нового трека</h2>
      <div className={styles.root__content}>
        <StepWrapper currentStep={currentStep} steps={steps}>
          {currentStep === 1 && (
            <>
              <PreviewNewTrack
                picture={picture}
                formDataStep1={formDataStep1}
                imagePreviewSrc={imagePreviewSrc}
              />
              <form
                onSubmit={handleSubmit(handleStep1)}
                className={styles.form}
              >
                <div className={styles.form__input}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={'Название трека'}
                      />
                    )}
                  />
                  {errors?.name && (
                    <p style={{ color: 'coral' }}>Обязательное поле</p>
                  )}
                </div>
                <div className={styles.form__input}>
                  <Controller
                    name="artist"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={'Имя исполнителя'}
                      />
                    )}
                  />
                  {errors?.artist && (
                    <p style={{ color: 'coral' }}>Обязательное поле</p>
                  )}
                </div>
                <input
                  type="submit"
                  style={{ display: 'none' }}
                  ref={submitForm1}
                  onClick={handleSubmit(handleStep1)}
                />
              </form>
            </>
          )}
          {currentStep === 2 && (
            <>
              <PreviewNewTrack
                picture={picture}
                formDataStep1={formDataStep1}
                imagePreviewSrc={imagePreviewSrc}
              />
              <div style={{ flex: 1 }}>
                <FileUpload setFile={onChangePicture} accept={'image/*'}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      border: '2px dotted teal',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                    }}
                  >
                    <RiImageAddLine size={100} />
                  </div>
                </FileUpload>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <PreviewNewTrack
                picture={picture}
                formDataStep1={formDataStep1}
                imagePreviewSrc={imagePreviewSrc}
              />
              <div style={{ flex: 1 }}>
                <FileUpload setFile={onChangeAudio} accept={'audio/*'}>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      border: '2px dotted teal',
                      justifyContent: 'center',
                      borderRadius: '1rem',
                    }}
                  >
                    <Image
                      src={addAudioIcon}
                      alt={''}
                      width={100}
                      height={100}
                    />
                  </div>
                </FileUpload>
              </div>
            </>
          )}
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
    </div>
  );
};

export default Page;
