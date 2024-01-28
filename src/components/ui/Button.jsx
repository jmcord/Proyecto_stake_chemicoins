import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";

export default function Button({ type='button', children, disabled, onClick, isLoading }) {
    return (
        <button 
            type={type}
            className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50 
            ${disabled ? 'disabled:cursor-not-allowed' : ''}`}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            <span className="flex justify-center items-center gap-2">
                {isLoading && <LoadingSpinner className='w-6 h-6' />}
                {children}
            </span>
        </button>
    );
}

Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    isLoading: PropTypes.bool
};
