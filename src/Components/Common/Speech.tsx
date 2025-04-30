import React, { useState } from 'react';
import * as annyang from 'annyang';
import { useNavigate } from 'react-router-dom';

const Speech: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleListening = (): void => {
    if (!annyang) return;

    if (isListening) {
      annyang.abort();
      setIsListening(false);
    } else {
      const commands: Record<string, () => void> = {
        login: () => navigate('/login'),
        register: () => navigate('/register'),
        home: () => navigate('/'),
      };

      annyang.addCommands(commands);
      annyang.start();
      setIsListening(true);
    }
  };

  return (
    <div className="bg-transparent flex flex-col justify-center items-center">
      <div className="relative w-16 h-8">
        <input
          type="checkbox"
          id="voiceToggle"
          className="sr-only"
          checked={isListening}
          onChange={toggleListening}
          disabled={!annyang}
        />
        <label
          htmlFor="voiceToggle"
          className={`block w-full h-full rounded-full cursor-pointer ${
            isListening ? "bg-[#007bff]" : "bg-gray-300"
          } transition duration-300`}
        >
          <span
            className={`absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transform transition duration-300 ${
              isListening ? "translate-x-8" : ""
            }`}
          ></span>
        </label>
      </div>
      <span className="mt-2 text-sm text-center text-gray-700">
        {isListening ? "Stop voice assist" : "Activate voice assist"}
      </span>
    </div>
  );
};

export default Speech;
