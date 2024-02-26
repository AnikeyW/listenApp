import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from '@/app/tracks/create/page.module.scss';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { CreateTrackDtoType } from '@/types/track';
import { useTrackStore } from '@/stores/trackStore';
import { useAuthStore } from '@/stores/authStore';

interface Props {
  currentStep: number;
  steps: string[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
  mutate: (data: CreateTrackDtoType) => void;
}

const CreateTrackButtons: FC<Props> = ({
  currentStep,
  steps,
  setCurrentStep,
  mutate,
}) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const name = useTrackStore((state) => state.name);
  const artist = useTrackStore((state) => state.artist);
  const text = useTrackStore((state) => state.text);
  const albumId = useTrackStore((state) => state.albumId);
  const picture = useTrackStore((state) => state.picture);
  const audioFile = useTrackStore((state) => state.audioFile);
  const validateStepOne = useTrackStore((state) => state.validateStepOne);
  const validateStepTwo = useTrackStore((state) => state.validateStepTwo);
  const validateStepThree = useTrackStore((state) => state.validateStepThree);

  async function createTrackAndRedirect() {
    const data = {
      name: name.value,
      artist: artist.value,
      text: text.value,
      albumId: albumId,
      picture: picture.img,
      audio: audioFile.value,
      owner: user?._id!,
    };
    await mutate(data);
    await router.push('/tracks');
  }

  const next = () => {
    if (currentStep === 1 && !validateStepOne()) return;
    if (currentStep === 2 && !validateStepTwo()) return;
    if (currentStep === 3 && !validateStepThree()) return;
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      createTrackAndRedirect();
    }
  };

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className={styles.root__btns}>
      <Button disabled={currentStep === 1} onClick={back}>
        Назад
      </Button>
      <Button onClick={next}>
        {currentStep !== steps.length ? 'Далее' : 'Загрузить'}
      </Button>
    </div>
  );
};

export default CreateTrackButtons;
