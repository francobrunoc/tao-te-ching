const fs = require('fs')
const output = {}

;(async () => {
  fs.readFile('assets/tao_te_ching.txt', 'utf8', async function (err, data) {
    if (err) throw err
    let chapter = null
    const lines = data.split(/\r?\n/)
    for (let i = 0; i < lines.length; i++) {
      if (
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(
          lines[i].charAt(0)
        )
      ) {
        chapter = lines[i]
        output[`ch${chapter}`] = []
      } else {
        output[`ch${chapter}`].push(lines[i])
      }
    }
    console.log(output)
    await writeFile(JSON.stringify(output))
    console.log('Done!')
  })
})()

async function writeFile(json) {
  await fs.writeFile(
    `${__dirname}/assets/chapters.json`,
    json,
    'utf8',
    (err) => {
      if (err)
        console.log(
          'Some error occurred - file either not saved or corrupted file saved.'
        )
      else console.log("It's saved!")
    }
  )
}
