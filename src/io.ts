import mangaData from "../manga.json";
import { Manga } from "./types";
import fs from "fs";
import path from "path";

const mangaList: Manga[] = mangaData;

function save(mangaList: Manga[]) {
  const filePath = path.join(__dirname, "..", "..", "manga.json");
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
  extraChapter: boolean = false,
  mangaList: Manga[]
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
  save(mangaList);
}

export { mangaList, updateChapter };
