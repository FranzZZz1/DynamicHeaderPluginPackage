/**
 * Класс, представляющий плагин.
 * @class
 */
class DynamicHeader {
    /**
     * Создает экземпляр DynamicHeader.
     * @constructor
	 // Object
	 * @param {Object} [options={}] - Настройки для конфигурации динамического заголовка.
	 * @param {Object} [options.on={}] - Объект обработчиков событий.
	 * @param {Object|boolean} [options.pageLock={}] - Параметр для блокировки страницы при открытии меню.
	 * @param {Object|boolean} [options.scrollLock={}] - Параметр для блокировки прокрутки.
	 * @param {Object|boolean} [options.headerScroll={}] - Параметр для прокрутки заголовка.
	 // Boolean
	 * @param {boolean} [options.menu=true] - Параметр для включения/отключения меню.
	 * @param {Array} [options.modules=false] - Параметр для модулей.
	 * @param {boolean} [options.scrollWatch=false] - параметр, включив который, к menuItem будет присваиваться класс из параметра "menuItemActive", в случае появления в поле видимости секции, id которой совпадает с атрибутом href в menuLink.
	 * @param {boolean} [options.mainElement=false] - Параметр для основного элемента.
	 * @param {boolean} [options.headerHiding=false] - Параметр для скрытия шапки сайта при прокрутке страницы.
	 * @param {boolean} [options.shouldSmoothScroll=true] - Параметр для включения плавной прокрутки.
	 * @param {boolean} [options.shouldMenuOffsetHeader=false] - Параметр для определения, должно ли меню открываться с учетом шапки сайта.
	 * @param {boolean} [options.shouldScrollOffsetHeader=false] - Параметр для определения, должна ли прокрутка смещать заголовок.
	 // Number
	 * @param {number} [options.openSpeed=550] - Скорость открытия.
	 * @param {number} [options.scrollMargin=0] - Значение отступа между секцией и шапкой сайта при навигации по якорным ссылкам.
	 * @param {number} [options.closeSpeed=350] - Скорость закрытия.
	 * @param {number} [options.mediaQuery=9999999] - Значение медиа-запроса.
	 * @param {number} [options.scrollEventTimeout=900] - Таймаут события прокрутки.
	 * @param {number} [options.mainElementScrollMargin=0] - Значение отступа прокрутки для основного элемента.
	 * @param {number} [options.headerHeightScrollValue=false] - Значение прокрутки высоты заголовка.
	 // String
	 * @param {string} header - Заголовок.
	 * @param {string} [options.menuDirection="top"] - Направление меню.
	 * @param {string} [options.timingFunction="ease"] - Функция времени.
	 * @param {string} [options.menuItemActive="active"] - Класс активного элемента меню.
	 * @param {string} [options.menuIcon=".header__burger"] - селектор элемента, при нажатии на который происходит открытие и закрытие меню.
	 * @param {string} [options.menuOpenClass="menu--open"] - Класс открытого меню.
	 * @param {string} [options.appearanceMethod="position"] - Метод появления.
	 * @param {string} [options.hideClass="visually-hidden"] - Класс скрытого элемента.
	 * @param {string} [options.menuItem=".header__menu-item"] - Селектор элемента меню.
	 * @param {string} [options.menuLink=".header__menu-link"] - Селектор ссылки меню.
	 * @param {string} [options.menuBody=".header__menu-wrapper"] - Селектор тела меню.
	 * @param {string} [options.menuIconActive="header__burger--active"] - Класс активной иконки меню.
	 * @param {string} [options.animationClass=false] - Класс анимации.
    */
    constructor(header, options = {}) {
        this.header = header;
        this.options = Object.assign(
            {
                menuIcon: ".header__burger",
                menuBody: ".header__menu-wrapper",
                menuItem: ".header__menu-item",
                menuLink: ".header__menu-link",
                shouldMenuOffsetHeader: false,
                pageLock: false,
                menu: true,
                scrollWatch: false,
                headerScroll: false,
                headerHiding: false,
                mediaQuery: 9999999,
                scrollLock: false,
                shouldScrollOffsetHeader: false,
                shouldSmoothScroll: true,
                scrollMargin: 0,
                mainElement: false,
                mainElementScrollMargin: 0,
                menuItemActive: "active",
                menuOpenClass: "menu--open",
                hideClass: "visually-hidden",
                menuIconActive: "header__burger--active",
                on: {},
                //! new
                closeSpeed: 350,
                openSpeed: 550,
                animationClass: false,
                headerHeightScrollValue: false,
                appearanceMethod: "position",
                modules: false,
                menuDirection: "top",
                timingFunction: "ease",
                scrollEventTimeout: 900,
                //! new end
            },
            options
        );
        for (let key in this.options) {
            this[key] = this.options[key];
        }

        this.headerElem = document.querySelector(header);

        if (!this.headerElem) {
            throw new Error(`Не найден элемент с селектором "${header}"`);
        }

        this.elemY = null;

        this.#initialize();
    }

