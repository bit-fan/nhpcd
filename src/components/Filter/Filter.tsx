import { ChangeEvent, useEffect, useState } from 'react';
import './Filter.scss';
export type IFilterValues = {
    lower?: number;
    upper?: number;
}
const RangeBoundaryBlock = ({ testId, text, value, onChange }: {
    testId: string,
    text: string,
    value?: number,
    onChange: (e: ChangeEvent) => void;
}) => {
    return <div className='boundary-input-wrapper'>
        <div className='range-label'>
            <div>{text}</div>
            <div>Enter Amount</div>
        </div>
        {/* &#36; is dollar symbol */}
        <div>&#36;</div>
        <input
            data-testid={testId}
            value={value}
            onChange={(e: ChangeEvent) => onChange(e)}
        />
    </div>
}

const Filter = ({ values, updateValue }: {
    values?: IFilterValues,
    updateValue: ({ lower, upper }: IFilterValues) => void
}) => {

    const [minValue, setMinValue] = useState<number | undefined>(values?.lower || undefined);
    const [maxValue, setMaxValue] = useState<number | undefined>(values?.upper || undefined);

    useEffect(() => {
        updateValue({ lower: minValue, upper: maxValue })
    }, [minValue, maxValue]);
    return <div className='filter-wrapper'>
        <div className='boundary-wrapper'>
            <div className='icon'><div>&#x1F50E;&#xFE0F;</div></div>
            <RangeBoundaryBlock
                testId='min-range'
                text='Minimum Salary'
                onChange={(e: any) => setMinValue(Number(e.target.value))}
                value={minValue} />
        </div>
        <div className='boundary-wrapper'>
            <div>-</div>
            <RangeBoundaryBlock
                testId='max-range'
                text='Maximum Salary'
                onChange={(e: any) => setMaxValue(Number(e.target.value))}
                value={maxValue} />
        </div>
    </div>
}
export default Filter;