import { useState, useEffect } from "react";
import "./../../styles/TerminalStyle.css";

function MainContent() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false); // Estado para manejar el estado de copia

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
    setError(null);
  };

  const formatJSON = () => {
    try {
      const parsedJSON = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsedJSON, null, 4));
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError("Error: JSON inválido");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput).then(() => {
      setIsCopied(true);
      alert("Copiado al portapapeles");
      // Restablecer el estado después de 2 segundos
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "Enter") {
        formatJSON();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [jsonInput]);

  return (
    <div className="flex-1 px-5">
      <div className="flex flex-col">
        <div className="flex justify-between items-center my-5">
          <div className="dark:text-white text-sm">
            Escribe o pega tu{" "}
            <span className="text-lime-700 font-bold dark:text-lime-500">
              JSON
            </span>{" "}
            en el área de edición y utiliza el botón para formatearlo y resaltar
            su estructura.
          </div>

          <button
            title="Formatear"
            className="cursor-pointer border border-lime-400 bg-lime-300 flex items-center dark:fill-lime-400 dark:bg-lime-950 hover:bg-opacity-45 dark:hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2 px-5"
            onClick={formatJSON}
          >
            <svg
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 17.804 17.804"
            >
              <g id="SVGRepo_bgCarrier"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <g id="c98_play">
                    <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313 c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04 c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"></path>
                  </g>
                </g>
              </g>
            </svg>
            <span className="text-sm dark:text-lime-400 font-bold pr-1 ml-4">
              Formatear
            </span>
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="wrap">
          <div className="terminal">
            <hgroup className="flex bg-gray-300 px-3 py-1 dark:bg-[#202425] ">
              <p className="flex dark:text-gray-500 items-center ">
                <svg
                  className="text-black dark:text-lime-600 mr-3"
                  width="18px"
                  height="18px"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M7 15L10 12L7 9M13 15H17M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"></path>
                </svg>
                Formatea JSON
              </p>

              <button
                className={`copy_toggle bg-gray-600 ${
                  isCopied ? "bg-green-500" : ""
                }`} // Cambiar color cuando se copia
                type="button"
                onClick={handleCopy} // Manejar el clic para copiar
              >
                <svg
                  width="16px"
                  height="16px"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                  <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                </svg>
              </button>
            </hgroup>

            <div className="p-3 dark:bg-black h-96 bg-white">
              <textarea
                className="dark:bg-black dark:text-white focus:outline-none w-full"
                value={jsonInput}
                onChange={handleInputChange}
                placeholder="Escribe tu JSON aquí..."
                rows={10}
                style={{
                  fontFamily: "monospace",
                  overflowY: "auto",
                  resize: "none",
                }}
              />
            </div>
          </div>
        </div>
        <p className="dark:text-white text-xs">
          Presione las teclas{" "}
          <span className="text-lime-700 font-bold dark:text-lime-400">
            Ctrl + Enter
          </span>{" "}
          para formatear rapidamente
        </p>
      </div>
    </div>
  );
}

export default MainContent;
