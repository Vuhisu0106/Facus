import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import store from '~/app/store';
import { setCoverPhotoURL, setPhotoAndCoverPhoto, setPhotoURL } from '~/features/Profile/ProfileSlice';
import { storage } from '~/firebase/config';
import { updateDocument } from '~/firebase/services';
import resizeFiles from './common/resizeFiles';

export const setProfilePhoto = async (currentUser, avatar, coverPhoto, isAvatarChange, iscoverPhotoChange) => {
    const { resizeFile } = resizeFiles();
    const date = new Date().getTime();

    const setCoverPhotoFunction = async () => {
        const storageRef = ref(storage, `${'coverPhotoURL' + currentUser.uid + date}`);
        await uploadBytesResumable(storageRef, coverPhoto).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('users', currentUser.uid, {
                    coverPhotoURL: downloadURL,
                });
            });
        });
    };

    const setAvatarFunction = async (currentUser, avatar) => {
        const storageRef = ref(storage, `${'photoURL' + currentUser.uid + date}`);
        const uri = await resizeFile(avatar);
        await uploadString(storageRef, uri, 'data_url').then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDocument('users', currentUser.uid, {
                    photoURL: downloadURL,
                });
            });
        });
    };

    if (isAvatarChange && !iscoverPhotoChange) {
        //only avatar
        await setAvatarFunction(currentUser, avatar);
        store.dispatch(setPhotoURL({ photoURL: avatar }));
    } else if (!isAvatarChange && iscoverPhotoChange) {
        //only cover photo
        await setCoverPhotoFunction(currentUser, coverPhoto);
        store.dispatch(setCoverPhotoURL({ coverPhotoURL: coverPhoto }));
    } else if (isAvatarChange && iscoverPhotoChange) {
        //both
        await setAvatarFunction(currentUser, avatar);
        await setCoverPhotoFunction(currentUser, coverPhoto);
        store.dispatch(setPhotoAndCoverPhoto({ photoURL: avatar, coverPhotoURL: coverPhoto }));
    } else {
        return;
    }
};
