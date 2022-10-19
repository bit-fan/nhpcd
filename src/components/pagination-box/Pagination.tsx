import { IEmployeeTable } from '../../pages/dashboard/Dashboard';
import { PAGES } from '../../setting/const';
import './Pagination.scss';

const PagingBox = ({ total, tableProp, update }: {
    total: number,
    tableProp: IEmployeeTable,
    update: (key: 'pageSize' | 'curPage', val: number) => void
}) => {

    const maxPage = Math.ceil(total / tableProp.pageSize);
    const pageList = Array.from(Array(maxPage).keys()).map(i => i + 1);
    return <div className='page-container'>
        Total {total} records, showing
        <div className="page-size">
            {PAGES.map(p => {
                return <div
                    className={p === tableProp.pageSize ? 'selected-page' : ''}
                    onClick={() => { update('pageSize', p.valueOf()) }}
                >{p}</div>
            })}
        </div> records per page. Go to

        <div className="page-numbers">
            <a onClick={() => { update('curPage', 1) }}>1</a>
            {tableProp.curPage > 1 && <a onClick={() => { update('curPage', tableProp.curPage - 1) }}>{'prev'}</a>}
            <select value={tableProp.curPage} onChange={p => { update('curPage', Number(p.target.value)) }}>
                {pageList.map(p => {
                    return <option value={p}>{p}</option>
                })}
            </select>
            {tableProp.curPage < maxPage && <a onClick={() => { update('curPage', tableProp.curPage + 1) }}>{'next'}</a>}
            <a onClick={() => { update('curPage', maxPage) }}>{maxPage}</a>
        </div>
    </div>
}
export default PagingBox;