import React from 'react';

import './Remove.scss'



export const Remove = () => {
    return (
        <div className='remove-modal'>

            <div className='remove-modal__wrapper'>
                <h3 className='remove-modal__title'>
                    Delete this board?
                </h3>

                <p className='remove-modal__text'>Are you sure you want to delete the `Platform Launch` board? This action will remove all
                    columns and tasks and cannot be reversed.</p>
                <div className='remove-modal__buttons'>
                    <button className='remove-modal__remove-item'>Delete</button>
                    <button className='remove-modal__cancel-remove'>Cancel</button>
                </div>
            </div>
        </div>
    );
};