type Manga = {
  name: string;
  baseUrl: string;
  lastChapter: string;
  lastExtraChapter?: string;
};

type ChapterInfo = {
  chapterNum: string;
  chapterAvailable: boolean;
};

export type { Manga, ChapterInfo };
