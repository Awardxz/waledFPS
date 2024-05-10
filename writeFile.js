const path = require('node:path')
const fs = require('node:fs')
const os = require('os');

const button = document.getElementById('writeFileBtn');

button.addEventListener('click',() => {
    writeFile();
})

function writeFile() {
    const appDataPath = path.join(os.homedir(), 'AppData');
    const currentVersionPath = path.join(appDataPath, 'Local', 'Roblox', 'Versions');
    const versions = fs.readdirSync(currentVersionPath);
    versions.forEach((version) => {
        const versionPath = path.join(currentVersionPath, version)
        const RobloxPlayerExe = path.join(versionPath, 'RobloxPlayerBeta.exe');
        if (fs.existsSync(RobloxPlayerExe)) {
            console.log("File exists " + RobloxPlayerExe);
            fs.mkdir(path.join(versionPath, 'ClientSettings'), (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Client Settings created Successfully!');
            });
            const clientPath = path.join(versionPath, 'ClientSettings');
            const filePath = path.join(clientPath, 'ClientAppSettings.json');
            fs.writeFile(filePath, '{"DFIntTaskSchedulerTargetFps": 360}', 'utf8', (error) => {
                if (error) {
                    FileWritten(`There was an error ${error}, contact awardq on discord for support`)
                    console.error('An error occurred while writing to the file:', error);
                    return;
                }
                console.log('FPS File Succesfully added.');
                FileWritten("FPS Unlocked Have Fun :)");
            });
        }
    });
}

const FileWritten = (texting) => {
    const text = document.createElement("p");
    const div = document.getElementById('result');
    div.appendChild(text);
    text.textContent = "Writing FPS Unlocker";
    setTimeout(() => {
        text.textContent = texting
    },1000)
}