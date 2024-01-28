import PropTypes from 'prop-types'
//import { MdInfoOutline } from "react-icons/md";

export default function ErrorInfo({ message }) {
    return (
    <div className='flex items-center bg-red-200 p-2 rounded w-fit'>
    
        <p className='text-red-500 text-xs'>{message}</p>
    </div>
    )
}

ErrorInfo.propTypes = {
    message: PropTypes.string.isRequired
}