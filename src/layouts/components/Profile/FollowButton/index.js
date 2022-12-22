import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import { useApp } from '~/context/AppContext';

function FollowButton({ params, handleUnfollow, handleFollow }) {
    const { currentUserInfo } = useApp();
    return (
        <>
            {currentUserInfo?.following?.indexOf(params.id) > -1 ? (
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faUserMinus} />}
                    children={'Unfollow'}
                    onClick={() => {
                        handleUnfollow();
                    }}
                />
            ) : (
                <Button
                    primary
                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                    children={'Follow'}
                    onClick={() => {
                        handleFollow();
                    }}
                />
            )}
        </>
    );
}

export default FollowButton;
