import Image from 'next/image';
import React from 'react';

import styles from './ReplyCard.module.scss';

const ReplyCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.image}>
          <Image src="/avatars/image-amyrobson.png" height={30} width={30} />
        </div>
        <textarea className={styles.text} placeholder="Add a comment..." />
        <div className={styles.submit}>
          <input type="submit" value="send" />
        </div>
      </div>
    </div>
  );
};

export default ReplyCard;
