import { ReactNode } from "react"

export const ModalTitle: React.FC<{ title: string, onClickClose?: () => void }> = ({ title, onClickClose }) => {
    return <div className='modal-title'>
        <div data-testid='close-icon' className="modal-title-close" onClick={() => onClickClose && onClickClose()}>X</div>
        <div className="modal-title-text">
            {title}
        </div>
    </div>
}

export const ModalBody: React.FC<{ title: string, children: ReactNode }> = ({ title, children }) => {
    return <div className='modal-body'>
        <div className="modal-body-header">
            {title}
        </div>
        <div className="modal-body-content">
            {children}
        </div>
    </div>
}
export const ModalFooter: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <div className='modal-footer'>
        {children}
    </div>
}

