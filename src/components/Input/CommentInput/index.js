import { faCamera, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { MOBILE, useViewport } from '~/components/Hook';
import styles from '~/components/Input/Input.module.scss';
import Input from '..';
import ImageInputArea from '../ImageInputArea';

const cx = classNames.bind(styles);
function CommentInput({
    commentValue,
    commentInputRef,
    handleCommentInput,
    handleAddComment,
    commentImg,
    onChangeImage,
    cancelImage,
    loading,
}) {
    const { viewport } = useViewport();

    return (
        <div className={cx('comment-input-area')}>
            {viewport.device === MOBILE ? (
                <Input
                    className={cx('comment-input')}
                    value={commentValue}
                    type="text"
                    placeHolder={'Write comment here...'}
                    inputRef={commentInputRef}
                    onChange={handleCommentInput}
                    leftIcon={<FontAwesomeIcon icon={faCamera} />}
                    leftBtnTypeFile
                    onChangeLeftBtn={onChangeImage}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    onClickRightBtn={() => {
                        handleAddComment();
                    }}
                    loading={loading}
                />
            ) : (
                <Input
                    className={cx('comment-input')}
                    value={commentValue}
                    type="text"
                    placeHolder={'Write comment here...'}
                    //only right icon (add image) in deskop
                    inputRef={commentInputRef}
                    rightIcon={<FontAwesomeIcon icon={faCamera} />}
                    rightBtnTypeFile
                    onChange={handleCommentInput}
                    onChangeRightBtn={onChangeImage}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddComment();
                        }
                    }}
                    loading={loading}
                />
            )}
            {commentImg && <ImageInputArea src={URL.createObjectURL(commentImg)} onClickCancel={cancelImage} />}
        </div>
    );
}

export default CommentInput;
