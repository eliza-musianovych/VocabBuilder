import axios from "axios"
import type { 
    Category, 
    WordsHttpResponse, 
    WordRequest,
    UsersWordsHttpResponse,
    DeleteResponse,
    StatisticsResponse,
    TasksResponse,
    AnswersRequest,
    AnswersResponse,
    OwnWord
} from "../types/wordTypes";

const URL = 'https://vocab-builder-backend.p.goit.global/api';

const token = localStorage.getItem('token');

export const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(
        `${URL}/words/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const createWord = async (data: WordRequest): Promise<OwnWord> => {
    const response = await axios.post<OwnWord>(
        `${URL}/words/create`, 
        {
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const addNewWordById = async (id: string): Promise<OwnWord> => {
    const response = await axios.post<OwnWord>(
        `${URL}/words/add/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const editWord = async (
    id: string,
    data: WordRequest,
): Promise<OwnWord> => {
    const response = await axios.patch<OwnWord>(
        `${URL}/words/add/${id}`, 
        {
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const getAllWords = async (
    keyword?: string,
    category?: Category | undefined,
    isIrregular?: boolean | undefined,
    page: number = 1,
    limit: number = 7,
): Promise<WordsHttpResponse> => {
    const parametrs = new URLSearchParams({
        ...(keyword !== '' ? {keyword: keyword} : {}),
        ...(category !== undefined ? {category: category} : {}),
        ...(isIrregular !== undefined ? {isIrregular: isIrregular.toString()} : {}),
        page: page.toString(),
        limit: limit.toString(),
    });

    const response = await axios.get<WordsHttpResponse>(
        `${URL}/words/all?${parametrs}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const getUsersWords = async (
    keyword?: string,
    category?: Category | undefined,
    isIrregular?: boolean | undefined,
    page: number = 1,
    limit = 7,
): Promise <UsersWordsHttpResponse> => {
    const parametrs = new URLSearchParams({
        ...(keyword !== '' ? {keyword: keyword} : {}),
        ...(category !== undefined ? {category: category} : {}),
        ...(isIrregular !== undefined ? {isIrregular: isIrregular.toString()} : {}),
        page: page.toString(),
        limit: limit.toString(),
    });

    const response = await axios.get<UsersWordsHttpResponse>(
        `${URL}/words/own?${parametrs}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const deleteUsersWord = async (id: string): Promise<DeleteResponse> => {
    const response = await axios.delete<DeleteResponse>(
        `${URL}/words/delete/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const getStatistics = async (): Promise<StatisticsResponse> => {
    const response = await axios.get<StatisticsResponse>(
        `${URL}/words/statistics`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const getTasks = async (): Promise<TasksResponse> => {
    const response = await axios.get<TasksResponse>(
        `${URL}/words/tasks`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};

export const postAnswers = async (data: AnswersRequest): Promise<AnswersResponse> => {
    const response = await axios.post<AnswersResponse>(
        `${URL}/words/answers`, 
        {
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    return response.data;
};