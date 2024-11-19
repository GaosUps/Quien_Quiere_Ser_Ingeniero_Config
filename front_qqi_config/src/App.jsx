import React, { useState, useEffect } from "react";
import Logo from "./components/Logo";
import InputField from "./components/InputField";
import SelectField from "./components/SelectedField";
import Button from "./components/Button";
import MessageCard from "./components/MessageCard";
import { createGame, deleteGame } from "./services/apiservice";
function App() {
  const [numPlayers, setNumPlayers] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

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
