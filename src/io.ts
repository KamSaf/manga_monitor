import mangaData from "../manga.json";
import { Manga } from "./types";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const mangaList: Manga[] = mangaData;
const fileName = process.env.DATA_FILE_NAME as string;
const filePath = path.join(__dirname, "..", fileName);

function save() {
  const data = JSON.stringify(mangaList);
  fs.writeFile(filePath, data, "utf-8", (err) => {
    if (err) {
      console.log("===> ❌ Couldn't save data to file\n");
    }
  });
}

function updateChapter(
  name: string,
  chapter: string,
  extraChapter: boolean = false
) {
  mangaList.map((manga) => {
    if (manga.name === name) {
      if (extraChapter) {
        manga.lastExtraChapter = chapter;
      } else {
        manga.lastChapter = chapter;
      }
    }
  });
  save();
}

export { mangaList, updateChapter };
