import type { ChapterInfo } from "./types";
import { mangaList, updateChapter } from "./io";

async function getHtml(url: string): Promise<Response | void> {
  try {
    return await fetch(url);
  } catch (err) {
    console.log(
      `===> ❌ Error occured when fetching data from address: ${url}`
    );
  }
}

async function readStream(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader: ReadableStreamDefaultReader<Uint8Array> = stream.getReader();
  const result: Array<string> = [];
  const decoder: TextDecoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    result.push(decoder.decode(value, { stream: true }));
    if (done) {
      break;
    }
  }
  result.push(decoder.decode());
  return result.join("");
}

function getChapterNumber(text: string): string {
  const title: string = text.slice(
    text.indexOf("<title>"),
    text.indexOf("</title>")
  );
  let index: number = title.indexOf("Chapter") + 8;
  const chapterNumber: Array<string> = [];
  while (true) {
    const char: string = title[index];
    if (isNaN(parseInt(char)) && isNaN(parseInt(title[index + 1]))) {
      break;
    }
    chapterNumber.push(char);
    index = index + 1;
  }
  return chapterNumber.join("");
}

function chapterExist(document: string): ChapterInfo {
  const noNewChapterInfo: string =
    "You can't comment here unless you come from the future!";
  return {
    chapterNum: getChapterNumber(document),
    chapterAvailable: !document.includes(noNewChapterInfo),
  };
}

async function isChapterAvailable(
  name: string,
  url: string,
  checkExtraChapter: boolean
): Promise<void> {
  const initMessage = checkExtraChapter
    ? "Checking for new extra chapter..."
    : "Checking for new chapter...";
  const successMessage = checkExtraChapter
    ? `===> ✅ New extra chapter available! ${url}`
    : `===> ✅ New chapter available! ${url}`;
  const failureMessage = checkExtraChapter
    ? "===> 🔔 No new extra chapters available"
    : "===> 🔔 No new chapters available";

  console.log(initMessage);
  const res = await getHtml(url);
  if (!res || !res.body) {
    console.log("===> ❌ Couldn't request data from the URL\n");
    return;
  }
  const readData = await readStream(res.body);
  const chapterData = chapterExist(readData);
  const chapterAvailable = chapterData.chapterAvailable;
  updateChapter(name, chapterData.chapterNum, checkExtraChapter, mangaList);
  console.log(chapterAvailable ? successMessage : failureMessage);
}

export { isChapterAvailable };
