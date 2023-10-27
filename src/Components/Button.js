function Button({ text, onClick }) {
    return <button onClick={onClick} className="text-[white] max-w-[396px] bg-[#43799c] rounded-[4px] text-[15px] px-4 py-2">{text}</button>
}

export default Button