import { FlowNode } from 'typescript';
import { PAGES } from '../../setting/const';
import './Pagination.scss';

const PagingBox = ({ total, pageSize, curPage, update }: {
    total: number,
    pageSize: number,
    curPage: number,
    update: (key: 'size' | 'page', val: number) => void
}) => {

    const maxPage = Math.ceil(total / pageSize);
    const pageList = Array.from(Array(maxPage).keys()).map(i => i + 1);
    return <div className='page-container'>
        <div className="page-size">
            {PAGES.map(p => {
                return <div
                    className={p === pageSize ? 'selected-page' : ''}
                    onClick={() => { update('size', p.valueOf()) }}
                >{p}</div>
            })}
        </div> records per page

        <div className="page-numbers">
            <div onClick={() => { update('page', 1) }}>1</div>
            {curPage > 1 && <div onClick={() => { update('page', curPage - 1) }}>{'<'}</div>}
            Page Number:<select value={curPage} onChange={p => { update('page', Number(p.target.value)) }}>
                {pageList.map(p => {
                    return <option value={p}>{p}</option>
                })}
            </select>
            {curPage < maxPage && <div onClick={() => { update('page', curPage + 1) }}>{'>'}</div>}
            <div onClick={() => { update('page', maxPage) }}>{maxPage}</div>
        </div></div>
}
export default PagingBox;