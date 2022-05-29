import React, { useState } from 'react';
import Image from 'next/image';

import styles from './Card.module.scss';

import { Comment } from '../../utils/interfaces';
import { useIsElementActive } from '../../libs/hooks/UseIsElementActive';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { DELETE_COMMENT } from '../../libs/gql/mutations';
import { HEADERS, USER_HEADER } from '../../utils/constants';
import Modal from '../Modal';

interface ICard {
  comment: Comment
}

const Card = ({ comment }: ICard) => {
  const [content, setContent] = useState<string>(comment.content);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const userId = useSelector((state: any) => state.user.uid as string);
  const id = useSelector((state: any) => state.user.id as number);
  const isReplyActive = useIsElementActive(comment.id, 'reply');
  const isEditActive = useIsElementActive(comment.id, 'edit');
  const isDeleteActive = useIsElementActive(comment.id, 'delete');

  const [deleteComment] = useMutation(DELETE_COMMENT);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteModal = () => {
    setIsDelete(true);
  };

  const handleCancel = () => {
    setIsDelete(false);
  };

  const handleDelete = () => {
    deleteComment({
      variables: {
        id: comment.id,
      },
      context: {
        headers: {
          ...HEADERS,
          ...USER_HEADER,
          "x-hasura-user-id": id,
        },
      },
    });
    handleCancel();
  };

  return (
    <div className={comment.reply_to ? styles.rootReply : styles.root}>
      {
        isDelete &&
        <Modal
          title="Delete comment"
          message="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
          cancel="no, cancel"
          confirm="yes, delete"
          handleCancel={handleCancel}
          handleDelete={handleDelete}
        />
      }
      {comment.reply_to && <div className={styles.line}></div>}
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* user info */}
            <div className={styles.userInfo}>
              <Image src="/avatars/image-amyrobson.png" height={30} width={30} />
              <span className={styles.username}>{comment.user.username}</span>
              {id && id === comment.user.id && <span className={styles.you}>you</span>}
              <span>1 month ago</span>
            </div>

            {/* comment */}
          {
            isEdit ? (
              <textarea className={styles.input} name="input" id="input" value={comment.content} />
            ) : (
              <p className={styles.comment}>
                {comment.content}
              </p>
            )
          }

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

            {/* reply, edit, and delete buttons */}
            <div className={styles.buttons}>
            {
              userId ? (
                  userId !== comment.user.name ? (
                    <div
                      className={styles.replyOrEdit}
                      id={`reply ${comment.id.toString()}`}
                    >
                      <img src={isReplyActive ? "/icon-reply-active.svg" : "/icon-reply.svg"} />
                      <span>Reply</span>
                    </div>
                ) : (
                  <div className={styles.edit}>
                    <div
                      className={styles.delete}
                      id={`delete ${comment.id.toString()}`}
                      onClick={handleDeleteModal}
                    >
                      <img src={isDeleteActive ? "/icon-delete-active.svg" : "/icon-delete.svg"} />
                      <span>Delete</span>
                    </div>
                    <div
                      className={styles.replyOrEdit}
                      id={`edit ${comment.id.toString()}`}
                      onClick={handleEdit}
                    >
                      <img src={isEditActive ? "/icon-edit-active.svg" : "/icon-edit.svg"} />
                      <span>Edit</span>
                    </div>
                  </div>
                )
              ) : null
            }
            </div>
          </div>
        </div>
    </div>
  );
};

export default Card;
