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
        <div className="page-size">
            {PAGES.map(p => {
                return <div
                    className={p === tableProp.pageSize ? 'selected-page' : ''}
                    onClick={() => { update('pageSize', p.valueOf()) }}
                >{p}</div>
            })}
        </div> records per page

        <div className="page-numbers">
            <div onClick={() => { update('curPage', 1) }}>1</div>
            {tableProp.curPage > 1 && <div onClick={() => { update('curPage', tableProp.curPage - 1) }}>{'<'}</div>}
            Page Number:<select value={tableProp.curPage} onChange={p => { update('curPage', Number(p.target.value)) }}>
                {pageList.map(p => {
                    return <option value={p}>{p}</option>
                })}
            </select>
            {tableProp.curPage < maxPage && <div onClick={() => { update('curPage', tableProp.curPage + 1) }}>{'>'}</div>}
            <div onClick={() => { update('curPage', maxPage) }}>{maxPage}</div>
        </div></div>
}
export default PagingBox;