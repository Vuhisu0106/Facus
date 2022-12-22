import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { useAuth } from '~/context/AuthContext';
import { db } from '~/firebase/config';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Input from '~/components/Input';
import styles from '~/components/Search/Search.module.scss';
import { useDebounce } from '~/components/Hook';
import { useDispatch } from 'react-redux';
import { setAddChatState } from '~/features/Chat/ChatSlice';
import { selectChatFunction } from '~/utils';

const cx = classNames.bind(styles);
function ChatSearch({ className, placeHolder, placement, autoFocus }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser } = useAuth();

    const dispatch = useDispatch();

    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef();

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
        await selectChatFunction(currentUser, result);
        setSearchResult([]);
        setSearchValue('');
    };

    return (
        <div className={cx('mess-search')}>
            <HeadlessTippy
                interactive
                placement={placement}
                visible={showResult && searchValue}
                render={(attrs) => (
                    <div className={cx('chat-search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('chat-search-wrapper')}>
                            {!loading && searchResult.length === 0 ? (
                                <span className={cx('no-user-found')}>User not found</span>
                            ) : (
                                searchResult.map((result) => (
                                    <AccountItem
                                        key={result.uid}
                                        data={result}
                                        onClick={() => {
                                            handleSelect(result);
                                            dispatch(setAddChatState({ isAddChatVisible: false }));
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
