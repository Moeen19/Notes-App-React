import Button from './Button.js';

function Create({ handleClose, handleClickUpdate, btn, handleClickRemove, handleClickAdd, handleBodyEnter, handleTitleEnter, title, body }) {

    return (
        <div className="w-screen h-screen inset-0  bg-[black]/20 absolute">
            <div className="inset-0 h-max absolute max-w-[502px] p-[20px] m-auto w-full rounded-[8px] bg-white">
                <div className="flex flex-col gap-[20px]">
                    <input value={title} spellCheck="false" onChange={handleTitleEnter} className="title border-solid border-[1px] p-[5px] rounded-[4px] border-[#E7E5E4] outline-none" type="text" placeholder="Title" />
                    <textarea value={body} spellCheck="false" onChange={handleBodyEnter} className="description border-solid border-[1px] min-h-[200px] p-[5px] rounded-[4px] border-[#E7E5E4] outline-none" placeholder="Description" />
                </div>
                <div className="max-w-[502px] mt-[12px] w-full justify-between flex">
                    <Button onClick={handleClose} text="Back" />
                    {!btn && <Button onClick={handleClickAdd} text="Add" />}
                    <div className="max-w-[166px] w-full flex gap-[10px]">
                        {btn && <Button onClick={handleClickRemove} text="Remove" />}
                        {btn && <Button onClick={handleClickUpdate} text="Update" />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;