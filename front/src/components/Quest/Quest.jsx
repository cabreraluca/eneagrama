import React, { useContext, useEffect } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";
import data  from '../../data/preguntas.json'

export const Quest = ({ quest }) => {
  const questionsLength = data.test.length;
  let { select, setSelect, questionsAnswered, setQuestionsAnswered, setIndexAnswer } = useContext(QuestionsContext);
  const { id, area, question } = quest;

  const checkAnswer = (e) =>{
    if (e.target.value === "si") {
      const newResult = {
        id: id,
        area: area
      }
      setSelect([...select, { id: id, area: area }]);
    }
    if (id !== questionsLength) {
      setIndexAnswer(id);
      setQuestionsAnswered(id);
    } else {
      setQuestionsAnswered(questionsLength)
    }
    localStorage.setItem("id", id);
  }

  localStorage.setItem("storageResults", JSON.stringify(select));


  return (
    <section >
      {questionsAnswered !== questionsLength ? 
      <article>
        <h2>Pregunta {id} de {questionsLength}</h2>
        <p style={{padding: "10px"}}>{question}</p>
        <div style={{marginTop: "10px"}}>
          <button onClick={checkAnswer} value={"si"}>SI</button>
          <button onClick={checkAnswer} value={"no"}>NO</button>
        </div>
      </article>
      : 
      <h2>¡Has contestado todas las preguntas!</h2>}
    </section>
  );
};
