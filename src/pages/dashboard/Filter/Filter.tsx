import { Value } from 'sass';
import './Filter.scss';
export type IFilterValues = {
    lower?: number;
    upper?: number;
}
const Filter = ({ values, updateValue }: {
    values?: IFilterValues,
    updateValue: ({ lower, upper }: IFilterValues) => void
}) => {

    const RangeBoundaryBlock = ({ type, updateRange, value }: {
        type: 'lower' | 'upper',
        value?: number,
        updateRange: (v: IFilterValues) => void
    }) => {
        return <div className='boundary-input-wrapper'>
            <div className='range-label'>
                <div>
                    {type === 'lower' ? 'Minimum Salary' : 'Maximum Salary'}
                </div>
                <div>
                    Enter Amount
                </div>
            </div>
            <div>&#36;</div>
            <input onChange={e => updateRange({ [type]: Number(e.target.value) })} value={value} />
        </div>
    }
    return <div className='filter-wrapper'>
        <div className='boundary-wrapper'>
            <div className='icon'><div>&#x1F50E;&#xFE0F;</div></div>
            <RangeBoundaryBlock type='lower' updateRange={newRange => updateValue({ ...values, ...newRange })} value={values?.lower} />
        </div>
        <div className='boundary-wrapper'>
            <div>-</div>
            <RangeBoundaryBlock type='upper' updateRange={newRange => updateValue({ ...values, ...newRange })} value={values?.upper} />
        </div>
    </div>
}
export default Filter;