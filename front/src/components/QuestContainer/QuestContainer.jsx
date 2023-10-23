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
import {AiOutlineFilePdf} from 'react-icons/ai'

const UserController = new User();

export const QuestContainer = () => {
  
  const { user, accessToken } = useAuth();
  const { select, resultadoQuest, indexAnswer, questionsAnswered, setSelect, informe} = useContext(QuestionsContext);
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
    console.log(resultadoQuest)
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
        <div className="w-[100vw] h-[100%] flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2b2c91" fill-opacity="0.7" d="M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,229.3C672,245,768,235,864,202.7C960,171,1056,117,1152,85.3C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            {
            <div className="h-[100%]">
              <Result results={dbResults} flex={"items-center"}/>
            </div>
            }
          <PDFDownloadLink document={<UserResultsPDF informe={informe} userName={user}/>} fileName="Resultado-Test-Eneagrama">
            <Button className="mt-6 bg-red-400 flex items-center gap-2">Descargar en PDF <AiOutlineFilePdf className="text-xl"/></Button>
          </PDFDownloadLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
 
