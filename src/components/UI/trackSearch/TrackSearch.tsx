'use client';
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import Input from '@/components/UI/Input/Input';

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TrackSearch: FC<Props> = ({ search, setSearch }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Input
      placeholder={'Поиск треков'}
      onChange={changeHandler}
      value={search}
    />
  );
};

export default TrackSearch;
