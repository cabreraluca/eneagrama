import React, { useContext, useEffect } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";
import data  from '../../data/preguntas.json';
import { Progress, Button } from "@material-tailwind/react";

export const Quest = ({ quest }) => {

  const buttonStyle = "bg-orange-800 w-[40%] lg:p-4";
  const questionsLength = data.test.length;
  const { select, setSelect, questionsAnswered, setQuestionsAnswered, setIndexAnswer } = useContext(QuestionsContext);
  const { id, area, question } = quest;

  useEffect(() => {
    select.length !== questionsLength ? localStorage.setItem("storageResults", JSON.stringify(select)) : "";
  }, [select])
  
  
  const checkAnswer = (e) =>{
    if (e.target.value === "si") {
      console.log(select)
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
      <article className="h-[50vh] lg:w-[50vw] flex items-center flex-col justify-evenly">
        <div className="flex items-center flex-col px-2 gap-2">
          <h2 className="text-2xl">Pregunta {id} de {questionsLength}</h2>
          <Progress value={(id*100)/questionsLength} color="blue-gray" className="w-[30vw]"/>
          <p className="text-center text-lg p-2 h-[10rem]">{question}</p>
        </div>
        <div className="flex w-[60%] justify-evenly">
          <Button onClick={checkAnswer} className={buttonStyle} value={"si"}>SI</Button>
          <Button onClick={checkAnswer} className={buttonStyle} value={"no"}>NO</Button>
        </div>
      </article>
      : 
      <h2 className="text-[2rem] text-blue-800">¡Has contestado todas las preguntas!</h2>}
    </section>
  );
};
