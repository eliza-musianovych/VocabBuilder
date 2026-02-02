export type Category =
  | 'verb'
  | 'participle'
  | 'noun'
  | 'adjective'
  | 'pronoun'
  | 'numerals'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'phrasal verb'
  | 'functional phrase';

export interface WordRequest {
  en: string,
  ua: string,
  category: Category,
  isIrregular: boolean,
};

export interface Word {
  id: string,
  en: string,
  ua: string,
  category: Category,
  isIrregular?: boolean,
}

export interface OwnWord {
  id: string,
  en: string,
  ua: string,
  category: Category,
  isIrregular: boolean,
  owner: string,
  progress: number,
};

export interface WordsHttpResponse {
    results: Word[],
    totalPages: number,
    page: number,
    perPage: number,
};

export interface UsersWordsHttpResponse {
    results: OwnWord[],
    totalPages: number,
    page: number,
    perPage: number,
};

export interface DeleteResponse {
    message: string,
    id: string,
};

export interface StatisticsResponse {
    totalCount: number;
};

type TaskWord = {
    id: string,
    ua: string,
    task: string,
};

export interface TasksResponse {
    words: TaskWord[],
};

type AnswersWord = {
    id: string,
    en: string,
    ua: string,
    task: string,
};

export type AnswersRequest = AnswersWord[];

type AnswersWordResponse = {
    id: string,
    ua: string,
    task: string,
    en: string,
    isDone: boolean,
};

export type AnswersResponse = AnswersWordResponse[];
