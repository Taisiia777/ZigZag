function numberFixed(number, fixed) {
    if ((typeof number === 'number' || typeof number === 'string') && !isNaN(number - parseFloat(number))) {
        number = String(number);
        var split = number.split('.');
        if (split.length > 1) {
            var left = split[0];
            var right = split[1].substr(0, (!fixed ? 4 : fixed));
            return Number(left + (fixed !== 0 ? '.' + right : ''));
        } else {
            return Number(number);
        }
    }
}

function cutNumber(num, separator) {
    if (!separator) separator = '';
    const c = (n, t, fixed) => {
        const count = numberFixed((num / n), fixed);
        return `${num % n === 0 ? num / n : count}${t}`
    }
    if (num >= 1000000000000) return c(1000000000000, separator+'t', 4);
    if (num >= 1000000000) return c(1000000000, separator+'b', 4);
    if (num >= 1000000) return c(1000000, separator+'m', 3);
    if (num >= 1000) return c(1000, separator+'k', 3);
    return num === undefined || num === null ? 0 : num.toString();
}

export default cutNumber;
