import subsetFont from "subset-font";
import * as fs from "fs/promises";

let merged = await fs.readFile("./fontawesome/merged.ttf");

const subset = await subsetFont(merged, 
  // Share, Tweet, Link, Toot, LI Promote, Skeet, RSS, GH
  `\uF14D\uF099\uF0C1\uF4F6\uF08C\uE671\uF09E\uF09B`,
  { targetFormat: "woff2" }
);

let subb64 = subset.toString("base64");

await fs.writeFile(
  "./combined-node.woff2.base64", subb64
);

// TODO: break up

// Replace the inline'd data in share-button.js
let sb = (await fs.readFile("./share-button.js")).toString();

await fs.writeFile("./share-button.js", 
  sb.replace(
    /base64,([A-Za-z0-9\/\+\=])+\)/gm,
    `base64,${subb64})`
  )
);