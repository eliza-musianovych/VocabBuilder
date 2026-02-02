import { useEffect, useState } from 'react';
import Select from 'react-select';
import css from './Filters.module.css'
import type { Category } from '../../types/wordTypes';
import clsx from 'clsx';

type FilterProps = {
    categories: Category[],
    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>,
    category: string | undefined, 
    setIsIrregular: React.Dispatch<React.SetStateAction<boolean | undefined>>,
}

type Option = {
  value: Category;
  label: string;
};

export default function Filters ({ 
    categories, 
    setKeyword, 
    setCategory,
    category,
    setIsIrregular 
}:FilterProps) {
    const capitalize = (word: string) => {
        return word[0].toUpperCase() + word.slice(1)
    };

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500);
        return () => clearTimeout(timer)
    }, [query]);

    useEffect(() => {
        if (!debouncedQuery) return;
        setKeyword(debouncedQuery);
    }, [debouncedQuery, setKeyword]);

    const options: Option[] = categories.map(category => ({
        value: category,
        label: capitalize(category),
    }));

    return (
        <form action="" className={css.form}>
            <div className={css.container}>
                <input
                className={css.keyword}
                type="text"
                name='keyword'
                placeholder='Find the word'
                onChange={(e) => setQuery(e.target.value)}
                />
                <svg
                className={css.icon}
                width={20}
                height={20}
                >
                    <use href='/sprite.svg#icon-search' />
                </svg>
            </div>

            <Select
            classNamePrefix='categories'
            options={options}
            placeholder='Categories'
            components={{
                IndicatorSeparator: () => null,
            }}
            
            value={
                category
                ? options.find(opt => opt.value === category)
                : null
            }
            onChange={(selected) => {
                setCategory(selected?.value);
            }}
            />

            <fieldset className={clsx(css.verbContainer, category !== 'verb' && css.hidden)}>
                <label className={css.label}>
                    <input
                    className={css.input}
                    type="radio"
                    name='verb'
                    value='regular'
                    defaultChecked
                    onChange={() => setIsIrregular(false)}
                    />
                    Regular
                </label>
                <label className={css.label}>
                    <input
                    className={css.input}
                    type="radio"
                    name='verb'
                    value='irregular'
                    onChange={() => setIsIrregular(true)}
                    />
                    Irregular
                </label>
            </fieldset>
        </form>
    )
}