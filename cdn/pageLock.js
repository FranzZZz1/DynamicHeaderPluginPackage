const pageLock = {
    mutationObserver: null,
    init: (pageLockPadding, pageLockClass) => {
        if (!pageLockPadding) return;
        const classToTrack = pageLockClass;
        const docEl = document.documentElement;
        let scrollbarWidth = window.innerWidth - docEl.clientWidth;

        pageLock.mutationObserver = new MutationObserver(
            (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "class"
                    ) {
                        const currentClass = docEl.className;

                        if (currentClass.includes(classToTrack)) {
                            document.body.style.paddingRight = `${scrollbarWidth}px`;
                        } else {
                            document.body.style.paddingRight = 0;
                        }
                    }
                }
            }
        );

        pageLock.mutationObserver.observe(docEl, {
            attributes: true,
        });
    },
    destroy: () => {
        if (pageLock.mutationObserver) {
            pageLock.mutationObserver.disconnect();
        }
    },
};
