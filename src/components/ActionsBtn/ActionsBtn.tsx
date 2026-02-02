import css from './ActionsBtn.module.css'
import { useEffect, useRef } from 'react';
import type { OwnWord } from '../../types/wordTypes'

type ActionBtnProps = {
    word: OwnWord,
    anchorRect: DOMRect | null,
    onClose: () => void,
}

export default function ActionBtn ({ word, anchorRect, onClose }: ActionBtnProps) {
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!anchorRect) return null;

    return(
        <div
        ref={popupRef}
        className={css.container}
        style={{
            top: anchorRect.bottom + 4,
            left: anchorRect.right - 85,
        }}
        >
            <button
            type='button'
            className={css.btn}
            >
                <svg
                className={css.icon}
                width={20}
                height={20}
                >
                    <use href='/sprite.svg#icon-edit' />
                </svg>
                Edit
            </button>
            <button
            type='button'
            className={css.btn}
            >
                <svg
                className={css.icon}
                width={20}
                height={20}
                >
                    <use href='/sprite.svg#icon-trash' />
                </svg>
                Delete
            </button>
        </div>
    )
}