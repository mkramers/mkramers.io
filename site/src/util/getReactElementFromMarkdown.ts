const showdown = require('showdown');
const HtmlToReactParser = require('html-to-react').Parser;

function getReactFromMarkdown(markdownText: String) {

    let converter = new showdown.Converter();
    let html = converter.makeHtml(markdownText);
    let htmlToReactParser = new HtmlToReactParser();
    return htmlToReactParser.parse(html);
}

export default getReactFromMarkdown;