import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { collection, query, where, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';

import { useApp } from '~/context/AppContext';
import { useChat } from '~/context/ChatContext';
import { useAuth } from '~/context/AuthContext';
import { db } from '~/firebase/firebase';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Input from '~/components/Input';
import styles from '~/components/Search/Search.module.scss';
import { useDebounce } from '~/components/Hook';
import { setDocument, updateDocument } from '~/firebase/services';

const cx = classNames.bind(styles);
function ChatSearch({ className, placeHolder, placement, autoFocus }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { clearState, checkDark } = useApp();
    const { currentUser } = useAuth();
    const { dispatch } = useChat();

    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef();

    const handleClearSearch = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    //Show users acording to search value
    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        const handleSearch = async () => {
            const q = query(collection(db, 'users'), where('keywords', 'array-contains', searchValue));

            try {
                const querySnapshot = await getDocs(q);
                setSearchResult(querySnapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        handleSearch();
    }, [debounce]);

    const handleSearchInput = (e) => {
        const searchValueInput = e.target.value;

        if (!searchValueInput.startsWith(' ')) {
            setSearchValue(searchValueInput);
        } else {
            return;
        }
    };

    const handleSelect = async (result) => {
        const combinedId = currentUser.uid > result.uid ? currentUser.uid + result.uid : result.uid + currentUser.uid;
        //console.log(combinedId);
        try {
            const res = await getDoc(doc(db, 'chats', combinedId));
            //console.log(res);
            if (!res.exists()) {
                //create a chat in chats collection (if chat hasn't existed before)
                await setDocument('chats', combinedId, { messages: [] });

                //create user chats
                await updateDocument('userChats', currentUser.uid, {
                    [combinedId + '.userChatId']: combinedId,
                    [combinedId + '.userInfo']: {
                        uid: result.uid,
                        displayName: result.displayName,
                        photoURL: result.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });

                await updateDocument('userChats', result.uid, {
                    [combinedId + '.userChatId']: combinedId,
                    [combinedId + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + '.date']: serverTimestamp(),
                });
            }
        } catch (error) {}

        await dispatch({ type: 'CHANGE_USER', payload: result });

        setSearchResult([]);
        setSearchValue('');
    };

    return (
        <div className={cx('mess-search', checkDark())}>
            <HeadlessTippy
                interactive
                placement={placement}
                visible={showResult && searchValue}
                render={(attrs) => (
                    <div className={cx('chat-search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {loading === false && searchResult.length === 0 ? (
                                <span>User not found</span>
                            ) : (
                                searchResult.map((result) => (
                                    <AccountItem
                                        key={result.uid}
                                        data={result}
                                        onClick={() => {
                                            handleSelect(result);
                                            clearState();
                                        }}
                                    />
                                ))
                            )}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <Input
                        className={className}
                        type="text"
                        inputRef={inputRef}
                        value={searchValue}
                        placeHolder={placeHolder}
                        onChange={handleSearchInput}
                        spellCheck={false}
                        loading={loading}
                        autoFocus={autoFocus}
                        onFocus={() => setShowResult(true)}
                    />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default ChatSearch;
