import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

let tasksContext = createContext(null);
let setTaskContext = createContext(null);

let langContext = createContext(null);
let setLangContext = createContext(null);

function funcTasks(tasks, action) {
  switch (action.type) {
    case "add": {
      localStorage.setItem(
        "tasks",
        JSON.stringify([{ name: action.name }, ...tasks])
      );
      return [{ name: action.name }, ...tasks];
    }
    case "del": {
      let copy = tasks.filter((el) => {
        return tasks.indexOf(el) !== action.id;
      });
      localStorage.setItem("tasks", JSON.stringify(copy));
      return copy;
    }
    case "edit": {
      let copy = [...tasks];
      copy[action.id] = { ...tasks[action.id], name: action.value };
      localStorage.setItem("tasks", JSON.stringify(copy));
      return copy;
    }
    case "clear": {
      localStorage.setItem("tasks", JSON.stringify([]));
      return [];
    }
    default: {
      console.log("error");
    }
  }
}

function LG() {
  if (localStorage.getItem("lang") !== null) {
    return localStorage.getItem("lang");
  } else {
    localStorage.setItem("lang", "english");
    return localStorage.getItem("lang");
  }
}
function initialTasks() {
  if (localStorage.getItem("tasks") !== null) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
}
export function TaskProvider({ children }) {
  let [tasks, setTasks] = useReducer(funcTasks, initialTasks());
  let [lang, setLang] = useState(LG());

  useEffect(() => {
    // Dynamically change the global CSS variables based on state
    document.documentElement.style.setProperty(
      "--lang",
      lang === "english" ? "0" : "calc(100% - 85px)"
    );
  }, [lang]);
  return (
    // lang and set lang
    <setLangContext.Provider value={setLang}>
      <langContext.Provider value={lang}>
        {/* Tasks */}
        <tasksContext.Provider value={tasks}>
          {/* Set Tasks */}
          <setTaskContext.Provider value={setTasks}>
            {children}
          </setTaskContext.Provider>
          {/* Set Tasks */}
        </tasksContext.Provider>
        {/* Tasks */}
      </langContext.Provider>
    </setLangContext.Provider>
    // lang and set lang
  );
}

export function SetTasks() {
  return useContext(setTaskContext);
}
export function Tasks() {
  return useContext(tasksContext);
}

export function Lang() {
  return useContext(langContext);
}
export function SetLang() {
  return useContext(setLangContext);
}
