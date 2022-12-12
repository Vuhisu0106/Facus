// import { useState, useEffect } from 'react';

// function useViewport() {
//     const [width, setWidth] = useState(window.innerWidth);

//     useEffect(() => {
//         const handleWindowResize = () => setWidth(window.innerWidth);
//         window.addEventListener('resize', handleWindowResize);
//         return () => window.removeEventListener('resize', handleWindowResize);
//     }, []);

//     return { width };
// }

// export default useViewport;

import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

export const MOBILE = 'MOBILE';
export const TABLET = 'TABLET';
export const DESKTOP = 'DESKTOP';

const getDevice = (width) => {
    if (width <= 740) return MOBILE;
    else if (width < 992) return TABLET;
    else return DESKTOP;
};

export function useViewport() {
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        device: getDevice(window.innerWidth),
    });

    const debounce = useDebounce(viewport, 500);

    useEffect(() => {
        const handleResize = () =>
            setViewport({
                width: window.innerWidth,
                device: getDevice(window.innerWidth),
            });
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [debounce]);

    return { viewport };
}
