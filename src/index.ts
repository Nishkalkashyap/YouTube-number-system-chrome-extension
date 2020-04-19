import numeral from 'numeral';

const ONE_LAKH = 100000;
const ONE_CRORE = 100 * ONE_LAKH;
const ORIGINAL_INNER_TEXT_ATTRIBUTE = 'original-inner-text';

setInterval(() => {
    restoreSanity();
}, 3000);

restoreSanity();

function restoreSanity() {
    // console.time('RESTORE_SANITY');
    const rootItems = document.querySelectorAll("#metadata-line > span:nth-child(1)");
    const searchListItems = document.querySelectorAll("#metadata-line > span:nth-child(1)");
    const videoSuggestions = document.querySelectorAll("#metadata-line > span:nth-child(1)");
    const likes = document.getElementsByTagName("yt-formatted-string");

    const allItems = [...rootItems, ...searchListItems, ...videoSuggestions, ...likes];

    const itemsToChange = allItems.filter((item) => {
        const el: HTMLElement = item as any;
        return (!!el.innerText.match(/(crore|lakh)/i) || el.innerText == '0')
    }).filter((item, index, arr) => {
        return arr.indexOf(item) == index;
    });

    itemsToChange.map((item) => {
        const el: HTMLElement = item as any;
        if (!el.getAttribute(ORIGINAL_INNER_TEXT_ATTRIBUTE)) {
            el.setAttribute(ORIGINAL_INNER_TEXT_ATTRIBUTE, el.innerText);
        }

        el.innerHTML = parseRawText(el.getAttribute(ORIGINAL_INNER_TEXT_ATTRIBUTE));
    });
    // console.timeEnd('RESTORE_SANITY');
}

function parseRawText(text: string) {
    const split = text.split(/\s/g);
    const num = Number(split[0]).valueOf();
    const identifier: 'lakh' | 'crore' = split[1] as any;
    const endText: 'views' | 'subscribers' = split[2] as any;

    const inNumbers = num * (identifier == 'lakh' ? ONE_LAKH : ONE_CRORE);

    let formattedText = numeral(inNumbers).format('0.0 a').toUpperCase().replace(/(\s|\.0)/gi, '');
    if (endText) {
        formattedText = formattedText.concat(` ${endText}`);
    }
    formattedText = formattedText.replace(/\s/g, '&nbsp;');
    return formattedText;
}
