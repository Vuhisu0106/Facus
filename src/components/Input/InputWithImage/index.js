import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from '~/components/Input/Input.module.scss';
import Input from '..';
import CircleButton from '~/components/Button/CircleButton';

const cx = classNames.bind(styles);
function InputWithImage({ id, onKeyPressFunc }) {
    const [commentImg, setCommentImg] = useState(null);

    return (
        <div className={cx('comment-input-area')} id={id}>
            <Input
                className={cx('comment-input')}
                //value={value}
                type="text"
                placeHolder={'Write comment here...'}
                //inputRef={commentInputRef}
                onClickInputRight={() => {
                    //console.log(id);
                }}
                rightIcon={<FontAwesomeIcon icon={faCamera} />}
                //onChange={handleCommentInput}
                rightBtnTypeFile
                onChangeRightBtn={(e) => {
                    setCommentImg(e.target.files[0], id);
                    //console.log('postId: ' + id + ' - ' + URL.createObjectURL(e.target.files[0]));
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onKeyPressFunc();
                    }
                }}
                idRightBtn={id}
            />
            {commentImg && (
                <div className={cx('image-sending-comment')}>
                    <img
                        id={id}
                        className={cx('select-photo')}
                        src={commentImg && URL.createObjectURL(commentImg)}
                        alt="img"
                    />
                    <CircleButton
                        className={cx('cancel-photo-btn')}
                        children={<FontAwesomeIcon icon={faXmark} />}
                        onClick={() => {
                            setCommentImg(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default InputWithImage;
