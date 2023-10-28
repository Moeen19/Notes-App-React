import './index.css';
import { useEffect, useState, useMemo } from 'react';
import Button from './Button.js';
import Create from './Create.js';
import Note from './Note.js';

function Home() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [btn, setBtn] = useState(false);
    const [id, setId] = useState(null);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('ByEdited');

    useEffect(() => {
        let local = JSON.parse(localStorage.getItem('my-notes'));

        if (local) {
            setNotes(local)
        }
    }, [])

    const handleClick = () => {
        setOpen(!open);
        setBtn(false);
        setTitle('');
        setBody('');
    };

    const handleNoteClick = (note) => {
        setOpen(!open)
        setId(note.id)
        setTitle(note.title)
        setBody(note.body)
        setBtn(true)
    };


    let filteredItems = useMemo(() => { 
        return notes.filter(note => {
            return note.title.toLowerCase().includes(search.toLowerCase())
        })
    }, [notes, search, sort]);



    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    };

    const sortNotes = (e) => {
        let s = e.target.value;
        setSort(s)
        let sorted = sortedNotes(s)
        setNotes(sorted)
    }

    const sortedNotes = (sort) => {
        console.log("sort")
        if (sort === "ByEdited") {
            return notes.sort((a, b) => {
                if (a.Edited > b.Edited) {
                    return -1;
                } else if (a.Edited < b.Edited) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else if (sort === "ByAlpha") {
            return notes.sort((a, b) => {
                if (a.title > b.title) {
                    return 1;
                } else if (a.title < b.title) {
                    return -1;
                } else {
                    return 0;
                }
            })
        } else if (sort === "ByCreated") {
            return notes.sort((a, b) => {
                if (a.Created > b.Created) {
                    return 1;
                } else if (a.Created < b.Created) {
                    return -1;
                } else {
                    return 0;
                }
            })
        }
    }

    const handleClickAdd = () => {
        if (title && body) {
            setOpen(!open);
            const notesArray = [...notes, { title, body, id: Math.floor(Math.random() * 1000), Created: Date.now(), Edited: Date.now() }]
            setNotes(notesArray)
            console.log(notes)
            localStorage.setItem("my-notes", JSON.stringify(notesArray));
        }
        setTitle('');
        setBody('');
    };

    const handleTitleEnter = (e) => {
        setTitle(e.target.value);
    };

    const handleBodyEnter = (e) => {
        setBody(e.target.value);
    };


    const handleClickRemove = () => {
        setOpen(!open)
        let remNote = notes.filter((note) => {
            return note.id !== id
        })
        setNotes(remNote)
        localStorage.setItem("my-notes", JSON.stringify(remNote));
        setBtn(false)
    };

    const handleClickUpdate = () => {
        setOpen(!open);
        setBtn(false)
        let updArr = notes.map((note) => {
            if (note.id === id) {
                note.title = title;
                note.body = body;
                note.Edited = Date.now();
            }
            return note;
        })
        setNotes(updArr)
        localStorage.setItem("my-notes", JSON.stringify(updArr));
    };

    const renderNotes = filteredItems?.map((note, index) => {
        return <Note onClick={() => handleNoteClick(note)} note={note} key={index} />
    })

    return (
        <div className={`font-sans relative overflow-hidden overflow-x-hidden ${open && 'overflow-y-hidden'}`}>
            <div className="bg-[#43799c] py-[16px]">
                <div className="max-w-[1200px] w-full mx-auto pl-[250px]">
                    <h1 className="text-[white] font-bold text-[2.25rem] leading-[2.25rem]">Notes App React</h1>
                    <small className="text-[white] font-light">Take notes and never forget!</small>
                </div>
            </div>

            <div className="bg-[#F7F7F7]">
                <div className="max-w-[1200px] mx-auto pl-[250px] w-full">
                    <div className="py-[10px] max-w-[550px] w-full flex gap-[10px]">
                        <input onChange={handleChangeSearch} className="rounded-[8px] outline-none p-[8px]" type="text" placeholder="Search" />
                        <select onChange={sortNotes} className="cursor-pointer rounded-[8px] p-[8px] outline-none" >
                            <option value="ByEdited">By Edited</option>
                            <option value="ByAlpha">By Alphabetically</option>
                            <option value="ByCreated">By Created</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredItems.length === 0 && <p className="text-center mt-[20px]">No notes to show</p>}

            {open && <Create btn={btn} handleClickUpdate={handleClickUpdate} handleClickRemove={handleClickRemove} handleClose={handleClick} body={body} title={title} handleClickAdd={handleClickAdd} handleBodyEnter={handleBodyEnter} handleTitleEnter={handleTitleEnter} />}

            <div className="max-w-[1200px] w-full mt-[30px] pl-[250px] mx-auto">
                <ul className="flex max-w-[600px] flex-col gap-[10px]">
                    {renderNotes}
                </ul>
            </div>

            <div className="max-w-[1200px] mt-[15px] w-full mx-auto pl-[250px]">
                <Button onClick={handleClick} text="Create Note" />
            </div>

        </div>
    )
}

export default Home;