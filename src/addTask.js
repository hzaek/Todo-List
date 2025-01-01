import { useRef, useState } from "react";
import { SetTasks } from "./Context";
import { Tasks } from "./Context";

import { Lang } from "./Context";
export default function AddTask({ children }) {
  let [taskName, setTaskName] = useState("");
  let setTask = SetTasks("");
  const addRef = useRef(null)
  const inputRef = useRef(null)

  const lang = Lang()
  return (
    <>
    <div dir={lang === 'arabic' ? 'rtl' : ''}>
      <h1 >{lang === 'arabic' ? 'قائمة المهمام' : 'Todo App hala mohammed mo khbar'}</h1>
      <div className="addTaskWrapper">
        <input
          type="text"
          placeholder={lang === 'arabic' ? 'اضف مهمتك الجديده' : "Add your new todo"}
          value={taskName}
          onChange={function (e) {
            setTaskName(e.target.value);
          }}
          onKeyDown={function(e){
            if (e.key === 'Enter'){
                addRef.current.click()
            }
          }}
          ref={inputRef}
        />
        <button
          className="add-bt"
          onClick={(e) => {
            if (inputRef.current.value.trim() === ''){
                return;
            }
            setTaskName("");
            setTask({
              type: "add",
              name: taskName,
            });
          }}
          ref={addRef}
        >
          {lang === 'arabic' ? 'اضافة' : 'Add'}
        </button>
      </div>

      <div className="tasksWrapper">{children}</div>

      <div className="footer text-sm flex justify-between items-center">
        {lang === 'arabic' ? `لديك ${Tasks().length} مهام في قائمة الانتظار` : `You have ${Tasks().length} Pending Tasks` }
        <span className="bg-blue-500 text-white p-1 px-2 font-semibold cursor-pointer" onClick={function(){setTask({type: 'clear'})}}>
          {lang === 'arabic' ? 'مسح الجميع' : "Clear All"}
        </span>
      </div>
      </div>
    </>
  );
}
