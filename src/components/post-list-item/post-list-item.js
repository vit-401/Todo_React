import React, {Component} from 'react';

import './post-list-item.sass';

export default class PostListItem extends Component {


    onImportant() {
        this.setState(({important}) => ({
            important: !important
        }))
    }

    onLike() {
        this.setState(({like}) => ({
            like: !like
        }))
    }

    render() {
        const {label, onDelete, onToggleImporten, onToggleLike, important, like} = this.props;

        let classNames = "app-list-item d-flex justify-content-between";
        if (important) {
            classNames += ' important';
        }
        if (like) {
            classNames += ' like';
        }
    return (
        <div className={classNames}>
            <span 
                className="app-list-item-label"
                onClick={onToggleLike}>
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button 
                type="button" 
                className="btn-star btn-sm"
                onClick={onToggleImporten}>
                    <i className="fa fa-star"></i>
                </button>
                <button 
                type="button" 
                className="btn-trash btn-sm"
                onClick={onDelete}>
                    <i className="fa fa-trash-o"></i>
                </button>
                <i className="fa fa-heart"></i>
            </div>
        </div>
        )
    }
}
