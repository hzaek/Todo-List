import "./App.css";
import { useEffect, useState, useReducer, useRef } from "react";

import AddTask from "./addTask";
import TaskList from "./taskList";
import { TaskProvider } from "./Context";

import { Lang } from "./Context";
import { SetLang } from "./Context";



export default function App() {
  return (
    <div className="App">
      <main>
        <TaskProvider>
          <Language />
          <AddTask>
            <TaskList />
          </AddTask>
        </TaskProvider>
      </main>
    </div>
  );
}

function Language() {

  let backRef = useRef(null)
  let lang = Lang()
  let setLang = SetLang()
  useEffect(function(){
    localStorage.setItem('lang',lang)
    if (lang === 'arabic'){
      backRef.current.classList.add('backgroundToArabic')
      backRef.current.classList.remove('background')
    }
  }, [lang])
  return (
    <>
    <div className="lang">
      <div className="background" ref={backRef}>E</div>
      <div
        className="arabic"
        onClick={function () {
          if (lang !== 'arabic'){
            setLang('arabic')
            backRef.current.classList.add('backgroundToArabic')
            backRef.current.classList.remove('background')
          }
        }}
        style={{
          color:  lang === "english" ? "black" : 'white'
          
        }}
      >
        اللغة العربية
      </div>
      <div
        className="english"
        style={{ color: lang === "english" ? "white" : "black" }}
        onClick={function () {
          if (lang !== 'english'){
            setLang('english')
            backRef.current.classList.remove('backgroundToArabic')
            backRef.current.classList.add('background')
          }
        }}
      >
        English
      </div>
    </div>
    </>
  );
}
