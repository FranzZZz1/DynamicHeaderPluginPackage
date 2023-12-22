const headerHiding = {
    headerHideHandler: null,
    mediaQueryCheck: null,
    init: (options) => {
        let {
            headerElem,
            menuBodyElem,
            menu,
            menuOpenClass,
            shouldMenuOffsetHeader,
            appearanceMethod,
            openSpeed,
            transitionOptions,
            menuDirection,
            mql,
        } = options;

        let elemY = 0;
        let scroll = 0;
        headerHiding.headerHideHandler = () => {
            const pos = window.pageYOffset;
            const headerHeight = options.headerElem.offsetHeight;
            const diff = scroll - pos;

            elemY = Math.min(0, Math.max(-headerHeight, elemY + diff));

            if (menu && mql.matches) {
                const menuOpenWithHeaderHiding = {
                    transform: shouldMenuOffsetHeader
                        ? `transform: translateY(${headerHeight - 5}px); ` +
                          `${getTransitionValue(transitionOptions, openSpeed)}`
                        : `transform: translateY(${Math.abs(elemY)}px); ` +
                          `${getTransitionValue(transitionOptions, openSpeed)}`,
                    position: shouldMenuOffsetHeader
                        ? `${menuDirectionCheck({
                              direction: menuDirection,
                              appearanceMethod: appearanceMethod,
                          })}: 0; ` +
                          `top: ${elemY + (headerHeight - 5)}px; ` +
                          `${getTransitionValue(transitionOptions, openSpeed)};`
                        : `${menuDirectionCheck({
                              direction: menuDirection,
                              appearanceMethod: appearanceMethod,
                          })}: 0; ` +
                          `top: 0; ` +
                          `${getTransitionValue(transitionOptions, openSpeed)}`,
                };

                options.updateStateOpen(
                    menuOpenWithHeaderHiding[appearanceMethod] ||
                        console.error("Wrong value in appearanceMethod")
                );
            }

            if (
                menu &&
                menuBodyElem.classList.contains(menuOpenClass) &&
                mql.matches
            ) {
                const styles = {
                    transform: shouldMenuOffsetHeader
                        ? `transform: translateY(${
                              headerHeight - 5
                          }px); transition: transform 0s;`
                        : `transform: translateY(${Math.abs(
                              elemY
                          )}px); transition: transform 0s;`,

                    position: shouldMenuOffsetHeader
                        ? `${menuDirectionCheck({
                              direction: menuDirection,
                              appearanceMethod: appearanceMethod,
                          })}: 0; ` +
                          `top: ${elemY + (headerHeight - 5)}px; ` +
                          `transition: top 0s${
                              menuDirection === "top"
                                  ? ""
                                  : ", " + menuDirection + " 0s"
                          };`
                        : `${menuDirectionCheck({
                              direction: menuDirection,
                              appearanceMethod: appearanceMethod,
                          })}: 0; ` + `top: 0;`,
                };
                menuBodyElem.style.cssText =
                    styles[appearanceMethod] ||
                    console.error("Wrong value in appearanceMethod");
            }
            headerElem.style.cssText =
                appearanceMethod === "transform"
                    ? `transform: translateY(${elemY}px)`
                    : appearanceMethod === "position"
                    ? `top: ${elemY}px`
                    : "";

            headerElem.style.position = "fixed";

            if (mql.matches) menuBodyElem.style.position = "fixed";

            scroll = pos;
        };

        headerHiding.headerHideHandler();
        attachEvent(window, "scroll", headerHiding.headerHideHandler);

        headerHiding.mediaQueryCheck = () => {
            headerHiding.headerHideHandler();
            if (!mql.matches) {
                menuBodyElem.style.removeProperty("position");
                menuBodyElem.style.removeProperty(
                    appearanceMethod === "transform"
                        ? "transform"
                        : menuDirection
                );
                menuBodyElem.style.removeProperty("top");
            }
        };
        attachEvent(mql, "change", headerHiding.mediaQueryCheck);
    },
    destroy: (headerElem) => {
        menuBodyElem.style.removeProperty("position");
        menuBodyElem.style.removeProperty(
            appearanceMethod === "transform" ? "transform" : menuDirection
        );
        headerElem.style.removeProperty("position");
        headerElem.style.removeProperty("top");
        headerElem.style.removeProperty("transform");
        window.removeEventListener("scroll", headerHiding.headerHideHandler);
        window.removeEventListener("change", headerHiding.mediaQueryCheck);
    },
};
