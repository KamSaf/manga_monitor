import { Manga } from "./types";
import { isChapterAvailable } from "./webscrapp";

const mangaList: Manga[] = [
  {
    name: "Chainsaw Man",
    baseUrl: "https://mangakatana.com/manga/chainsaw-man.21890",
    lastChapter: "169",
    lastExtraChapter: "169.5",
  },
  {
    name: "Jujutsu Kaisen",
    baseUrl: "https://mangakatana.com/manga/jujutsu-kaisen.20224",
    lastChapter: "250",
  },
];

async function run(): Promise<void> {
  console.log("\x1b[93m \n\n MangaMonitor 1.0 \n\n \x1b[0m");
  for (const manga of mangaList) {
    console.log(`\x1b[32m ### ${manga.name} ### \x1b[0m`);
    const nextChapterNumber = parseFloat(manga.lastChapter) + 1;

    const chapterUrl: string =
      manga.baseUrl + "/c" + nextChapterNumber.toString();
    await isChapterAvailable(chapterUrl, true);

    if (manga.lastExtraChapter) {
      const nextExtraChapterNumber = parseFloat(manga.lastExtraChapter) + 1;
      const extraChapterUrl: string =
        manga.baseUrl + "/c" + nextExtraChapterNumber.toString();
      await isChapterAvailable(extraChapterUrl, false);
    }
    console.log("\n\n");
  }
}

run();
