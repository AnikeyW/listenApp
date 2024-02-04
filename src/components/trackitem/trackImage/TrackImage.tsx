import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent,
  Ref,
  useEffect,
  useImperativeHandle,
} from 'react';
import Image from 'next/image';
import styles from './TrackImage.module.scss';
import { MdPlayArrow } from 'react-icons/md';
import animateIcon from '@/assets/sound.gif';
import { ITrack } from '@/types/track';
import { usePlayerStore } from '@/stores/playerStore';
import { audio, initAudio } from '@/components/tracklist/TrackList';

interface TrackImageProps {
  pauseLocal: boolean;
  track: ITrack;
  setPauseLocal: (value: boolean) => void;
}

export interface RefType {
  clickItemHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

const TrackImage: ForwardRefRenderFunction<RefType, TrackImageProps> = (
  { track, pauseLocal, setPauseLocal },
  ref: Ref<RefType>,
) => {
  const pause = usePlayerStore((state) => state.pause);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const pauseTrack = usePlayerStore((state) => state.pauseTrack);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const setActiveTrack = usePlayerStore((state) => state.setActiveTrack);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const volume = usePlayerStore((state) => state.volume);
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );

  const clickItemHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (activeTrack && activeTrack?.id === track.id) {
      setIsShowPlayerFullScreen(true);
    } else {
      playHandler(e);
    }
  };

  useImperativeHandle(ref, () => ({
    clickItemHandler,
  }));

  const setInitAudio = () => {
    if (activeTrack && !pauseLocal) {
      audio.src = process.env.NEXT_PUBLIC_BASE_URL + activeTrack.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        audio.play();
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const playHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (activeTrack?.id === track.id) {
      audio.play();
      playTrack();
      setPauseLocal(false);
      return;
    }
    setActiveTrack(track);
    setInitAudio();
    playTrack();
    setPauseLocal(false);
  };

  const pauseHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    pauseTrack();
    setPauseLocal(true);
    audio.pause();
  };

  useEffect(() => {
    if (!audio) {
      initAudio();
    } else {
      if (activeTrack) {
        setPauseLocal(false);
      }
      setInitAudio();
    }
  }, [activeTrack]);

  useEffect(() => {
    if (activeTrack?.id === track.id) {
      if (pause) {
        setPauseLocal(true);
      } else {
        setPauseLocal(false);
      }
    }
  }, [pause, activeTrack]);

  return (
    <div className={styles.root}>
      <Image
        src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
        alt={track.name}
        width={50}
        height={50}
        onClick={playHandler}
      />
      {pause && pauseLocal && activeTrack?.id === track.id && (
        <div className={styles.root__gif}>
          <MdPlayArrow size={40} onClick={playHandler} />
        </div>
      )}
      {!pause && !pauseLocal && activeTrack?.id === track.id && (
        <div className={styles.root__gif}>
          <Image
            src={animateIcon}
            alt={'playing icon'}
            width={50}
            height={50}
            onClick={pauseHandler}
          />
        </div>
      )}
    </div>
  );
};

export default forwardRef(TrackImage);
