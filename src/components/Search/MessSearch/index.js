import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useRef, useState } from 'react';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';

import { useAuth } from '~/context/AuthContext';
import { db } from '~/firebase';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Input from '~/components/Input';
import styles from '~/components/Search/Search.module.scss';

import { useDebounce } from '~/components/Hook';

const cx = classNames.bind(styles);
function MessSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const debounce = useDebounce(searchValue, 500);
    //const inputRef = useRef();

    // const handleClearSearch = () => {
    //     setSearchValue('');
    //     inputRef.current.focus();
    // };

    const handleHideResult = () => {
        setShowResult(false);
    };

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        const handleSearch = async () => {
            const q = query(collection(db, 'users'), where('keywords', 'array-contains', searchValue));

            try {
                const querySnapshot = await getDocs(q);
                setSearchResult(querySnapshot.docs.map((doc) => doc.data()));
                // querySnapshot.forEach((doc) => {
                //     setSearchResult(doc.data());
                //     //console.log(doc.uid, ' => ', doc.data());
                // });
                // .map((doc) => ({
                //     displayName: doc.data().displayName,
                //     value: doc.data().uid,
                //     photoURL: doc.data().photoURL,
                // }));
                //console.log(searchResult);
            } catch (err) {
                setError(true);
            }
        };

        handleSearch();
    }, [debounce]);

    async function fetchUserList(search, curMembers) {
        return db
            .collection('users')
            .where('keywords', 'array-contains', search?.toLowerCase())
            .orderBy('displayName')
            .limit(20)
            .get()
            .then((snapshot) => {
                return snapshot.docs
                    .map((doc) => ({
                        label: doc.data().displayName,
                        value: doc.data().uid,
                        photoURL: doc.data().photoURL,
                    }))
                    .filter((opt) => !curMembers.includes(opt.value));
            });
    }

    const handleSearchInput = (e) => {
        const searchValueInput = e.target.value;

        if (!searchValueInput.startsWith(' ')) {
            setSearchValue(searchValueInput);
        } else {
            return;
        }
    };

    return (
        <div className={cx('mess-search')}>
            <HeadlessTippy
                interactive
                trigger="click"
                //visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {searchResult.map((result) => (
                                <AccountItem key={result.uid} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    {/* <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        onChange={handleSearchInput}
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {!!searchValue && !loading ? (
                        <button className={cx('clear-btn')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    ) : (
                        <></>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button> */}

                    <Input
                        //ref={inputRef}
                        value={searchValue}
                        placeHolder={'Search...'}
                        onChange={handleSearchInput}
                        //onFocus={() => setShowResult(true)}
                    />
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default MessSearch;
