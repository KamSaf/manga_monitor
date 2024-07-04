import { isChapterAvailable } from "./webscrapper";
import { mangaList } from "./io";

async function run(): Promise<void> {
  console.log("\x1b[93m \n\n MangaMonitor 1.0 \n\n \x1b[0m");
  for (const manga of mangaList) {
    console.log(`\x1b[32m ### ${manga.name} ### \x1b[0m`);
    const nextChapterNumber = parseFloat(manga.lastChapter) + 1;

    const chapterUrl: string =
      manga.baseUrl + "/c" + nextChapterNumber.toString();
    await isChapterAvailable(manga.name, chapterUrl, false);

    if (manga.lastExtraChapter) {
      const nextExtraChapterNumber = parseFloat(manga.lastExtraChapter) + 1;
      const extraChapterUrl: string =
        manga.baseUrl + "/c" + nextExtraChapterNumber.toString();
      await isChapterAvailable(manga.name, extraChapterUrl, true);
    }
    console.log("\n\n");
  }
}
run();
