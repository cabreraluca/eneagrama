import React, { useEffect, useState, useContext } from "react";
import data from "../../data/preguntas.json";
import { Quest } from "../Quest/Quest";
import { QuestionsContext } from "../../context/QuestionsContext";
import { Result } from "../Result/Result";
import { User } from "../../api";
import { useAuth } from "../../hooks";

const UserController = new User();

export const QuestContainer = () => {
  
  const { user, accessToken } = useAuth();
  const { select, resultadoQuest, indexAnswer, questionsAnswered } = useContext(QuestionsContext);
  const [quest, setQuest] = useState({});
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    const allQuestions  = data.test;
    setQuest(allQuestions[indexAnswer]);
  }, [indexAnswer]);
  

  const updateDBResults = async (results) => {
    const userId = user._id;
    await UserController.pushResults(accessToken, userId, { results });
  };

  const submitChange = async (event) => {
    event.preventDefault();
    setQuest([]);
    for (const item of select) {
      if (item.area === resultadoQuest[item.area - 1].area) {
        resultadoQuest[item.area - 1].puntaje += 1;
      }
    }

    await updateDBResults(resultadoQuest);
    setTestComplete(true);
  };

  return (
    <div>
      <main>
        {!testComplete ? <Quest quest={quest}/> : <></>}
        {questionsAnswered === data.test.length && !testComplete ? <input type="submit" onClick={submitChange} value={"Generar informe"}/> : <></>}
      </main>
      {testComplete ? (
        <div>
          <h2>
             Tus resultados son:
            {resultadoQuest.map((res) => (
              <Result key={res.area} result={res} />
            ))}
          </h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
