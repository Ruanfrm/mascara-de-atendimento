import React from 'react';
import Formulario from './components/Formulario';
import Resposta from './components/Resposta';
import Footer from './components/Footer';

function App() {
  const [atendimentos, setAtendimentos] = React.useState([]);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Sistema de Atendimento ao Cliente</h1>
      <Formulario />
      <Footer/>
    </div>
  );
}

export default App;