    #initialize() {
        this.menuIconElem = this.headerElem.querySelector(this.menuIcon);
        this.menuBodyElem = this.headerElem.querySelector(this.menuBody);

        if (this.menu && (!this.menuIconElem || !this.menuBodyElem)) {
            throw new Error(
                "\nНе заполнены обязательные поля:\nmenuIcon: class required\nmenuBody: class required"
            );
        }

        this.headerHeight =
            this.headerHeightScrollValue && this.headerScroll
                ? this.headerHeightScrollValue
                : this.headerElem.offsetHeight;

        this.mql = window.matchMedia(`(max-width: ${this.mediaQuery}px)`);

        this.#optionsObjectConversion();
        this.#menuInit();
        this.#initModules();

        this.positionCheckHandler = headerPositionCheck.bind(
            this,
            this.headerElem,
            this.mainElement,
            this.mainElementScrollMargin
        );

        this.mainElement &&
            (headerPositionCheck(
                this.headerElem,
                this.mainElement,
                this.mainElementScrollMargin
            ),
            attachEvent(window, "scroll", this.positionCheckHandler));
    }

    #initModules() {
        if (Array.isArray(this.modules) && this.modules.length > 0) {
            for (const module of this.modules) {
                if (module == headerHiding) {
                    this.headerHiding &&
                        headerHiding.init({
                            header: this.header,
                            headerElem: this.headerElem,
                            menu: this.menu,
                            menuBodyElem: this.menuBodyElem,
                            shouldMenuOffsetHeader: this.shouldMenuOffsetHeader,
                            updateStateOpen: this.#updateStateOpen.bind(this),
                            updateElemY: this.#updateElemY.bind(this),
                            menuOpenClass: this.menuOpenClass,
                            appearanceMethod: this.appearanceMethod,
                            openSpeed: this.openSpeed,
                            timingFunction: this.timingFunction,
                            transitionOptions: {
                                appearanceMethod: this.appearanceMethod,
                                menuDirection: this.menuDirection,
                                shouldMenuOffsetHeader:
                                    this.shouldMenuOffsetHeader,
                                timingFunction: this.timingFunction,
                            },
                            menuDirection: this.menuDirection,
                        });
                } else if (module == scrollWatch) {
                    this.scrollWatch &&
                        scrollWatch.init(
                            this.header,
                            this.menuItem,
                            this.menuLink,
                            this.headerElem,
                            this.menuItemActive,
                            this.scrollEventTimeout,
                            this.headerHeightScrollValue
                        );
                } else if (module == pageLock) {
                    this.pageLock &&
                        pageLock.init(
                            this.pageLock.pageLockPadding,
                            this.pageLock.pageLockClass
                        );
                } else if (module == headerScroll) {
                    this.headerScroll &&
                        headerScroll.init(
                            this.headerElem,
                            this.mainElement,
                            this.mql,
                            this.headerScroll.headerScrollPosition,
                            this.headerScroll.headerScrollEndPosition,
                            this.headerScroll.headerScrollMobile,
                            this.headerScroll.headerScrollClass,
                            this.mainElementScrollMargin
                        );
                } else if (module == headerScrollOffset) {
                    headerScrollOffset.init(
                        this.headerElem,
                        this.shouldSmoothScroll,
                        this.shouldScrollOffsetHeader,
                        this.modules &&
                            this.modules.includes(headerHiding) &&
                            this.headerHiding,
                        this.headerHeight,
                        this.scrollMargin,
                        this.mainElementScrollMargin
                    );
                }
            }
        }
    }

    #objectConversion(mainParam, params, mainParamName) {
        if (mainParam) {
            const expectedKeys = Object.keys(mainParam);
            const requiredKeys = Object.keys(params);
            const invalidKeys = expectedKeys.filter((key) => !(key in params));

            if (invalidKeys.length > 0) {
                console.error(
                    `Uncaught Error:\n${mainParamName} has invalid keys:\n${invalidKeys.join(
                        ",\n"
                    )}.\n` +
                        "-------------" +
                        `\nExpected keys:\n${requiredKeys.join(",\n")}.\n\n`
                );
            }

            mainParam = { ...params, ...mainParam };
        }
        return mainParam;
    }

    #optionsObjectConversion() {
        const headerScrollParams = {
            headerScrollPosition: this.headerElem.offsetHeight,
            headerScrollEndPosition: false,
            headerScrollMobile: false,
            headerScrollClass: "header--dark",
        };
        this.headerScroll = this.#objectConversion(
            this.headerScroll,
            headerScrollParams,
            "headerScroll"
        );

        const scrollLockParams = {
            scrollLockClass: "scroll-locked",
            scrollLockDesktop: true,
            scrollLockArray: [this.header],
        };
        this.scrollLock = this.#objectConversion(
            this.scrollLock,
            scrollLockParams,
            "scrollLock"
        );

        const pageLockParams = {
            pageLockClass: "lock",
            pageLockPadding: false,
        };
        this.pageLock = this.#objectConversion(
            this.pageLock,
            pageLockParams,
            "pageLock"
        );
    }

    #updateStateOpen(newStateOpen) {
        this.stateOpen = newStateOpen;
    }

    #updateElemY(elemY) {
        this.elemY = elemY;
    }

    #menuInit() {
        const docEl = document.documentElement;

        const elemYOffset =
            this.modules &&
            this.modules.includes(headerHiding) &&
            this.headerHiding &&
            !this.shouldMenuOffsetHeader
                ? Math.abs(this.elemY) - 5
                : (!this.modules ||
                      !this.modules.includes(headerHiding) ||
                      !this.headerHiding) &&
                  !this.shouldMenuOffsetHeader
                ? "0"
                : this.headerElem.offsetHeight - 5;

        const getStyles = (
            direction,
            offset,
            isMenuOffsetHeader,
            transitionSpeed,
            options,
            headerHiding
        ) => {
            return {
                position: `${direction}: -${offset}; ${isMenuOffsetHeader} ${getTransitionValue(
                    options,
                    transitionSpeed
                )}`,
                transform: `transform: ${direction}${offset})${` translateY(${headerHiding}px)`}; ${getTransitionValue(
                    options,
                    transitionSpeed
                )}`,
            };
        };

        const options = {
            appearanceMethod: this.appearanceMethod,
            menuDirection: this.menuDirection,
            timingFunction: this.timingFunction,
        };

        const menuOpenStyles = getStyles(
            menuDirectionCheck({
                direction: this.menuDirection,
                appearanceMethod: this.appearanceMethod,
            }),
            "0px",
            this.shouldMenuOffsetHeader
                ? `top: ${this.headerElem.offsetHeight - 5}px;`
                : "",
            this.openSpeed,
            options,
            elemYOffset
        );

        this.stateOpen =
            menuOpenStyles[this.appearanceMethod] ||
            console.error("Wrong value in appearanceMethod");

        let isScrollEventAttached = false;

        const stateHide = (transitionSpeed = this.closeSpeed) => {
            this.menuOpenClass &&
                this.menuBodyElem.classList.remove(this.menuOpenClass);

            const update = () => {
                const direction = menuDirectionCheck({
                    direction: this.menuDirection,
                    appearanceMethod: this.appearanceMethod,
                });
                // const menuDirectionOffset = ["left", "right"].includes(
                //     this.menuDirection
                // )
                //     ? "100%"
                //     : `100% + ${this.headerElem.offsetHeight}px`;

                const isMenuOffsetHeader =
                    this.menuDirection !== "top" && this.shouldMenuOffsetHeader
                        ? `top: ${
                              this.elemY + this.headerElem.offsetHeight - 5
                          }px;`
                        : " ";

                const menuCloseStyles = getStyles(
                    direction,
                    "100%",
                    isMenuOffsetHeader,
                    transitionSpeed,
                    options,
                    elemYOffset
                );

                this.menu &&
                    (this.menuBodyElem.style.cssText =
                        menuCloseStyles[this.appearanceMethod] ||
                        console.error("Wrong value in appearanceMethod"));
            };
            if (this.menu) {
                if (
                    (!isScrollEventAttached &&
                        this.appearanceMethod === "transform" &&
                        !this.shouldMenuOffsetHeader) ||
                    (!isScrollEventAttached &&
                        this.modules &&
                        this.modules.includes(headerHiding) &&
                        this.headerHiding &&
                        this.appearanceMethod === "position" &&
                        this.shouldMenuOffsetHeader)
                ) {
                    this.updateHandler = update;

                    attachEvent(window, "scroll", update);
                    isScrollEventAttached = true;
                }
                update();
            }

            if (this.menu && this.menuDirection === "top") {
                window.removeEventListener("scroll", update);
            }
        };

        const menuState = (state) => {
            if (state == stateHide) {
                state();
                this.menuIconActive &&
                    this.menuIconElem.classList.remove(this.menuIconActive);

                this.pageLock &&
                    docEl.classList.remove(this.pageLock.pageLockClass);

                this.compareHandler = menuBodyTopAndHeightCompare;

                attachEvent(window, "resize", this.compareHandler);
            } else if (state == this.stateOpen) {
                this.menuBodyElem.style.cssText = state;

                this.menuIconActive &&
                    this.menuIconElem.classList.add(this.menuIconActive);

                this.pageLock &&
                    docEl.classList.add(this.pageLock.pageLockClass);

                window.removeEventListener(
                    "resize",
                    menuBodyTopAndHeightCompare
                );
            }
        };

        const menuBodyTopAndHeightCompare = () => {
            if (
                stateHide &&
                this.menuBodyElem.offsetHeight >
                    Math.abs(parseInt(this.menuBodyElem.style.top))
            ) {
                stateHide(0);
            }
        };

        stateHide(0);

        const menuToggleFunc = () => {
            if (!this.menu || !this.menuBodyElem) return;
            this.menuBodyElem.classList.toggle(this.menuOpenClass);

            this.menuBodyElem.classList.contains(this.menuOpenClass)
                ? headerMenuOpen()
                : headerMenuClose();
        };

        const headerMenuOpen = () => {
            if (!this.menu) return;

            menuState(this.stateOpen);

            if (this.scrollLock && this.scrollLock.scrollLockArray.length > 0) {
                scrollLock.add(
                    this.scrollLock.scrollLockArray,
                    this.scrollLock.scrollLockClass,
                    handleTouchMove,
                    handleWheel
                );
            }

            setTimeout(() => {
                this.menuBodyElem.style.transition = `${
                    this.appearanceMethod === "position"
                        ? `${this.menuDirection}`
                        : this.appearanceMethod === "transform"
                        ? "transform"
                        : ""
                } 0s ${this.timingFunction}`;
            }, 100);

            this.menuIconElem.blur();

            attachEvent(window, "click", headerMenuCloseTriggers);
            attachEvent(window, "keydown", menuKeyClose);

            if (isScrollEventAttached) {
                window.removeEventListener("scroll", this.updateHandler);
                isScrollEventAttached = false;
            }
        };

        const headerMenuClose = (useState = true) => {
            if (!this.menu) return;

            useState && menuState(stateHide);

            if (this.scrollLock && this.scrollLock.scrollLockArray.length > 0) {
                scrollLock.remove(
                    this.scrollLock.scrollLockArray,
                    this.scrollLock.scrollLockClass,
                    handleTouchMove,
                    handleWheel
                );
            }

            this.headerElem.classList.remove("menu--opened");

            window.removeEventListener("click", headerMenuCloseTriggers);
            window.removeEventListener("keydown", menuKeyClose);
        };

        const headerMenuCloseTriggers = (event) => {
            if (!this.menu) return;

            const stringTypeCheck = function (target) {
                return typeof target === "string"
                    ? target
                    : console.error(
                          `DynamicHeader: Указан неверный тип данных. Используйте класс для доступа к элементу:`,
                          target
                      );
            };

            const target = event.target;

            const menuBodySelector = stringTypeCheck(this.menuBody);
            const headerSelector = stringTypeCheck(this.header);
            const menuLinkSelector = stringTypeCheck(this.menuLink);

            if (
                (!target.closest(`${menuBodySelector}.${this.menuOpenClass}`) &&
                    !target.closest(headerSelector)) ||
                target.closest(menuLinkSelector)
            ) {
                headerMenuClose();
            }
        };

        const menuKeyClose = (event) => {
            if (this.menu && event.code === "Escape")
                headerMenuCloseTriggers(event);
        };

        const scrollLock = {
            add: function (scrollLockArray, scrollLockClass, func1, func2) {
                if (scrollLockArray.length > 0) {
                    scrollLockArray.forEach((el) => {
                        document
                            .querySelector(el)
                            .classList.add(scrollLockClass);
                    });
                }
                attachEvent(document, "touchmove", func1, { passive: false });
                attachEvent(document, "wheel", func2, { passive: false });
            },
            remove: function (scrollLockArray, scrollLockClass, func1, func2) {
                if (scrollLockArray.length > 0) {
                    scrollLockArray.forEach((scrollLockElement) => {
                        document
                            .querySelector(scrollLockElement)
                            .classList.remove(scrollLockClass);
                    });
                }
                document.removeEventListener("touchmove", func1);
                document.removeEventListener("wheel", func2);
            },
        };

        const handleTouchMove = (event) => {
            if (
                this.menu &&
                this.scrollLock &&
                event.target.closest(`.${this.scrollLock.scrollLockClass}`)
            ) {
                event.preventDefault();
            }
        };

        const handleWheel = (event) => {
            if (
                this.scrollLock &&
                this.scrollLock.scrollLockDesktop &&
                event.target.closest(`.${this.scrollLock.scrollLockClass}`)
            ) {
                event.preventDefault();
            }
        };

        const mediaQueryChecker = () => {
            if (!this.mediaQuery) console.error("MediaQuery is not defined");

            const headerWithoutDot = this.header.replace(/^\./, "");

            const handleMqlChange = (event) => {
                if (event.matches) {
                    this.headerElem.classList.add(
                        `${headerWithoutDot}--mobile`
                    );

                    this.menuIconElem.classList.remove(this.hideClass);

                    this.menuToggleHandler = menuToggleFunc;

                    this.menu &&
                        attachEvent(
                            this.menuIconElem,
                            "click",
                            this.menuToggleHandler
                        );

                    if (
                        this.menu &&
                        this.menuBodyElem.classList.contains(this.menuOpenClass)
                    ) {
                        headerMenuOpen();
                        this.menuBodyElem.style.transition = `${
                            this.appearanceMethod === "position"
                                ? this.menuDirection
                                : this.appearanceMethod === "transform"
                                ? "transform"
                                : ""
                        } 0s ${this.timingFunction}`;

                        this.pageLock &&
                            docEl.classList.add(this.pageLock.pageLockClass);
                    } else if (this.menu) {
                        stateHide(0);
                        headerMenuClose(false);
                    }

                    if (!this.headerScroll.headerScrollMobile) {
                        this.headerElem.classList.remove(
                            this.headerScroll.headerScrollClass
                        );
                    }
                } else {
                    if (
                        this.headerScroll &&
                        !this.headerScroll.headerScrollMobile &&
                        this.headerScroll.headerScrollEndPosition <=
                            window.pageYOffset
                    ) {
                        this.headerElem.classList.add(
                            this.headerScroll.headerScrollClass
                        );
                    }

                    this.headerElem.classList.remove(
                        `${headerWithoutDot}--mobile`
                    );

                    this.menuBodyElem.style.removeProperty(
                        this.appearanceMethod === "transform"
                            ? "transform"
                            : this.appearanceMethod === "position"
                            ? this.menuDirection
                            : ""
                    );

                    this.menuBodyElem.style.removeProperty("transition");
                    this.menu &&
                        this.menuIconElem.removeEventListener(
                            "click",
                            menuToggleFunc
                        );
                    this.menuIconElem.classList.add(this.hideClass);

                    if (
                        this.pageLock &&
                        docEl.classList.contains(this.pageLock.pageLockClass)
                    ) {
                        docEl.classList.remove(this.pageLock.pageLockClass);
                    }
                }
            };
            this.mqlHandler = handleMqlChange;
            this.mediaQuery && attachEvent(this.mql, "change", this.mqlHandler);
            handleMqlChange(this.mql);
        };
        mediaQueryChecker();
    }

    destroy() {
        window.removeEventListener("scroll", this.updateHandler);
        window.removeEventListener("resize", this.compareHandler);
        window.removeEventListener("scroll", this.positionCheckHandler);
        this.mql.removeEventListener("change", this.mqlHandler);
        this.menuIconElem.removeEventListener("click", this.menuToggleHandler);

        const headerWithoutDot = this.header.replace(/^\./, "");
        this.headerElem.classList.remove(
            `${headerWithoutDot}--mobile`,
            `${headerWithoutDot}--dynamic`
        );
        this.headerElem.style.removeProperty("top");
        this.menuBodyElem.style.removeProperty(
            this.appearanceMethod === "position"
                ? this.menuDirection
                : "transform"
        );
        this.menuBodyElem.style.removeProperty("top");
        this.menuBodyElem.style.removeProperty("transition");

        this.modules &&
            this.modules.includes(headerHiding) &&
            headerHiding.destroy(this.headerElem);

        this.modules &&
            this.modules.includes(scrollWatch) &&
            scrollWatch.destroy(this.menuItem);

        this.modules &&
            this.modules.includes(headerScroll) &&
            headerScroll.destroy();
        this.headerElem.classList.remove(this.headerScroll.headerScrollClass);

        this.modules &&
            this.modules.includes(headerScrollOffset) &&
            headerScrollOffset.destroy();

        this.modules && this.modules.includes(pageLock) && pageLock.destroy();

        document.documentElement.classList.remove(this.pageLock.pageLockClass);
        document.body.style.removeProperty("padding-right");
        document
            .querySelector(this.mainElement ?? "main")
            .style.removeProperty("margin-top");
    }
}

