import { useState } from 'react';
import { userInfo } from '../../mocks/user';
import UploadModal from '../uploadModal/UploadModal';
import './User.scss';

const User: React.FC = () => {
    const [showFunctionListMenu, setShowFunctionListMenu] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const FunctionList = () => {
        return <div className='function-list'>
            <ul>
                <li data-testid='user-button-upload' onClick={() => { setShowFunctionListMenu(false); setShowUploadModal(true) }}>Upload Document</li>
                <li>Func 2 to be added</li>
                <li>Func 3 to be added</li>
                <li>Func 4 to be added</li>
            </ul>
        </div>
    }
    const onUploadCallback = () => {
        setShowUploadModal(false);
    }
    return <div className='user-container'>
        {showUploadModal && <UploadModal onUploadCallback={onUploadCallback} />}
        <img className='user-icon' src={userInfo.profilePic} alt="user pic" />
        <div className='user-name' >{userInfo.username}</div>
        <div className='horizontal-gap' />
        <div className='menu-icon' >
            <div data-testid="mobile-menu-icon" onClick={() => { setShowFunctionListMenu(!showFunctionListMenu) }}>&#9776;</div>
            {showFunctionListMenu &&
                <div className='functions-wrapper' ><FunctionList /></div>}
        </div>
        <div className='desktop-only-flex'><FunctionList /></div>

    </div >
}

export default User