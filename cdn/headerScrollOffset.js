const headerScrollOffset = {
    linkHandlersMap: new Map(),
    init: (
        headerElem,
        shouldSmoothScroll,
        shouldScrollOffsetHeader,
        headerHiding,
        headerHeight,
        scrollMargin,
        mainElementScrollMargin
    ) => {
        const anchorLinks = document.querySelectorAll(`a[href^="#"]`);
        if (!anchorLinks) {
            console.error(
                `${headerOffset.name}:\nНа странице отсутствуют ссылки`
            );
            return;
        }
        const headerStyles = window.getComputedStyle(headerElem);
        const headerPosition = headerStyles.getPropertyValue("position");
        anchorLinks.forEach((link) => {
            const handleHeightAccounting = (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href");
                if (targetId === "#") {
                    const scrollOptions = {
                        top: 0,
                        behavior: shouldSmoothScroll ? "smooth" : "auto",
                    };
                    window.scrollTo(scrollOptions);
                } else {
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const offsetTop =
                            targetElement.getBoundingClientRect().top;

                        let scrollOptions = {};

                        scrollOptions.behavior = shouldSmoothScroll
                            ? "smooth"
                            : "auto";

                        const isFirstLink = shouldScrollOffsetHeader
                            ? anchorLinks.length > 0 && link == anchorLinks[0]
                            : false;

                        if (shouldScrollOffsetHeader) {
                            if (
                                !headerHiding ||
                                (headerHiding && isFirstLink)
                            ) {
                                if (headerPosition == "fixed") {
                                    if (isFirstLink) {
                                        scrollOptions.top =
                                            offsetTop -
                                            headerHeight -
                                            mainElementScrollMargin;
                                    } else {
                                        scrollOptions.top =
                                            offsetTop -
                                            headerHeight -
                                            scrollMargin;
                                    }
                                } else {
                                    if (isFirstLink) {
                                        scrollOptions.top =
                                            offsetTop -
                                            headerHeight -
                                            mainElementScrollMargin;
                                    } else {
                                        scrollOptions.top =
                                            offsetTop - scrollMargin;
                                    }
                                }
                            } else {
                                if (headerHiding) {
                                    if (
                                        targetElement.getBoundingClientRect()
                                            .y <
                                        0 + headerHeight
                                    ) {
                                        scrollOptions.top =
                                            offsetTop -
                                            headerHeight -
                                            scrollMargin;
                                    } else {
                                        scrollOptions.top =
                                            offsetTop - scrollMargin;
                                    }
                                }
                            }
                        } else {
                            if (headerHiding) {
                                if (isFirstLink) {
                                    scrollOptions.top =
                                        offsetTop -
                                        headerHeight -
                                        mainElementScrollMargin;
                                } else {
                                    scrollOptions.top =
                                        offsetTop - scrollMargin;
                                }
                            } else {
                                if (isFirstLink) {
                                    scrollOptions.top =
                                        offsetTop -
                                        headerHeight -
                                        mainElementScrollMargin;
                                } else {
                                    scrollOptions.top =
                                        offsetTop - scrollMargin;
                                }
                            }
                        }

                        window.scrollBy(scrollOptions);
                    }
                }
            };

            headerScrollOffset.linkHandlersMap.set(
                link,
                handleHeightAccounting
            );

            attachEvent(link, "click", handleHeightAccounting);
        });
    },

    destroy: () => {
        headerScrollOffset.linkHandlersMap.forEach((handler, link) => {
            link.removeEventListener("click", handler);
        });

        headerScrollOffset.linkHandlersMap.clear();
    },
};

// const headerScrollOffset = {
//     init: (
//         headerElem,
//         shouldSmoothScroll,
//         shouldScrollOffsetHeader,
//         headerHiding,
//         headerHeight,
//         scrollMargin,
//         mainElementScrollMargin
//     ) => {
//         const anchorLinks = document.querySelectorAll(`a[href^="#"]`);
//         if (!anchorLinks) {
//             console.error(
//                 `${headerOffset.name}:\nНа странице отсутствуют ссылки`
//             );
//             return;
//         }
//         const headerStyles = window.getComputedStyle(headerElem);
//         const headerPosition = headerStyles.getPropertyValue("position");
//         anchorLinks.forEach((link) => {
//             const handleHeightAccounting = (event) => {
//                 event.preventDefault();
//                 const targetId = link.getAttribute("href");
//                 if (targetId === "#") {
//                     const scrollOptions = {
//                         top: 0,
//                         behavior: shouldSmoothScroll ? "smooth" : "auto",
//                     };
//                     window.scrollTo(scrollOptions);
//                 } else {
//                     const targetElement = document.querySelector(targetId);

//                     if (targetElement) {
//                         const offsetTop =
//                             targetElement.getBoundingClientRect().top;

//                         let scrollOptions = {};

//                         scrollOptions.behavior = shouldSmoothScroll
//                             ? "smooth"
//                             : "auto";

//                         const isFirstLink = shouldScrollOffsetHeader
//                             ? anchorLinks.length > 0 && link == anchorLinks[0]
//                             : false;

//                         if (shouldScrollOffsetHeader) {
//                             if (
//                                 !headerHiding ||
//                                 (headerHiding && isFirstLink)
//                             ) {
//                                 if (headerPosition == "fixed") {
//                                     if (isFirstLink) {
//                                         scrollOptions.top =
//                                             offsetTop -
//                                             headerHeight -
//                                             mainElementScrollMargin;
//                                     } else {
//                                         scrollOptions.top =
//                                             offsetTop -
//                                             headerHeight -
//                                             scrollMargin;
//                                     }
//                                 } else {
//                                     if (isFirstLink) {
//                                         scrollOptions.top =
//                                             offsetTop -
//                                             headerHeight -
//                                             mainElementScrollMargin;
//                                     } else {
//                                         scrollOptions.top =
//                                             offsetTop - scrollMargin;
//                                     }
//                                 }
//                             } else {
//                                 if (headerHiding) {
//                                     if (
//                                         targetElement.getBoundingClientRect()
//                                             .y <
//                                         0 + headerHeight
//                                     ) {
//                                         scrollOptions.top =
//                                             offsetTop -
//                                             headerHeight -
//                                             scrollMargin;
//                                     } else {
//                                         scrollOptions.top =
//                                             offsetTop - scrollMargin;
//                                     }
//                                 }
//                             }
//                         } else {
//                             if (headerHiding) {
//                                 if (isFirstLink) {
//                                     scrollOptions.top =
//                                         offsetTop -
//                                         headerHeight -
//                                         mainElementScrollMargin;
//                                 } else {
//                                     scrollOptions.top =
//                                         offsetTop - scrollMargin;
//                                 }
//                             } else {
//                                 if (isFirstLink) {
//                                     scrollOptions.top =
//                                         offsetTop -
//                                         headerHeight -
//                                         mainElementScrollMargin;
//                                 } else {
//                                     scrollOptions.top =
//                                         offsetTop - scrollMargin;
//                                 }
//                             }
//                         }

//                         window.scrollBy(scrollOptions);
//                     }
//                 }
//             };
//             attachEvent(link, "click", handleHeightAccounting);
//         });
//     },
// };
