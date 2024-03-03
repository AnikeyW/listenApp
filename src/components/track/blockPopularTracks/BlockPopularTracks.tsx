'use client';
import React from 'react';
import styles from './BlockPopularTracks.module.scss';
import Block from '@/components/UI/block/Block';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import TrackItem from '@/components/track/trackitem/TrackItem';
import { useGetAllTracks } from '@/hooks/track/useGetAllTracks';
import EmptyBlock from '@/components/UI/emptyBlock/EmptyBlock';

const BlockPopularTracks = () => {
  const popularTracks = useGetAllTracks();

  return (
    <Block title={'Полулярные треки'} linkHref={'tracks'}>
      {popularTracks.isSuccess && (
        <>
          {popularTracks.data.length === 0 && (
            <EmptyBlock
              text={'Нет загруженных треков'}
              href={'/tracks/create'}
            />
          )}
          <HorizontalCarusel key={'tracks'}>
            {new Array(Math.ceil(popularTracks.data.length / 3))
              .fill(0)
              .map((_, index) => (
                <HorizontalCaruselItem key={index}>
                  {popularTracks.data
                    .slice(index * 3, index * 3 + 3)
                    .map((track, i) => (
                      <TrackItem
                        key={track._id}
                        track={track}
                        indexOfTrack={3 * index + i}
                        playlist={popularTracks.data}
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

export default BlockPopularTracks;
