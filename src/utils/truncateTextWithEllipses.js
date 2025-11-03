export const truncateTextWithEllipses = (text = "", maxLen = 30) => {

    if (text.length > maxLen) {
        const truncatedText = text.slice(0, maxLen,) + ' ...'
        return truncatedText
    }
    return text
}