import React, { useContext, useEffect } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";
import data  from '../../data/preguntas.json';
import { Progress, Button } from "@material-tailwind/react";
import { User } from "../../api";
import { useAuth } from "../../hooks";  
import './Quest.css'

const UserController = new User();

export const Quest = ({ quest }) => {

  const { user, accessToken } = useAuth();
  const buttonStyle = "bg-orange-800 w-[40%] lg:p-4 text-[1rem]";
  const questionsLength = data.test.length;
  const { select, setSelect, questionsAnswered, setQuestionsAnswered, setIndexAnswer } = useContext(QuestionsContext);
  const { id, area, question } = quest;

  const setStarted = async () => {
    const userData = await UserController.getUser(accessToken, user._id);
    userData.started = true;
    userData.password = null;
    UserController.updateUser( user._id, userData);
  }

  useEffect(() => {
    select.length !== questionsLength ? localStorage.setItem("storageResults", JSON.stringify(select)) : "";
  }, [select])
  
  
  const checkAnswer = (e) =>{
    if (id === 1) {
       setStarted()
    }
    if (e.target.value === "si") {
      const newResult = {
        id: id,
        area: area
      }
      setSelect([...select, newResult]);
    }
    if (id !== questionsLength) {
      setIndexAnswer(id);
      setQuestionsAnswered(id);
    } else {
      setQuestionsAnswered(questionsLength)
    }
    localStorage.setItem("id", id);
  }


  return (
    <section className="w-[100%] h-[70vh] flex items-center justify-center">
      {questionsAnswered !== questionsLength ? 
      <article className="h-[100vh] lg:w-[50vw] flex items-center flex-col justify-evenly xl:justify-center mt-6 xl:mt-0">
        <div className="flex items-center flex-col px-2 gap-2 w-[100vw]">
          <h2 className="text-2xl">Pregunta {id} de {questionsLength}</h2>
          <Progress value={(id*100)/questionsLength} color="blue-gray" className="w-[30vw]"/>
          <p className="text-center text-[1.3rem] xl:text-[1.8rem] p-2 h-[10rem] font-semibold w-[70vw]">{question}</p>
        </div>
        <div className="flex w-[90%] xl:w-[60%] justify-evenly">
          <button onClick={checkAnswer} className="buttonQuest" value={"si"}>SI</button>
          <button onClick={checkAnswer} className="buttonQuest" value={"no"}>NO</button>
        </div>
      </article>
      : 
      <h2 className="text-[2rem] text-blue-800">¡Has contestado todas las preguntas!</h2>}
    </section>
  );
};