function attachEvent(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    return {
        unsubscribe() {
            element.removeEventListener(event, handler);
        },
    };
}

const menuDirectionCheck = (options) => {
    const { appearanceMethod, direction } = options;

    switch (appearanceMethod) {
        case "position":
            return direction;
        case "transform":
            switch (direction) {
                case "left":
                    return "translateX(-";
                case "right":
                    return "translateX(";
                case "top":
                    return "translateY(-";
                default:
                    return "";
            }
        default:
            return "";
    }
};

const getTransitionValue = (options, transitionSpeed) => {
    const {
        appearanceMethod,
        menuDirection,
        shouldMenuOffsetHeader,
        timingFunction,
    } = options;
    return (
        `transition: ${
            appearanceMethod === "transform" ? "transform" : menuDirection
        }
        ${transitionSpeed}ms ` + `${timingFunction};`
    );
};

const headerPositionCheck = (
    headerElem,
    mainElement,
    mainElementScrollMargin
) => {
    const headerStyles = window.getComputedStyle(headerElem);
    const headerPosition = headerStyles.getPropertyValue("position");
    const main = document.querySelector(mainElement);
    if (main) {
        const marginTop =
            headerElem.offsetHeight +
            (mainElementScrollMargin ? mainElementScrollMargin : 0);

        const marginBottom = mainElementScrollMargin
            ? mainElementScrollMargin
            : 0;
        if (["absolute", "fixed"].includes(headerPosition)) {
            main.style.marginTop = `${marginTop}px`;
            headerElem.style.marginBottom = "";
        } else {
            headerElem.style.marginBottom = `${marginBottom}px`;
            main.style.marginTop = "";
        }
    }
};
