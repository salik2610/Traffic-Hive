import React, { useState } from 'react';
import './bot.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { SampleJSONData } from './jsondata';
import { LuLanguages, LuLoader, LuPanelLeftOpen  } from "react-icons/lu";
import GitHubRedirect from './GitHubRedirect'; // Ensure this import path is correct

function HelpBot() {
  const genAI = new GoogleGenerativeAI('AIzaSyDd33EAz2WGpjvC8GLIWOl4REEtPIbBV0s');
  const safetySettings = [{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }];
  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
  const [selectedJSON, setSelectedJSON] = useState(SampleJSONData[0].data);
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('English'); // State for selected language
  const [response, setResponse] = useState('Welcome to Help Desk 🙏');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleJSONSelect = (event) => {
    const selectedId = parseInt(event.target.value);
    const selectedData = SampleJSONData.find(item => item.id === selectedId).data;
    setSelectedJSON(selectedData);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    const result = await model.generateContent(JSON.stringify({ jsonInput: selectedJSON }) + "You have to use the given data to answer this questions, if not in the data then say that its not mentioned and answer on your behalf, also talk like indian traffic  police officer bot , and talk only in +" + language + " , INPUT:" + prompt + ", also while answering make sure to mention all the acts, clause and actions that can be and will be taken by the Indian Govenment based on the crime that has been commited and do not use markdown language in the output");
    setResponse(result.response.text());
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <GitHubRedirect /> {/* Add the GitHubRedirect component here */}
      <h1 style={{textAlign:'center'}}>✦ Traffic BOT ✦</h1>
      {isLoading && <div className='botloading'><LuLoader fontSize={40}></LuLoader></div>}
      {!isLoading && <p className='output'>{response}</p>}
      <form onSubmit={handleSubmit}>
        <div className='BOT_optionContainer'>
          {SampleJSONData.map(json => (
            <div className='BOT_optionblock' key={json.id}>
              <input
                type="radio"
                id={`json${json.id}`}
                name="jsonData"
                value={json.id}
                checked={selectedJSON === json.data}
                onChange={handleJSONSelect}
              />
              <label htmlFor={`json${json.id}`}>{json.name}</label>
            </div>
          ))}
        </div>
        <div className='BOT_optionContainer'>
          <div className='BOT_optionblock'> 
          <LuLanguages></LuLanguages>

            <input
              type="radio"
              id="englishLanguage"
              name="language"
              value="English"
              checked={language === "English"}
              onChange={handleLanguageChange}
            />
            <label htmlFor="englishLanguage">English</label>
          </div>
          <div className='BOT_optionblock'>
            <LuLanguages></LuLanguages>
            <input
              type="radio"
              id="hindiLanguage"
              name="language"
              value="Hindi"
              checked={language === "Hindi"}
              onChange={handleLanguageChange}
            />
            <label htmlFor="hindiLanguage">Hindi</label>
          </div>
        </div>
        <div>
          <input
            type="text"
            id="promptInput"
            autoComplete='false'
            aria-autocomplete='false'
            value={prompt}
            className='BOT_inputbox'
            placeholder='Enter Your Query / अपनी समस्या दर्ज करें'
            onChange={handlePromptChange}
          />
        </div>

        <button type="submit" style={{color: 'white',cursor:'pointer', background: 'linear-gradient(45deg, #535353, #767676, #4c4c4c)', width: '50%', margin: '4vh 25%', fontSize: '2rem', borderRadius: '0.7rem', padding: '0 1rem', border: 'none'}}>Submit / जमा करें</button>
      </form>
    </div>
  );
}

export default HelpBot;

