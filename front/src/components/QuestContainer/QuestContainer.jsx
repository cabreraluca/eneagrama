import React, { useEffect, useState, useContext } from "react";
import data from "../../data/preguntas.json";
import { Quest } from "../Quest/Quest";
import { ContextPrueba } from "../../context/ContextPrueba";
import { Result } from "../Restult/Result";
import { User } from "../../api";
import { useAuth } from "../../hooks";

const UserController = new User();

export const QuestContainer = () => {
  const {user, accessToken} = useAuth();
  const { select, resultadoQuest } = useContext(ContextPrueba);
  const [quest, setQuest] = useState([]);
  const [testComplete, setTestComplete] = useState(false);

  useEffect(() => {
    setQuest(data.test);
  }, []);
  const updateDBResults = async (array) =>{
    const userId = user._id;
    console.log(userId)
    const results = array;
    await UserController.pushResults(accessToken, userId, {results})
  };
  const submitChange = async (event) => {
    event.preventDefault();
    setQuest([]);
    for (const item of select) {
      resultadoQuest[item.area - 1] += 1;
    }
    console.log(resultadoQuest);
    await updateDBResults(resultadoQuest);
  };

  return (
    <div>
      <form>
        {quest.map((item) => (
          <Quest quest={item} />
        ))}
        {!testComplete ? <input type="submit" onClick={submitChange} /> : <></>}
      </form>
      {testComplete ? (
        <div>
          <h2>
            Terminaste el quest, tus resultados son:
            {<Result result={resultadoQuest}/>}
          </h2>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
