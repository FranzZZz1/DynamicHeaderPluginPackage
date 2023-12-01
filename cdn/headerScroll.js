const headerScroll = {
    handleScrollWatch: null,
    init: (
        headerElem,
        mainElement,
        mql,
        headerScrollPosition,
        headerScrollEndPosition,
        headerScrollMobile,
        headerScrollClass,
        mainElementScrollMargin
    ) => {
        const scrollEndPosition =
            headerScrollEndPosition !== false
                ? headerScrollEndPosition
                : (headerScrollEndPosition =
                      headerScrollPosition > 0
                          ? headerScrollPosition - 1
                          : headerScrollPosition);

        headerScroll.handleScrollWatch = () => {
            const pos = window.pageYOffset;
            const isMobile = headerScrollMobile ? true : !mql.matches;

            if (isMobile && pos >= headerScrollPosition) {
                headerElem.classList.add(headerScrollClass);
            } else if (pos <= scrollEndPosition) {
                headerElem.classList.remove(headerScrollClass);
            }
            mainElement &&
                headerPositionCheck(
                    headerElem,
                    mainElement,
                    mainElementScrollMargin
                );
        };

        if (headerScrollPosition >= scrollEndPosition) {
            attachEvent(window, "scroll", headerScroll.handleScrollWatch);
            headerScroll.handleScrollWatch();
        } else {
            headerElem.classList.remove(headerScrollClass);
            window.removeEventListener(
                "scroll",
                headerScroll.handleScrollWatch
            );

            console.error(
                `headerScrollEndPosition must be less than or equal to headerScrollPosition`
            );
        }
    },
    destroy: () => {
        window.removeEventListener("scroll", headerScroll.handleScrollWatch);
    },
};

// const headerScroll = {
//     init: (
//         headerElem,
//         mainElement,
//         mql,
//         headerScrollPosition,
//         headerScrollEndPosition,
//         headerScrollMobile,
//         headerScrollClass,
//         mainElementScrollMargin
//     ) => {
//         const scrollEndPosition =
//             headerScrollEndPosition !== false
//                 ? headerScrollEndPosition
//                 : (headerScrollEndPosition =
//                       headerScrollPosition > 0
//                           ? headerScrollPosition - 1
//                           : headerScrollPosition);

//         const handleScrollWatch = () => {
//             const pos = window.pageYOffset;
//             const isMobile = headerScrollMobile ? true : !mql.matches;

//             if (isMobile && pos >= headerScrollPosition) {
//                 headerElem.classList.add(headerScrollClass);
//             } else if (pos <= scrollEndPosition) {
//                 headerElem.classList.remove(headerScrollClass);
//             }
//             mainElement &&
//                 headerPositionCheck(
//                     headerElem,
//                     mainElement,
//                     mainElementScrollMargin
//                 );
//         };

//         if (headerScrollPosition >= scrollEndPosition) {
//             attachEvent(window, "scroll", handleScrollWatch);
//             handleScrollWatch();
//         } else {
//             headerElem.classList.remove(headerScrollClass);
//             window.removeEventListener("scroll", handleScrollWatch);

//             console.error(
//                 `headerScrollEndPosition must be less than or equal to headerScrollPosition`
//             );
//         }
//     },
// };
