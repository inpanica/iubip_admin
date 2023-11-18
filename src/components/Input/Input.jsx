import './Input.css'

function Input({ changeValueFun, inputValue, ...props }) {

    const handleChange = (e) => {
        changeValueFun(e)
    }

    return (
        <>
            <input {...props}
                type={props.type}
                className={["input", props.className].join(' ')}
                placeholder={props.placeholder}
                id={props.id}
                value={inputValue}
                onChange={handleChange} />
        </>
    )
}

export default Input