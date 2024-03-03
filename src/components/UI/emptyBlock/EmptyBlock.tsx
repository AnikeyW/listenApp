import React, { FC } from 'react';
import styles from './EmptyBlock.module.scss';
import MyLink from '@/components/UI/myLink/MyLink';

interface Props {
  text: string;
  href: string;
}

const EmptyBlock: FC<Props> = ({ text, href }) => {
  return (
    <div className={styles.root}>
      <p>{text}</p>
      <MyLink href={href}>Загрузить</MyLink>
    </div>
  );
};

export default EmptyBlock;
