import css from './ctionaryPage.module.css'

import { 
    useAppDispatch,
    useAppSelector 
} from "../../store/hooks";
import { 
    setCategories,
    setLoading,
    setError 
} from "../../store/categories/categoriesSlice";
import { getAllWords, getCategories, getUsersWords } from "../../services/wordServices";
import { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "../../types/wordTypes";
import WordsTable from "../WordsTable/WordsTable";
import Statistics from "../Statistics/Statistics";
import LearningActions from "../LearningActions/LearningActions";

export default function DictionaryPage () {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((s) => s.categories.items);

    useEffect(() => { 
        if (categories.length) return; 
        const load = async () => { 
            try { 
                dispatch(setLoading(true)) 
                const data = await getCategories(); 
                dispatch(setCategories(data)) 
            } catch { 
                dispatch(setError('Failed to load categories')) 
            } finally { 
                dispatch(setLoading(false)) 
            } 
        } 
        load() 
    }, [categories.length, dispatch]);

    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState<Category | undefined>(undefined);
    const [isIrregular, setIsIrregular] = useState<boolean | undefined>(undefined);
    const [page, setPage] = useState(1);

    const {data, isSuccess} = useQuery({
        queryKey: ['words', keyword, category, isIrregular, page],
        queryFn: () => getUsersWords(keyword, category, isIrregular, page)
    });

    return (
        <main className={css.main}>
        <Filters 
        categories={categories} 
        setKeyword={setKeyword} 
        setCategory={setCategory} 
        category={category}
        setIsIrregular={setIsIrregular}
        />
        <Statistics />
        <LearningActions />
        {isSuccess && <WordsTable words={data.results} />}
        </main>
    )
}