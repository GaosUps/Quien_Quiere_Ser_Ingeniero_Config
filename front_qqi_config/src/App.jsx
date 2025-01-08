import React, { useState, useEffect } from "react";
import Logo from "./components/Logo";
import InputField from "./components/InputField";
import SelectField from "./components/SelectedField";
import Button from "./components/Button";
import MessageCard from "./components/MessageCard";
import {
  createGame,
  deleteGame,
  upload_questions,
} from "./services/apiservice";
import RadioButtonGroup from "./components/RadioButtonGroup";

function App() {
  const [numPlayers, setNumPlayers] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);

  const validateFields = () => {
    const newErrors = {};
    if (!numPlayers) newErrors.numPlayers = "Este campo es requerido";
    if (!numQuestions) newErrors.numQuestions = "Este campo es requerido";
    if (!subject) newErrors.subject = "Este campo es requerido";
    if (!level) newErrors.level = "Este campo es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCreate = async () => {
    if (validateFields()) {
      try {
        const data = {
          jugadores: numPlayers,
          numpreguntas: numQuestions,
          materia: subject,
          nivel: level,
        };
        const response = await createGame(data);
        console.log(`Juego creado: ${JSON.stringify(response)}`);
        setMessage({ type: "success", text: "Éxito: Configuración creada" });
        setNumPlayers("");
        setNumQuestions("");
      } catch (error) {
        console.error("Error al crear el juego:", error);
        setMessage({ type: "error", text: "Error al crear el juego" });
      }
    } else {
      setMessage({
        type: "error",
        text: "Error: Llene todos los campos correctamente",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteGame();
      console.log(`Juego eliminado: ${JSON.stringify(response)}`);
      setMessage({
        type: "success",
        text: "Éxito: Configuración eliminada correctamente",
      });
    } catch {
      setMessage({ type: "error", text: "Error al eliminar el juego" });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Por favor, selecciona un archivo para subir." });
      return;
    }
  
    try {
      const response = await upload_questions(file);
      console.log(`Archivo subido: ${JSON.stringify(response)}`);
      setMessage({
        type: "success",
        text: "Éxito: Archivo subido exitosamente",
      });
    } catch {
      setMessage({ type: "error", text: "No se pudo subir el archivo" });
    }
  };
  const subjectOptions = [
    { value: "", label: "Selecione una opcion" },
    { value: "matematicas", label: "Matemáticas" },
    { value: "ciencias", label: "Ciencias" },
    { value: "historia", label: "Historia" },
    { value: "literatura", label: "Literatura" },
  ];

  const levelOptions = [
    { value: "", label: "Selecione una opcion" },
    { value: "1", label: "Fácil" },
    { value: "2", label: "Medio" },
    { value: "3", label: "Difícil" },
  ];
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const config = [
    { value: "conf_juego", label: "Configurar Juego" },
    { value: "conf_preguntas", label: "Configurar Preguntas" },
  ];
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Background.webp')" }}
    >
      <Logo />

      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Configuración del Juego
        </h1>
        <RadioButtonGroup
          options={config}
          name="radio-buttons-group"
          title="Opciones"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        />
        {selectedOption === "conf_juego" && (
          <form>
            {message.text && (
              <MessageCard message={message.text} type={message.type} />
            )}
            <InputField
              label="Número de Jugadores"
              type="number"
              value={numPlayers}
              onChange={(e) => setNumPlayers(e.target.value)}
              error={errors.numPlayers}
            />
            <InputField
              label="Número de Preguntas"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              error={errors.numQuestions}
            />
            <SelectField
              label="Materia"
              options={subjectOptions}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              error={errors.subject}
            />
            <SelectField
              label="Nivel"
              options={levelOptions}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              error={errors.level}
            />

            <div className="flex justify-between mt-6">
              <Button label="Crear" onClick={handleCreate} color="green" />
              <Button label="Eliminar" onClick={handleDelete} color="red" />
            </div>
          </form>
        )}
        {selectedOption === "conf_preguntas" && (
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">
              Inserte las preguntas
            </h3>
            {message.text && (
              <MessageCard message={message.text} type={message.type} />
            )}
            <a
              className="text-blue-400 hover:underline text-sm mb-4 inline-block"
              download
              href="./cargar_archivo_preguntas.xlsm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar archivo de referencia
            </a>
            <div className="mb-4">
              <label
                className="block text-white font-medium mb-2"
                htmlFor="archivo"
              >
                Subir archivo
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="archivo"
                  name="archivo"
                  accept=".xlsx,.xls,.xlsm"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 
            file:rounded-lg file:border-0 file:text-sm file:font-semibold 
            file:bg-blue-500 file:text-white hover:file:bg-blue-600 
            bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
                <Button label="Subir" onClick={handleUpload} color="green" />
            <table className="table-auto w-full mt-4 text-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2">Questions</th>
                </tr>
              </thead>
              <tbody>{/* Aquí puedes agregar dinámicamente filas */}</tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <img
            src="/GaosMini_blackbg.webp"
            alt="GAOS Mini Logo"
            width={48}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
