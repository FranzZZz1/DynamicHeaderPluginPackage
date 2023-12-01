const scrollWatch = {
    onScroll: null,
    handleMenuItemClick: null,
    init: (
        menuItem,
        menuLink,
        headerElem,
        menuItemActive,
        scrollEventTimeout,
        headerHeightScrollValue
    ) => {
        const menuItems = document.querySelectorAll(menuItem);
        const headerElemHeight =
            headerHeightScrollValue !== false
                ? headerHeightScrollValue + 100
                : headerElem.offsetHeight + 100;

        scrollWatch.onScroll = (event) => {
            const scrollPos = window.scrollY;
            menuItems.forEach((item) => {
                const link = item.querySelector(menuLink);
                const target = link.getAttribute("href");
                const refElement = document.querySelector(target);

                if (
                    refElement &&
                    refElement.offsetTop - headerElemHeight <= scrollPos &&
                    refElement.offsetTop + refElement.offsetHeight > scrollPos
                ) {
                    menuItems.forEach((link) => {
                        link.classList.remove(menuItemActive);
                    });
                    item.classList.add(menuItemActive);
                } else {
                    item.classList.remove(menuItemActive);
                }
            });
        };
        let timeout;

        scrollWatch.handleMenuItemClick = function (event) {
            event.preventDefault();

            const link = this.querySelector(menuLink);
            const target = link.getAttribute("href");
            const targetElement = document.querySelector(target);

            menuItems.forEach((item) => {
                item.classList.remove(menuItemActive);
            });
            this.classList.add(menuItemActive);

            if (targetElement) {
                if (timeout) {
                    clearTimeout(timeout);
                }

                window.removeEventListener("scroll", scrollWatch.onScroll);
                timeout = setTimeout(() => {
                    window.addEventListener("scroll", scrollWatch.onScroll);
                }, scrollEventTimeout);
            }
        };
        scrollWatch.onScroll();
        window.addEventListener("scroll", scrollWatch.onScroll);

        menuItems.forEach((item) => {
            item.addEventListener("click", scrollWatch.handleMenuItemClick);
        });
    },

    destroy: (menuItem) => {
        window.removeEventListener("scroll", scrollWatch.onScroll);
        document
            .querySelectorAll(menuItem)
            .forEach((item) =>
                item.removeEventListener(
                    "click",
                    scrollWatch.handleMenuItemClick
                )
            );
    },
};

// const scrollWatch = {
//     init: (
//         menuItem,
//         menuLink,
//         headerElem,
//         menuItemActive,
//         scrollEventTimeout,
//         headerHeightScrollValue
//     ) => {
//         const menuItems = document.querySelectorAll(menuItem);
//         const headerElemHeight =
//             headerHeightScrollValue !== false
//                 ? headerHeightScrollValue + 100
//                 : headerElem.offsetHeight + 100;

//         function onScroll(event) {
//             const scrollPos = window.scrollY;
//             menuItems.forEach((item) => {
//                 const link = item.querySelector(menuLink);
//                 const target = link.getAttribute("href");
//                 const refElement = document.querySelector(target);

//                 if (
//                     refElement &&
//                     refElement.offsetTop - headerElemHeight <= scrollPos &&
//                     refElement.offsetTop + refElement.offsetHeight > scrollPos
//                 ) {
//                     menuItems.forEach((link) => {
//                         link.classList.remove(menuItemActive);
//                     });
//                     item.classList.add(menuItemActive);
//                 } else {
//                     item.classList.remove(menuItemActive);
//                 }
//             });
//         }
//         let timeout;

//         function handleMenuItemClick(event) {
//             event.preventDefault();

//             const link = this.querySelector(menuLink);
//             const target = link.getAttribute("href");
//             const targetElement = document.querySelector(target);

//             menuItems.forEach((item) => {
//                 item.classList.remove(menuItemActive);
//             });
//             this.classList.add(menuItemActive);

//             if (targetElement) {
//                 if (timeout) {
//                     clearTimeout(timeout);
//                 }

//                 window.removeEventListener("scroll", onScroll);
//                 timeout = setTimeout(() => {
//                     window.addEventListener("scroll", onScroll);
//                 }, scrollEventTimeout);
//             }
//         }
//         onScroll();
//         window.addEventListener("scroll", onScroll);

//         menuItems.forEach((item) => {
//             item.addEventListener("click", handleMenuItemClick);
//         });
//     },
// };
