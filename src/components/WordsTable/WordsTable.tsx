import css from './WordsTable.module.css'

import { 
    getCoreRowModel, 
    useReactTable, 
    type ColumnDef,
    flexRender
} from '@tanstack/react-table'

import type { OwnWord } from '../../types/wordTypes'
import { useState } from 'react';
import ActionBtn from '../ActionsBtn/ActionsBtn';

type WordsTableProps = {
    words: OwnWord[],
};

export default function WordsTable ({ words }: WordsTableProps) {
    const [activeWord, setActiveWord] = useState<OwnWord | null>(null);
    const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

    const openMenu = (
        word: OwnWord,
    target: HTMLElement
    ) => {
        setActiveWord(word);
        setAnchorRect(target.getBoundingClientRect());
    };

    const closeMenu = () => {
        setActiveWord(null);
        setAnchorRect(null);
    };

    const columns: ColumnDef<OwnWord>[] = [
        {
            accessorKey: 'en',
            header: 'Word',
        },
        {
            accessorKey: 'ua',
            header: 'Translation',
        },
        {
            accessorKey: 'progress',
            header: 'Progress',
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <button
                className={css.dotsBtn}
                onClick={(e) => 
                    openMenu(row.original, e.currentTarget)
                }
                >
                    ...
                </button>
            )
        },
    ];

    const table = useReactTable<OwnWord>({
        data: words,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return(
    <div className={css.container}>
        <table className={css.table}>
            <thead className={css.thead}>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th 
                            key={header.id}
                            className={css.th}
                            >
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className={css.tbody}>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        {activeWord && 
        <ActionBtn 
        word={activeWord}
        anchorRect={anchorRect}
        onClose={closeMenu}
        />
        }
    </div>
)
}