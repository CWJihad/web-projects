const fs = require('fs')
const path = require('path')

const folder = path.dirname(__filename)
let fileName = ['harry.zip', 'jihad.zip', 'cat.jpg', 'hacker.png', 'bird.png', 'notice.pdf']
let filePath = [];
let location = () => {
    for (let i = 0; i < fileName.length; i++) {
        let joinPath = path.join(folder, fileName[i])
        filePath[i] = joinPath

        // file write
        fs.writeFileSync(filePath[i], "")
    }
    // return filePath;
}
location()