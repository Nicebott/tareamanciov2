import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.scripts = pkg.scripts || {};
pkg.scripts.postbuild = "react-snap";

pkg.reactSnap = {
  source: "dist",
  crawl: false,
  include: [
    "/", "/virtual", "/semipresencial", "/faq", "/foro", "/terms", "/privacy", "/community-rules",
    "/campus/santo-domingo", "/campus/santiago", "/campus/san-francisco-de-macoris", "/campus/puerto-plata",
    "/campus/san-juan", "/campus/barahona", "/campus/la-vega", "/campus/san-pedro-de-macoris", "/campus/san-cristobal",
    "/campus/higuey", "/campus/bonao", "/campus/mao", "/campus/bani", "/campus/hato-mayor", "/campus/azua-de-compostela",
    "/campus/neyba", "/campus/cotui", "/campus/nagua", "/campus/dajabon", "/campus/moca", "/campus/jarabacoa", "/campus/montecristi",
    "/campus/samana", "/campus/elias-pina", "/campus/hermanas-mirabal", "/campus/yamasa", "/campus/finca-exp-engombe"
  ],
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"]
};

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('package.json updated with react-snap config!');
