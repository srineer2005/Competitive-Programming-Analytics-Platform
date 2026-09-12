export const scrollToElement = (
    element,
    options = {}
) => {
    if (!element) {
        return;
    }

    const {
        behavior = "smooth",
        block = "center",
        delay = 50,
    } = options;

    setTimeout(() => {
        element.scrollIntoView({
            behavior,
            block,
        });
    }, delay);
};