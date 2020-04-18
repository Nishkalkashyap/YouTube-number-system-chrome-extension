import numeral from 'numeral';

const ONE_LAKH = 100000;
const ONE_CRORE = 100 * ONE_LAKH;

setInterval(()=>{
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
        return !!el.innerText.match(/(crore|lakh)/i)
    }).filter((item, index, arr) => {
        return arr.indexOf(item) == index;
    });

    itemsToChange.map((item) => {
        const el: HTMLElement = item as any;
        const text = el.innerText;
        el.innerText = parseRawText(text);
    });
    // console.timeEnd('RESTORE_SANITY');
}

function parseRawText(text: string) {
    const split = text.split(/\s/g);
    const num = Number(split[0]).valueOf();
    const identifier: 'lakh' | 'crore' = split[1] as any;

    const inNumbers = num * (identifier == 'lakh' ? ONE_LAKH : ONE_CRORE);

    const formattedText = numeral(inNumbers).format('0.0 a').toUpperCase().replace(/(\s|\.0)/gi, '');
    return formattedText;
}
