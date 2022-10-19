import { IEmployeeTable } from '../../pages/dashboard/Dashboard';
import { PAGES } from '../../setting/const';
import './Pagination.scss';

const PagingBox = ({ total, tableProp, update }: {
    total: number,
    tableProp: IEmployeeTable,
    update: (key: IEmployeeTable) => void
}) => {

    const maxPage = Math.ceil(total / tableProp.pageSize);
    const pageList = Array.from(Array(maxPage).keys()).map(i => i + 1);
    return <div className='page-container'>
        Total {total} records, showing
        <div className="page-size">
            {PAGES.map(p => {
                return <div
                    data-testid={`pagesize-${p}`}
                    key={p}
                    className={p === tableProp.pageSize ? 'selected-page' : ''}
                    onClick={() => {
                        // when change page size, reset to first page
                        update({ ...tableProp, pageSize: p.valueOf(), curPage: 1 })
                    }}
                >{p}</div>
            })}
        </div> records per page. Go to

        <div className="page-numbers">
            {/* first page */}
            <a data-testid='goto-page-first' onClick={() => {
                update({ ...tableProp, curPage: 1 })
            }}>1</a>

            {/* prev page */}
            {tableProp.curPage > 1 && <a data-testid='goto-page-prev' onClick={() => {
                update({ ...tableProp, curPage: tableProp.curPage - 1 })
            }}>{'prev'}</a>}

            {/* go to page */}
            <select data-testid='goto-page-number' value={tableProp.curPage} onChange={p => {
                update({ ...tableProp, curPage: Number(p.target.value) })
            }}>
                {pageList.map(p => {
                    return <option key={p} value={p}>{p}</option>
                })}
            </select>

            {/* next page */}
            {tableProp.curPage < maxPage && <a data-testid='goto-page-next' onClick={() => {
                update({ ...tableProp, curPage: tableProp.curPage + 1 })
            }}>{'next'}</a>}

            {/* last page */}
            <a data-testid='goto-page-last' onClick={() => {
                update({ ...tableProp, curPage: maxPage })
            }}>{maxPage}</a>
        </div>
    </div>
}
export default PagingBox;