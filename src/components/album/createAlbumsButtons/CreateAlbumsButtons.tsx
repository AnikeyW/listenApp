import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './CreateAlbumsButtons.module.scss';
import Button from '@/components/UI/Button/Button';
import { useRouter } from 'next/navigation';
import { useAlbumStore } from '@/stores/albumStore';
import { CreateAlbumDtoType } from '@/types/album';

interface Props {
  currentStep: number;
  steps: string[];
  setCurrentStep: Dispatch<SetStateAction<number>>;
  mutate: (data: CreateAlbumDtoType) => void;
}

const CreateAlbumsButtons: FC<Props> = ({
  steps,
  currentStep,
  setCurrentStep,
  mutate,
}) => {
  const validateStepOne = useAlbumStore((state) => state.validateStepOne);
  const validateStepTwo = useAlbumStore((state) => state.validateStepTwo);
  const name = useAlbumStore((state) => state.name);
  const author = useAlbumStore((state) => state.author);
  const picture = useAlbumStore((state) => state.picture);

  const router = useRouter();

  async function createAlbumAndRedirect() {
    const data = {
      name: name.value,
      author: author.value,
      picture: picture.img,
    };
    mutate(data);
    router.push('/myalbums');
  }

  const next = () => {
    if (currentStep === 1 && !validateStepOne()) return;
    if (currentStep === 2 && !validateStepTwo()) return;
    if (currentStep !== steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      createAlbumAndRedirect();
    }
  };

  const back = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className={styles.root}>
      <Button disabled={currentStep === 1} onClick={back}>
        Назад
      </Button>
      <Button onClick={next}>
        {currentStep !== steps.length ? 'Далее' : 'Загрузить'}
      </Button>
    </div>
  );
};

export default CreateAlbumsButtons;
