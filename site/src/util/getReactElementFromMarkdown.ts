const showdown = require('showdown');
const HtmlToReactParser = require('html-to-react').Parser;

function getReactFromMarkdown(markdownText: String) {

    let converter = new showdown.Converter();
    let text = markdownText;
    let html = converter.makeHtml(text);
    let htmlToReactParser = new HtmlToReactParser();
    let reactElement = htmlToReactParser.parse(html);
    return reactElement;
}

export default getReactFromMarkdown;