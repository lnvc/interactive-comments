import React from 'react';
import Image from 'next/image';

import styles from './Card.module.scss';

import { Comment } from '../../utils/interfaces';

interface ICard {
  comment: Comment
}

const Card = ({ comment }: ICard) => {
  return (
    <div className={styles.container}>
      {/* user info */}
      <div className={styles.userInfo}>
        <Image src="/avatars/image-amyrobson.png" height={30} width={30} />
        <span className={styles.username}>username</span>
        <span>1 month ago</span>
      </div>

      {/* comment */}
      <p>
        {comment.content}
      </p>

      <div className={styles.mobileLayout}>
        {/* score */}
        <div className={styles.scoreContainer}>
          <div className={styles.icon}>
            <img src="/icon-plus.svg" />
          </div>
          <span className={styles.score}>
            { comment.upvotes - comment.downvotes }
          </span>
          <div className={styles.icon}>
            <img src="/icon-minus.svg" />
          </div>
        </div>

        {/* reply button */}
        <div className={styles.reply}>
          <div>
            <img src="/icon-reply.svg" />
          </div>
          <span>Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
