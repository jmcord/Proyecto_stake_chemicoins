import PropTypes from "prop-types";

export default function TextInput({ type, onChange, value, placeholder, disabled }) {
    return (
        <input
            type={type}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            className="border border-gray-300 rounded-md w-full px-3 py-2"
        />
    );
}

TextInput.propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'email', 'number']),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
};