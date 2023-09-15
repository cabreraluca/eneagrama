import React, { useEffect, useState, useContext } from "react";
import data from "../../data/preguntas.json";
import { Quest } from "../Quest/Quest";
import { QuestionsContext } from "../../context/QuestionsContext";
import { Result } from "../Result/Result";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { UserResultsPDF } from "../Users/UserResultsPDF";

const UserController = new User();

export const QuestContainer = () => {
  
  const { user, accessToken } = useAuth();
  const { select, resultadoQuest, indexAnswer, questionsAnswered} = useContext(QuestionsContext);
  const [quest, setQuest] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  const [dbResults, setDbResults] = useState([]);
  const [testInProgress, setTestInProgress] = useState(true);

  useEffect(() => {
    const fetchData = async () =>{
      const userData = await UserController.getUser(accessToken, user._id);
      if(userData.finished){
        setTestComplete(true);
        setDbResults(userData.results);
      }
      userData.started = true;
      userData.password = null;
      UserController.updateUser( user._id, userData);
    }
    fetchData()
  }, [])
  

  useEffect(() => {
    const idStorage = JSON.parse(localStorage.getItem("id")) || 0;
    const allQuestions  = data.test;
    setQuest(allQuestions[idStorage])
  }, [indexAnswer]);
  
  const updateDBResults = async (results) => {
    const userData = await UserController.getUser(accessToken, user._id);
    userData.results = results;
    userData.finished = true;
    userData.password = null;
    await UserController.updateUser(user._id, userData)
  };

  const submitChange = async (event) => {
    event.preventDefault();
    setQuest([]);
    for (const item of select) {
      if (item.area === resultadoQuest[item.area - 1].area) {
        resultadoQuest[item.area - 1].puntaje += 1;
      }
    }
    setDbResults(resultadoQuest);
    localStorage.removeItem("id");
    localStorage.removeItem("storageResults");
    await updateDBResults(resultadoQuest);
    setTestComplete(true);
    setTestInProgress(false);
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
            {dbResults.map((res) => (
              <Result key={res.area} result={res} />
            ))}
          </h2>
          <PDFDownloadLink document={<UserResultsPDF result={dbResults}/>} fileName="Resultado-Test-Eneagrama">
            <button>Descargar</button>
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
 
