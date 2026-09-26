const fs = require("fs");
const path = require("path");

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walkSync(filepath, filelist);
    } else if (file.endsWith(".jsx")) {
      filelist.push(filepath);
    }
  }
  return filelist;
}

const files = walkSync("e:/E commarce/frontend/vite-project/src/pages");

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("axios")) {
    content = content.replace(/import axios from ["']axios["'];\r?\n?/g, `import api from "../api";\n`);
    content = content.replace(/import \{ API_BASE_URL \} from ["']\.\.\/config["'];\r?\n?/g, "");
    content = content.replace(/axios\./g, "api.");
    content = content.replace(/\`\$\{API_BASE_URL\}/g, "`");
    content = content.replace(/["']\$\{API_BASE_URL\}/g, '"');
    fs.writeFileSync(file, content);
  }
}
console.log("Refactored frontend pages!");
