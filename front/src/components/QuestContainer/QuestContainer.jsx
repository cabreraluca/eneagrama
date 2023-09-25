import React, { useEffect, useState, useContext } from "react";
import data from "../../data/preguntas.json";
import { Quest } from "../Quest/Quest";
import { QuestionsContext } from "../../context/QuestionsContext";
import { Result } from "../Result/Result";
import { User } from "../../api";
import { useAuth } from "../../hooks";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { UserResultsPDF } from "../Users/UserResultsPDF";
import { Button } from "@material-tailwind/react";

const UserController = new User();

export const QuestContainer = () => {
  
  const { user, accessToken } = useAuth();
  const { select, resultadoQuest, indexAnswer, questionsAnswered, setSelect} = useContext(QuestionsContext);
  const [quest, setQuest] = useState({});
  const [testComplete, setTestComplete] = useState(false);
  const [dbResults, setDbResults] = useState([]);
  const [testInProgress, setTestInProgress] = useState(true);
  let idStorage;

  useEffect(() => {
    const fetchDataUser = async () =>{
      const userData = await UserController.getUser(accessToken, user._id);
      if(userData.finished){
        setTestComplete(true);
        setDbResults(userData.results);
        userData.password = null;
        UserController.updateUser( user._id, userData);
      }      
    }
    fetchDataUser()
    if (!user.started) {
        idStorage = 0
        localStorage.removeItem("id");
        localStorage.removeItem("storageResults");
        setSelect([]);
    }
  }, [])
  

  useEffect(() => {
    let idStorage = JSON.parse(localStorage.getItem("id")) || 0;
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
      <main className="w-[100vw] flex flex-col items-center">
        {!testComplete ? <Quest quest={quest}/> : <></>}
        {questionsAnswered === data.test.length && !testComplete ? <input className="text-center cursor-pointer border-2 p-2 bg-orange-800" type="submit" onClick={submitChange} value={"Generar informe"}/> : <></>}
      </main>
      {testComplete ? (
        <div className="w-[100vw] h-[50vh] flex flex-col items-center justify-center">
          <h1 className="text-[2rem] font-bold">
             Tus resultados son: </h1>
            {dbResults.map((res) => (
              <Result key={res.area} result={res} />
            ))}
          <PDFDownloadLink document={<UserResultsPDF result={dbResults}/>} fileName="Resultado-Test-Eneagrama">
            <Button className="mt-6 bg-red-400">Descargar en PDF</Button>
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
 
