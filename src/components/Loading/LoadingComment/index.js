function LoadingComment() {
    return (
        <div className={cx('comment-element')} key={data.commentId}>
            <CircleAvatar userName={commenterInfo.displayName} avatar={commenterInfo.photoURL} diameter="32px" />
            {isEditComment ? (
                <div className={cx('edit-comment-content')}>{editCommentJSX()}</div>
            ) : (
                <div className={cx('comment-element-content')}>
                    <div className={cx('comment-content-n-setting')}>
                        <div
                            className={cx(
                                'comment-content-wrapper',
                                !data?.content && data?.img ? 'no-text-wrapper' : '',
                            )}
                        >
                            <div className={cx('comment-user-name')}>{commenterInfo.displayName}</div>
                            <div className={cx('comment-content')}>{data?.content}</div>

                            {/* Use data from rendering in this component (not from props of parents component) must check if they exist or not */}
                            {!data.img && data.like && data.like.length > 0 && (
                                <div className={cx('reaction-cmt')}>
                                    <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                                    {data && data.like.length > 1 && (
                                        <div className={cx('reaction-cmt-count')}>{data && data.like.length}</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {data.commenter.uid === currentUser.uid && (
                            <Menu
                                items={MENU_COMMENT}
                                placement={'bottom-start'}
                                isMenuVisible={isModalVisible}
                                onClickOutside={() => {
                                    setIsModalVisible(false);
                                }}
                            >
                                <div
                                    className={cx('comment-setting')}
                                    onClick={() => {
                                        setIsModalVisible(!isModalVisible);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </Menu>
                        )}
                    </div>

                    {data?.img && (
                        <div className={cx('comment-img-n-reaction')}>
                            <img
                                className={cx('comment-image')}
                                src={typeof data?.img === 'object' ? URL.createObjectURL(data?.img) : data?.img}
                                alt=""
                            />
                            {data.like && data.like.length > 0 && (
                                <div className={cx('reaction-image-cmt')}>
                                    <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                                    {data && data.like.length > 1 && (
                                        <div className={cx('reaction-cmt-count')}>{data && data.like.length}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={cx('comment-interact')}>
                        <button
                            className={cx('like-comment-btn')}
                            style={{
                                color: data.like && data.like.indexOf(currentUser.uid) !== -1 && '#fe2c55',
                            }}
                            onClick={() => handleLikeComment(data.commentId)}
                        >
                            Like
                        </button>
                        <button
                            className={cx('reply-comment-btn')}
                            onClick={() => {
                                console.log(data);
                            }}
                        >
                            Reply
                        </button>
                        <span>{data.createdAt && moment(data.createdAt).fromNow()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoadingComment;
