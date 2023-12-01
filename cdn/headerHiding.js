const headerHiding = {
    headerHideHandler: null,
    init: (options) => {
        let {
            header,
            headerElem,
            menuBodyElem,
            menu,
            menuOpenClass,
            shouldMenuOffsetHeader,
            appearanceMethod,
            openSpeed,
            transitionOptions,
            menuDirection,
        } = options;

        const headerWithoutDot = header.replace(/^\./, "");
        headerElem.classList.add(`${headerWithoutDot}--dynamic`);
        const dynamicHeader = document.querySelector(`${header}--dynamic`);
        dynamicHeader.style.position = "fixed";

        let elemY = 0;
        let scroll = 0;

        headerHiding.headerHideHandler = () => {
            const pos = window.pageYOffset;
            const headerHeight = options.headerElem.offsetHeight;
            const diff = scroll - pos;

            elemY = Math.min(0, Math.max(-headerHeight, elemY + diff));

            if (menu) {
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
                options.updateElemY(elemY);
            }

            if (menu && menuBodyElem.classList.contains(menuOpenClass)) {
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

            scroll = pos;
        };
        headerHiding.headerHideHandler();
        attachEvent(window, "scroll", headerHiding.headerHideHandler);
    },
    destroy: () => {
        window.removeEventListener("scroll", headerHiding.headerHideHandler);
    },
};

// const headerHiding = {
//     init: (options) => {
//         let {
//             header,
//             headerElem,
//             menuBodyElem,
//             menu,
//             menuOpenClass,
//             shouldMenuOffsetHeader,
//             appearanceMethod,
//             openSpeed,
//             timingFunction,
//             transitionOptions,
//             menuDirection,
//         } = options;

//         const headerWithoutDot = header.replace(/^\./, "");
//         headerElem.classList.add(`${headerWithoutDot}--dynamic`);
//         const dynamicHeader = document.querySelector(`${header}--dynamic`);
//         dynamicHeader.style.position = "fixed";

//         let elemY = 0;
//         let scroll = 0;

//         const headerHideHandler = () => {
//             const pos = window.pageYOffset;
//             const headerHeight = options.headerElem.offsetHeight;
//             const diff = scroll - pos;

//             elemY = Math.min(0, Math.max(-headerHeight, elemY + diff));

//             if (menu) {
//                 const menuOpenWithHeaderHiding = {
//                     transform: shouldMenuOffsetHeader
//                         ? `transform: translateY(${
//                               headerHeight - 5
//                           }px); ${getTransitionValue(
//                               transitionOptions,
//                               openSpeed
//                           )}`
//                         : `transform: translateY(0); ${getTransitionValue(
//                               transitionOptions,
//                               openSpeed
//                           )}`,

//                     position: shouldMenuOffsetHeader
//                         ? `${menuDirectionCheck({
//                               direction: menuDirection,
//                               appearanceMethod: appearanceMethod,
//                           })}: 0; top: ${
//                               elemY + (headerHeight - 5)
//                           }px; ${getTransitionValue(
//                               transitionOptions,
//                               openSpeed
//                           )};`
//                         : `${menuDirectionCheck({
//                               direction: menuDirection,
//                               appearanceMethod: appearanceMethod,
//                           })}: 0; top: 0; ${getTransitionValue(
//                               transitionOptions,
//                               openSpeed
//                           )}`,
//                 };
//                 options.updateStateOpen(
//                     menuOpenWithHeaderHiding[appearanceMethod] ||
//                         console.error("Wrong value in appearanceMethod")
//                 );
//                 options.updateElemY(elemY);
//             }

//             if (menu && menuBodyElem.classList.contains(menuOpenClass)) {
//                 const styles = {
//                     transform: shouldMenuOffsetHeader
//                         ? `transform: translateY(${
//                               headerHeight - 5
//                           }px); transition: transform 0s ${timingFunction};`
//                         : `transform: translateY(${Math.abs(
//                               elemY
//                           )}px); transition: transform 0s ${timingFunction};`,

//                     position: shouldMenuOffsetHeader
//                         ? `${menuDirectionCheck({
//                               direction: menuDirection,
//                               appearanceMethod: appearanceMethod,
//                           })}: 0; ` +
//                           `top: ${elemY + (headerHeight - 5)}px; ` +
//                           `transition: top 0s ${timingFunction};`
//                         : `${menuDirectionCheck({
//                               direction: menuDirection,
//                               appearanceMethod: appearanceMethod,
//                           })}: 0; ` +
//                           `top: 0; ` +
//                           `transition: top 0s ${timingFunction};`,
//                 };
//                 menuBodyElem.style.cssText =
//                     styles[appearanceMethod] ||
//                     console.error("Wrong value in appearanceMethod");
//             }
//             headerElem.style.cssText =
//                 appearanceMethod === "transform"
//                     ? `transform: translateY(${elemY}px)`
//                     : appearanceMethod === "position"
//                     ? `top: ${elemY}px`
//                     : "";

//             scroll = pos;
//         };
//         headerHideHandler();
//         attachEvent(window, "scroll", headerHideHandler);
//     },
// };
