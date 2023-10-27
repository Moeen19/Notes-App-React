function Note({ note, onClick }) {
    const date = (Edited) => {
        const difference = Date.now() - Edited;
        const sec = difference / 1000;
        const min = sec / 60;
        const hour = min / 60
        const day = hour / 24;

        if(sec < 60) {
            return 'A few seconds ago';
        } else if (min <= 59) {
            return min < 2 ?`A min ago` : `${Math.floor(min)} mins ago`;
        } else if (hour <= 23) {
            return hour < 2 ? `An hour ago` : `${Math.floor(hour)} hours ago`;
        } else {
            return day < 2 ? `A day ago` : `${Math.floor(day)} days ago`;
        }
    }
    console.log(date)
    const currentTime = date(note.Edited)

    return (
        <li onClick={onClick} className="p-[10px] cursor-pointer bg-yellow-100 border-[2px] border-solid border-yellow-200">
            <p>{note.title}</p>
            <p className="italic">LastEdited: {currentTime}</p>
        </li>
    )
}

export default Note;