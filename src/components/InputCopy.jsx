import React from 'react'

const InputCopy = ({ children }) => {
    const [isActive, setIsActive] = React.useState(false)

    const handleClickCopy = () => {
        inputRef.current.firstChild.firstChild.select();
        document.execCommand('copy');
    }

    const inputRef = React.useRef()

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(inputRef.current)) {
            setIsActive(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className="input_copy" ref={inputRef}>
            {!isActive ?
                <span onClick={() => setIsActive(true)} className="input_copy__text">
                    {children}
                </span> :
                <div className="input_copy__block">
                    <input type="text" value={children} className="input_copy__input" />
                    <button onClick={handleClickCopy}>Копировать</button>
                    <button>Изменить</button>
                </div>
            }
        </div>
    )
}

export default InputCopy
