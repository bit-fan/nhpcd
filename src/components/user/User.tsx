import { useState } from 'react';
import './user.scss';

const User: React.FC = () => {
    const [showFunctionListMenu, setShowFunctionListMenu] = useState(false);
    const FunctionList = () => {
        return <div className='function-list'>
            <ul>
                <li>Upload Document</li>
                <li>Func 1</li>
                <li>Func 1</li>
                <li>Func 1</li>
            </ul>
        </div>
    }
    return <div className='user-container'>
        <img className='user-icon' src='' />
        <div className='user-name' >{'username'}</div>
        <div className='horizontal-gap' />
        <div className='menu-icon' >
            <div onClick={() => { setShowFunctionListMenu(!showFunctionListMenu) }}>&#9776;</div>
            {showFunctionListMenu &&
                <div className='functions-wrapper' ><FunctionList /></div>}
        </div>
        <div className='desktop-only-flex'><FunctionList /></div>

    </div>
}

export default User