/**
 * Класс, представляющий плагин.
 * @class
 */
class DynamicHeader {
    /**
     * Создает экземпляр DynamicHeader.
     * @constructor
     * @param {Object} options - Настройки для конфигурации DynamicHeader.
     * @param {Object} options.on - Объект обработчиков событий (В разработке).
     * @param {Object} options.pageLock
     * - Параметр для полной блокировки прокрутки страницы при открытии меню.
     * @param {boolean} [options.pageLock.pageLockPadding=false]
     * - Параметр, включив который, при открытии меню, к элементу "body" будет присваиваться *padding-right*, величина которого напрямую зависит от ширины полосы прокрутки.
     * - По-умолчанию - **false**.
     * @param {string} [options.pageLock.pageLockClass="lock"]
     * - Класс, который будет присвоен элементу "html" при открытии меню.
     * - По-умолчанию - **"lock"**.
     * @param {Object} options.scrollLock
     * - Объект, параметры которого позволяют настроить блокировку прокрутки в пределах каких-либо блоков при открытии меню.
     * @param {string} options.scrollLock.scrollLockClass
     * - Класс, который будет присвоен шапке сайта при открытии меню и удален при закрытии.
     * - По-умолчанию - **"scroll-locked"**.
     * @param {boolean} options.scrollLock.scrollLockDesktop
     * - Параметр, включив который, блокировка прокрутки начнет работать на десктоп устройствах.
     * - По-умолчанию - **true**.
     * @param {["header"]} options.scrollLock.scrollLockArray
     * - Массив, который принимает в себя селекторы элементов(класс, тег), на которых должна быть заблокирована прокрутка.
     * - По-умолчанию - **["Селектор шапки сайта, указанный при создании экземпляра класса DynamicHeader"]**.
     * @param {Object} options.headerScroll
     * - Объект, параметры которого управляют присвоением/удалением класса к шапке сайта при прокрутке страницы.
     * @param {string} options.headerScroll.headerScrollClass
     * - Класс, который будет присвоен/удален к шапке сайта по достижении указанного в "*headerScrollPosition*" и "*headerScrollEndPosition*" количества пикселей.
     * - По-умолчанию - **"header--dark"**.
     * @param {number} options.headerScroll.headerScrollPosition
     * - Количество прокрученных пикселей, по достижении которого шапке сайта будет присвоен класс.
     * - По-умолчанию - **Высота шапки сайта**.
     * @param {number} options.headerScroll.headerScrollEndPosition
     * - Количество прокрученных пикселей, по достижении которого у шапки сайта будет удален класс.
     * - **Должен быть меньше или равен "headerScrollPosition"**.
     * - По-умолчанию - **Высота шапки сайта - 1px**.
     * @param {boolean} options.headerScroll.headerScrollMobile
     * - Параметр, включив который, модуль "headerScroll" начнет работать на мобильных устройствах (*при переходе в состояние, в котором появляется меню*).
     * - По-умолчанию - **false**.
     * @param {[heаderHiding, scrollWаtch, heаderScroll, heаderScrollOffset, pаgeLock]} options.modules
     *  ### Массив модулей:
     *  #### 1. headerHiding - модуль для скрытия шапки сайта при прокрутке страницы.
     *  #### 2. scrollWatch - модуль для подсветки элементов меню, при появлении на экране соответствующей тому или иному элементу меню секции.
     *  #### 3. headerScroll - модуль для присвения класса шапке сайта, при прокрутке определенного количества пискелей.
     *  #### 4. headerScrollOffet - модуль позволяет включить плавную прокрутку и учет высоты шапки сайта при навигации по якорным ссылкам.
     *	#### 5. pageLock - модуль включает блокировку прокрутки страницы при открытии меню путем присвоения класса тегу "*html*" и *padding-right* для тега "*body*", величина которого напрямую зависит от ширины полосы прокрутки.
     * @param {boolean} options.menu
     * - Параметр для включения/отключения меню.
     * @param {boolean} options.scrollWatch
     * - параметр, включив который, к "*menuItem*" будет присваиваться класс из параметра "*menuItemActive*", в случае появления в поле видимости секции, id которой совпадает с атрибутом href в "*menuLink*"".
     * @param {string} options.mainElement
     * - Класс элемента "*main*".
     * - По-умолчанию - **false**.
     * @param {number} options.mainElementScrollMargin
     * - Значение отступа прокрутки для основного элемента.
     * - **Начинает работать после указания класса в "*mainElement*"**.
     * - По-умолчанию - **0**.
     * @param {boolean} options.headerHiding
     * - Параметр для скрытия шапки сайта при прокрутке страницы.
     * - По-умолчанию - **false**.
     * @param {boolean} options.shouldSmoothScroll
     * - Параметр для включения плавной прокрутки.
     * - **Начинает работать после подключения модуля "*headerScrollOffset*"**.
     * - По-умолчанию - **true**.
     * @param {boolean} options.shouldMenuOffsetHeader
     * - Параметр для определения, должно ли меню открываться с учетом шапки сайта.
     * - По-умолчанию - **false**.
     * @param {boolean} options.shouldScrollOffsetHeader
     * - Параметр для определения, должна ли прокрутка смещать заголовок.
     * - **Начинает работать после подключения модуля "*headerScrollOffset*"**.
     * - По-умолчанию - **false**.
     * @param {number} options.openSpeed
     * - Скорость открытия меню.
     * - По-умолчанию - **550**.
     * @param {number} options.closeSpeed
     * - Скорость закрытия меню.
     * - По-умолчанию - **350**.
     * @param {number} options.scrollMargin
     * - Значение отступа между секцией и шапкой сайта при навигации по якорным ссылкам.
     * - По-умолчанию - **0**.
     * @param {number} options.mediaQuery
     * - Ширина экрана, на которой появится меню.
     * - По-умолчанию - **9999999**.
     * @param {number} options.scrollEventTimeout
     * - Количество миллисекунд, по истечении которого включится событие скролла после нажатия на якорную ссылку.
     * - **Начинает работать после подключения модуля "*scrollWatch*"**.
     * - По-умолчанию - **900**.
     * @param {number} options.headerHeightScrollValue
     * - Число, которое будет принято за высоту шапки сайта при прокрутке по якорным сслыкам. Необходимо в случае изменения высоты шапки сайта после присвоение ей класса из модуля "*headerScroll*".
     * - По-умолчанию - **false**.
     * @param {string} options.menuDirection
     * - Направление меню.
     * - Варианты значений: "top", "left", "right".
     * - По-умолчанию - **"top"**.
     * @param {string} options.timingFunction
     * - Анимация перехода(transition) при открытии меню.
     * - Варианты значений: "ease", "ease-in", "ease-out", "ease-in-out", "linear", "cubic-bezier".
     * - По-умолчанию - **"ease"**.
     * @param {string} options.menuIcon
     * - селектор элемента, при нажатии на который происходит открытие и закрытие меню.
     * - По-умолчанию - **".header__burger"**.
     * @param {string} options.menuIconActive
     * - Класс активной иконки меню.
     * - По-умолчанию - **"header__burger--active"**.
     * @param {string} options.menuOpenClass
     * - Класс открытого меню.
     * - По-умолчанию - **"menu--open"**.
     * @param {string} options.appearanceMethod
     * - Метод открытия/скрытия меню (и шапки сайта при подключенном модуле "*headerHiding*").
     * - Варианты значений: "transform", "position".
     * - По-умолчанию - **"position"**.
     * @param {string} options.hideClass
     * - Класс скрытого элемента.
     * - По-умолчанию - **"visually-hidden"**.
     * @param {string} options.menuItem
     * - Селектор элемента меню.
     * - По-умолчанию - **".header__menu-item"**.
     * @param {string} options.menuItemActive
     * - Класс активного элемента меню.
     * - По-умолчанию - **"active"**.
     * @param {string} options.menuLink
     * - Селектор ссылки меню.
     * - По-умолчанию - **".header__menu-link"**.
     * @param {string} options.menuBody
     * - Селектор тела меню.
     * - По-умолчанию - **".header__menu-wrapper"**.
     * @param {string} options.animationClass
     * - Класс анимации.
     * - По-умолчанию - **"false"**.
     * @param {string} header
     * - Селектор шапки сайта.
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
                openSpeed: 550,
                closeSpeed: 350,
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
                        this.#isModuleInitiated(headerHiding, "headerHiding"),
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

    #isModuleInitiated(module, moduleName) {
        return (
            this.modules &&
            this.modules.includes(module) &&
            this[moduleName] !== false
        );
    }

    #menuInit() {
        const docEl = document.documentElement;

        const translateYRegex = /translateY\(([^)]+)\)/;

        const translateYValue = () => {
            const transformStyle = this.headerElem
                ? this.headerElem.style.transform
                : null;

            const match = transformStyle
                ? transformStyle.match(translateYRegex)
                : null;

            return match ? parseFloat(match[1]) : 0;
        };

        let elemYOffset =
            this.#isModuleInitiated(headerHiding, "headerHiding") &&
            !this.shouldMenuOffsetHeader
                ? Math.abs(translateYValue())
                : !this.#isModuleInitiated(headerHiding, "headerHiding") &&
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
                position:
                    `${direction}: -${offset}; ` +
                    `${isMenuOffsetHeader} ` +
                    `${getTransitionValue(options, transitionSpeed)}`,
                transform:
                    `transform: ${direction}${offset}) ` +
                    `${` translateY(${headerHiding}px)`}; ` +
                    `${getTransitionValue(options, transitionSpeed)}`,
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
                // const transformStyle = this.headerElem.style.transform;
                // const translateX = transformStyle.replace(/[^\d.]/g, "");
                // const translateX_Val = +translateX;

                const topValue = !isNaN(parseInt(this.headerElem.style.top))
                    ? Math.abs(parseInt(this.headerElem.style.top))
                    : 0;

                elemYOffset =
                    this.#isModuleInitiated(headerHiding, "headerHiding") &&
                    !this.shouldMenuOffsetHeader
                        ? Math.abs(translateYValue())
                        : !this.#isModuleInitiated(
                              headerHiding,
                              "headerHiding"
                          ) && !this.shouldMenuOffsetHeader
                        ? "0"
                        : this.headerElem.offsetHeight - 5;

                const direction = menuDirectionCheck({
                    direction: this.menuDirection,
                    appearanceMethod: this.appearanceMethod,
                });

                const isMenuOffsetHeader =
                    this.menuDirection !== "top" && this.shouldMenuOffsetHeader
                        ? `top: ${
                              this.headerElem.offsetHeight - topValue - 5
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
                        this.#isModuleInitiated(headerHiding, "headerHiding") &&
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

        this.#isModuleInitiated(headerHiding, "headerHiding") &&
            headerHiding.destroy(this.headerElem);

        this.#isModuleInitiated(scrollWatch, "scrollWatch") &&
            scrollWatch.destroy(this.menuItem);

        this.#isModuleInitiated(headerScroll, "headerScroll") &&
            headerScroll.destroy() &&
            this.headerElem.classList.remove(
                this.headerScroll.headerScrollClass
            );

        this.#isModuleInitiated(headerScrollOffset, "headerScrollOffset") &&
            headerScrollOffset.destroy();

        this.#isModuleInitiated(pageLock, "pageLock") && pageLock.destroy();

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
    const { appearanceMethod, menuDirection, timingFunction } = options;
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
