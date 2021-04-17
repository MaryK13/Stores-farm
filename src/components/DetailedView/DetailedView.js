import React from 'react'
import classes from './DetailedView.module.css'

const DetailedView = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.modalDialog}>
                <div className={classes.modalHeader}>
                    <h3 className={classes.modalTitle}>{props.info.name}</h3>
                    <span className={classes.modalClose} onClick={props.onClose}>&times;</span>
                </div>
                <div className={classes.modalBody}>
                    <div className={classes.modalContent}>
                        <p>{props.info.address.address}</p>
                        <p>{props.info.workTime.descr}</p>
                    </div>
                </div>
                {props.footer && <div className={classes.modalFooter}>{props.footer}</div>}
            </div>
        </div>
    )
}

export default DetailedView