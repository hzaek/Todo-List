import { useState } from "react";
import { Tasks } from "./Context";
import { SetTasks } from "./Context";

import { Lang } from "./Context";

export default function TaskList() {
    
  let tasks = Tasks();
  return (
    <>
      {tasks.map((el, index) => {
        return <Task task={el.name} index={index} key={index} />;
      })}
    </>
  );
}

function Task({ task, index }) {
  let setTask = SetTasks();
  let currentTask = Tasks()[index].name;
  let [edit, setEdit] = useState(false);
  const lang = Lang()
  return (
    <div className="task">
      {edit ? (
        <input
          className="edit-task taskHover"
          type="text"
          
          value={currentTask}
          onChange={function (e) {
            setTask({ type: "edit", id: index, value: e.target.value });
          }}
        />
      ) : (
        <p className="p-task taskHover">{task}</p>
      )}
      <div className="control"  style={{fontWeight: '700'}}>
        <button
          className="del"
          onClick={() => {
            setTask({
              type: "del",
              id: index,
            });
          }}
        >
          {lang === 'english' ? 'Del' : 'حذف'}
        </button>
        <button
          className="edit"
          onClick={function (e) {
            setEdit(!edit);
          }}
        >
          {edit ? lang === 'english' ? "Save" : 'حفظ'  : lang === 'english' ? 'Edit' : 'تعديل'}
        </button>
      </div>
    </div>
  );
}
