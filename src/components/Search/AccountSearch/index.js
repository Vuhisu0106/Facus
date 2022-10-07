import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { collection, query, where, doc, getDoc, getDocs, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/context/AuthContext';
import { db } from '~/firebase';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Input from '~/components/Input';
import styles from '~/components/Search/Search.module.scss';
import { useDebounce } from '~/components/Hook';
import { useUser } from '~/context/UserContext';

const cx = classNames.bind(styles);
function AccountSearch({ className, placeHolder, placement, autoFocus }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { currentUser } = useAuth();
    const { dispatch, addToLocalStorage } = useUser();

    const debounce = useDebounce(searchValue, 500);
    const inputRef = useRef();

    let navigate = useNavigate();

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
        await dispatch({ type: 'SELECT_USER', payload: result });
        addToLocalStorage(result.uid);
        navigate(`/user/${result.uid}`);
        setSearchResult([]);
        setSearchValue('');
    };

    return (
        <div className={className}>
            <HeadlessTippy
                interactive
                placement={placement}
                visible={showResult && searchValue}
                render={(attrs) => (
                    <div className={cx('account-search-result')} tabIndex="-1" {...attrs}>
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

export default AccountSearch;
