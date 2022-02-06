const fs = require('fs');
const util = require('util');
const pdfParser = require('pdf-parser');


const PDF_PATH = 'assets/Tao Te Ching - trans. by J.H.. McDonald.pdf';
const reader = util.promisify(pdfParser.pdf2json);
let output = {}
let last
let text
let ch

(async () => {
  const pdf = await reader(PDF_PATH)
  // console.log(pdf.pages.find(({pageId}) => pageId === 0).texts)
  for (let page = 0; page < pdf.pages.length; page++) {
    pdf.pages.find(({ pageId }) => pageId === page).texts.forEach((line) => {
      text = line.text.split(' ')[1]
      if (isChapter(text)) {
        output[`ch${text}`] = []
        last = text
      }
      else {
        if (output['ch1'] && line.text !== ' ') {
          output[`ch${last}`].push(line.text)
        }
      }
    })
  }
  console.log(output)
  await writeFile(JSON.stringify(output))
  console.log('Done!')
})()

function isChapter(text) {
  ch = Number(text)
  if (Number.isInteger(ch) && text !== "") {
    return (ch >= 1 || ch <= 81)
  }
  return false
}

async function writeFile(json) {
  fs.writeFile(`${__dirname}/assets/chapters.json`, json, 'utf8',  (err) => {
    if (err) console.log('Some error occurred - file either not saved or corrupted file saved.')
    else console.log('It\'s saved!')
  })
}
