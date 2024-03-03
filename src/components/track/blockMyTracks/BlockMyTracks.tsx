'use client';
import React from 'react';
import styles from './BlockMyTracks.module.scss';
import Block from '@/components/UI/block/Block';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import TrackItem from '@/components/track/trackitem/TrackItem';
import { useGetMyTracks } from '@/hooks/track/useGetMyTracks';
import EmptyBlock from '@/components/UI/emptyBlock/EmptyBlock';

const BlockMyTracks = () => {
  const myTracks = useGetMyTracks();

  return (
    <Block title={'Мои треки'} linkHref={'mytracks'}>
      {myTracks.isSuccess && (
        <>
          {myTracks.data.length === 0 && (
            <EmptyBlock
              text={'Нет загруженных треков'}
              href={'/tracks/create'}
            />
          )}
          <HorizontalCarusel
            key={'tracks'}
            itemsLength={
              new Array(Math.ceil(myTracks.data.length / 3)).fill(0).length
            }
          >
            {new Array(Math.ceil(myTracks.data.length / 3))
              .fill(0)
              .map((_, index) => (
                <HorizontalCaruselItem key={index}>
                  {myTracks.data
                    .slice(index * 3, index * 3 + 3)
                    .map((track, i) => (
                      <TrackItem
                        key={track._id}
                        track={track}
                        indexOfTrack={3 * index + i}
                        playlist={myTracks.data}
                      />
                    ))}
                </HorizontalCaruselItem>
              ))}
          </HorizontalCarusel>
        </>
      )}
    </Block>
  );
};

export default BlockMyTracks;
