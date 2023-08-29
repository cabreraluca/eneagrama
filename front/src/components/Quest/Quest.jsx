import React, { useContext } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";
import data  from '../../data/preguntas.json'

export const Quest = ({ quest }) => {
  const questionsLength = data.test.length;
  const { select, setSelect, questionsAnswered, setQuestionsAnswered, setIndexAnswer } = useContext(QuestionsContext);
  const { id, area, question } = quest;

  // const handleChange = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setSelect([...select, { id: value, area: area }]);
  //   } else {
  //     setSelect(select.filter((oldValues) => oldValues !== value));
  //   }
  // };

  const checkAnswer = (e) =>{
    console.log(quest)
    if (e.target.value === "si") {
      setSelect([...select, { id: id, area: area }]);
    }
    if (id !== questionsLength) {
      setIndexAnswer(id);
      setQuestionsAnswered(id);
    } else {
      setQuestionsAnswered(questionsLength)
    }
  }


  return (
    <section >
      {questionsAnswered !== questionsLength ? 
      <article>
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
