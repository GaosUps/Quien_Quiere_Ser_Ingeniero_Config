const API_BASE_URL='http://127.0.0.1:5000'
export const createGame = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error en la creación del juego:', error);
      throw error;
    }
  };


    export const deleteGame = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al eliminar el juego:', error);
      throw error;
    }
  };

export const upload_questions = async (file) => {
  try {
    const formData = new FormData();
    formData.append('archivo', file); // Agrega el archivo al formulario

    const response = await fetch(`${API_BASE_URL}/upload_questions`, {
      method: 'POST',
      body: formData, // Envía el archivo
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error al subir preguntas:', error);
    throw error;
  }
};
