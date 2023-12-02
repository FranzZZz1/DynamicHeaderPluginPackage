const scrollWatch = {
    onScroll: null,
    handleMenuItemClick: null,
    init: (
        header,
        menuItem,
        menuLink,
        headerElem,
        menuItemActive,
        scrollEventTimeout,
        headerHeightScrollValue
    ) => {
        const menuItems = document.querySelectorAll(menuItem);
        if (!menuItems.length) return;

        const headerElemHeight =
            headerHeightScrollValue !== false
                ? headerHeightScrollValue + 100
                : headerElem.offsetHeight + 100;

        scrollWatch.handleMenuItemClick = (event) => {
            event.preventDefault();

            const link = menuLink
                ? event.currentTarget.querySelector(menuLink)
                : event.currentTarget.querySelector("a");
            const target = link.getAttribute("href");
            if (!target) {
                console.error(
                    `${header}:\nОтсутствует тег "a" в menuItem, либо атрибут href.`
                );
                return null;
            }
            const targetElement = document.querySelector(target);
            if (!targetElement) {
                console.error(
                    `${header}:\nОтсутствуют section с id, соответствующим href в menuLink.`
                );
                return null;
            }

            menuItems.forEach((item) => {
                item.classList.remove(menuItemActive);
            });
            event.currentTarget.classList.add(menuItemActive);

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

        scrollWatch.onScroll = () => {
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
