import Form from "./components/Form";
import logoCTC from "./images/logoctc.gif";
import logo from "./images/logo_ctc.png";
import background from "./images/ctc.png";
import { useState } from "react";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };
  return (
    <div className="relative bg-black min-h-screen">
      <img
        src={background}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover object-left z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-0 backdrop-filter"></div>
      <div className="relative z-10 p-4 sm:p-8 md:p-10 lg:p-12">
        <img
          src={logoCTC}
          alt="Logo"
          className="mx-auto mb-16 mt-[-100px] sm:mb-10 md:mb-10 md:mt-[-100px] sm:mt-[-100px] z-50 sm:w-[400px] md:w-[400px] xl:w-[450px] xl:mt-[-150px] overflow-hidden"
          // style={{ marginTop: "-130px" }}
        />
        <div className="mx-auto relative  mt-[-150px] ">
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-10">
            Ingreso de Estudiantes Barranquilla 📝
          </p>
          {!formSubmitted && (
            <p className="text-white text-lg sm:text-xl md:text-sm text-center mb-4 sm:mb-6 md:mb-10 max-w-full sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
              ¡Hola! Este cuestionario nos permitirá obtener información para
              conocerte un poco más, entender mejor tus intereses, preparación y
              metas para el futuro, ya sea continuar con tu educación o ingresar
              al mercado laboral. Tus respuestas son importantes y
              confidenciales; por eso, te invitamos a leer con calma, contestar
              de manera honesta y a consultarle a tu profesor o profesora si
              tienes alguna pregunta.
            </p>
          )}
          <Form handleFormSubmit={handleFormSubmit} />
          <img
            src={logo}
            alt="Logo"
            className="mx-auto my-4 sm:my-6 md:my-10 z-50 w-[100px] sm:w-[120px] md:w-[150px]"
          />
          {/* <p className="text-white text-xs sm:text-sm md:text-base text-center italic">
            Made with 🤍 by DATA Team
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default App;
