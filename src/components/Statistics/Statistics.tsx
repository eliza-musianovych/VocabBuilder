import css from './Statistics.module.css'
import { getStatistics } from '../../services/wordServices'
import { useQuery } from '@tanstack/react-query'

export default function Statistics () {
    const { data } = useQuery({
        queryKey: ['statistics'],
        queryFn: getStatistics,
    });

    return (
        <p className={css.statistic}>
            To study: <span className={css.statisticNumber}>{data?.totalCount}</span>
        </p>
    )
}