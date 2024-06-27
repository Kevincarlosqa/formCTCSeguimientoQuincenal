/* eslint-disable react/jsx-key */
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import RatingSelector from "./RatingSelector";
import CheckboxGroup from "./CheckboxGroup";
import Lottie from "lottie-react";
import check from "../images/check.json";
import Select from "./Select";
import InputField from "./InputField";

function Form() {
  const [formData, setFormData] = useState({
    nombre_apellido: "",
    nombre_colegio: "",
    grado_seccion: "",
    profesor: "",
    instrucciones_comprensibles: "",
    comodidad_preguntas_estudiantes: "",
    profesor_creatividad: "",
    colaboracion_profesor: "",
    problemas_tecnicos: "",
    otros_problemas_tecnicos: "",
    eficiencia_solucion_problemas_tecnicos: "",
    gusto_de_clases: "",
    mejoras_clases: "",
    satisfaccion_ia: "",
    nps: "",
    csat: "",
    projectId: 19,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  // console.log(formData);
  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Elimina el error cuando el usuario comienza a llenar el campo
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: "",
    // }));
  };

  const optionalFields = ["otros_problemas_tecnicos"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPageValid = validatePage();

    if (!isPageValid) {
      return;
    }

    try {
      const response = await axios.post(
        //DESCOMENTAR SOLO EL PRIMERO PARA PRODUCCION
        "api/v1/db/data/v1/crack_sheets/seguimiento_quincenal",
        // "http://localhost:8010/proxy",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "xc-token": import.meta.env.VITE_NOCODB_KEY,
          },
          withCredentials: false,
          crossdomain: true,
        }
      );
      console.log(response.data);
      setSuccessMessage(
        `¡Gracias por tus respuestas, nos ayudarán a entender cómo podemos mejorar en este proceso de enseñanza!`
      );
      setErrorMessage("");
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setErrorMessage("Error al enviar los datos. Inténtelo de nuevo.");
    }
  };

  const nombreColegioOptions = [
    {
      label: "I.E. Normal Superior De La Presentación",
      value: "I.E. Normal Superior De La Presentación",
    },
  ];
  const problemasTecnicosOptions = [
    {
      label: "Conexión a internet lenta o inestable",
      value: "Conexión a internet lenta o inestable",
    },
    {
      label: "Problemas con la plataforma Zoom",
      value: "Problemas con la plataforma Zoom",
    },
    {
      label: "Micrófono o cámara no funcionan",
      value: "Micrófono o cámara no funcionan",
    },
    {
      label: "Problemas de audio o sonido distorsionado",
      value: "Problemas de audio o sonido distorsionado",
    },
    {
      label: "No hubieron problemas técnicos",
      value: "No hubieron problemas técnicos",
    },
    {
      label: "Otro",
      value: "Otro",
    },
  ];

  const pages = [
    [
      <InputField
        key="nombre_apellido"
        label="Nombre y apellido"
        name="nombre_apellido"
        value={formData.nombre_apellido}
        onChange={handleChange}
        placeholder="Ingrese su nombre completo"
        error={errors.nombre_apellido}
      />,
      <Select
        key="nombre_colegio"
        label="Nombre del Colegio"
        name="nombre_colegio"
        options={nombreColegioOptions}
        value={formData.nombre_colegio}
        onChange={handleChange}
        placeholder="Seleccione su institución educativa"
        isOptional={false}
        error={errors.nombre_colegio}
      />,
      <InputField
        key="grado_seccion"
        label="Grado y sección"
        name="grado_seccion"
        value={formData.grado_seccion}
        onChange={handleChange}
        placeholder="Ingrese su grado y sección"
        error={errors.grado_seccion}
      />,
      <InputField
        key="profesor"
        label="Nombre del/la profesor(a) CTC"
        name="profesor"
        value={formData.profesor}
        onChange={handleChange}
        placeholder="Ingrese el nombre del/la profesor(a) CTC"
        isOptional={false}
        error={errors.profesor}
      />,
      <RatingSelector
        start={1}
        end={5}
        label="En una escala del 1 al 5, ¿qué tan claras y comprensibles son las instrucciones proporcionadas por el/la profesor(a) CTC?"
        colorType="default"
        selectedValue={String(formData.instrucciones_comprensibles || 0)}
        onChange={handleChange}
        error={errors.instrucciones_comprensibles}
        name="instrucciones_comprensibles"
      />,
      <RatingSelector
        start={1}
        end={5}
        label="En una escala del 1 al 5, ¿qué tan cómodos se sienten los estudiantes al hacer preguntas al/la profesor(a) CTC?"
        colorType="default"
        selectedValue={String(formData.comodidad_preguntas_estudiantes || 0)}
        onChange={handleChange}
        error={errors.comodidad_preguntas_estudiantes}
        name="comodidad_preguntas_estudiantes"
      />,
      <RatingSelector
        start={1}
        end={5}
        label="En una escala del 1 al 5, ¿qué tan creativo(a) es el/la profesor(a) CTC para mantener a los estudiantes motivados e interesados?"
        colorType="default"
        selectedValue={String(formData.profesor_creatividad || 0)}
        onChange={handleChange}
        error={errors.profesor_creatividad}
        name="profesor_creatividad"
      />,
      <RatingSelector
        start={1}
        end={5}
        label="En una escala del 1 al 5, ¿qué tan buena es la colaboración entre usted y el/la profesor(a) CTC?"
        colorType="default"
        selectedValue={String(formData.colaboracion_profesor || 0)}
        onChange={handleChange}
        error={errors.colaboracion_profesor}
        name="colaboracion_profesor"
      />,
      <CheckboxGroup
        label="En las últimas 2 semanas, ¿qué problemas técnicos surgieron durante las clases? Marque todas las que apliquen."
        name="problemas_tecnicos"
        options={problemasTecnicosOptions}
        selectedValues={
          formData.problemas_tecnicos
            ? formData.problemas_tecnicos.split(",")
            : []
        }
        onChange={handleChange}
        maxSelections={6}
        error={errors.problemas_tecnicos}
        isOptional={false}
      />,
      <InputField
        key="otros_problemas_tecnicos"
        label="Si marcaste 'Otro' especifica que problemas técnicos surgieron"
        name="otros_problemas_tecnicos"
        value={formData.otros_problemas_tecnicos}
        onChange={handleChange}
        isOptional={true}
        error={errors.otros_problemas_tecnicos}
      />,
      <RatingSelector
        start={1}
        end={5}
        label="En una escala del 1 al 5, ¿qué tan rápido y eficiente se solucionaron los problemas técnicos durante las clases? Marcar solamente si hubo problemas técnicos."
        colorType="default"
        selectedValue={String(
          formData.eficiencia_solucion_problemas_tecnicos || 0
        )}
        onChange={handleChange}
        error={errors.eficiencia_solucion_problemas_tecnicos}
        isOptional={true}
        name="eficiencia_solucion_problemas_tecnicos"
      />,
      <InputField
        key="gusto_de_clases"
        label="¿Qué es lo que más le gustó de nuestras clases en las últimas dos semanas?"
        name="gusto_de_clases"
        value={formData.gusto_de_clases}
        onChange={handleChange}
        error={errors.gusto_de_clases}
      />,
      <InputField
        key="mejoras_clases"
        label="¿Qué aspectos cree que podríamos mejorar en nuestras clases?"
        name="mejoras_clases"
        value={formData.mejoras_clases}
        onChange={handleChange}
        error={errors.mejoras_clases}
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala del 0 al 10, ¿qué tanto recomendaria a otro(a) profesor(a) trabajar con CTC?"
        colorType="nps"
        selectedValue={String(formData.nps || 0)}
        onChange={handleChange}
        error={errors.nps}
        name="nps"
      />,
      <RatingSelector
        start={0}
        end={10}
        label="En una escala del 0 al 10, ¿qué tan satisfecho(a) se encuentra trabajando con CTC?"
        colorType="gradient"
        selectedValue={String(formData.csat || 0)}
        onChange={handleChange}
        error={errors.csat}
        name="csat"
      />,
    ],
  ];

  const handleNextPage = () => {
    if (validatePage()) {
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      }
    }
    console.log(formData);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const validatePage = () => {
    const newErrors = {};

    // Obtener los nombres de los campos de la página actual
    const currentPageFields = pages[currentPage].map(
      (element) => element.props.name
    );

    currentPageFields.forEach((field) => {
      if (!optionalFields.includes(field) && !formData[field]) {
        newErrors[field] = "Este campo es requerido";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const scrollToTop = () => {
    // Verifica que formRef.current no sea nulo antes de llamar a scrollIntoView
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth", // Opcional: hace el scroll de manera suave
        block: "start", // Hace scroll hasta la parte superior del formulario
      });
    }
  };

  useEffect(() => {
    // Scroll al inicio del formulario cuando cambia la página
    scrollToTop();
  }, [currentPage]); // Se ejecuta cada vez que currentPage cambia

  return (
    <div
      className={`flex flex-col mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl border max-w-[650px] ${
        successMessage ? "bg-black/20" : "bg-white-100/5"
      } bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border-gray-100`}
    >
      {successMessage ? (
        <div className="text-white text-center flex flex-col gap-2">
          <Lottie animationData={check} loop={false} className="h-20" />
          {successMessage}
          <p className="font-semibold">Saludos, Crack The Code.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
        >
          {pages[currentPage]}
          {/* <div className="flex gap-5 mx-auto">
            <TfiArrowCircleLeft
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === 0 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handlePreviousPage();
                scrollToTop();
              }}
            />
            <TfiArrowCircleRight
              color="white"
              size={30}
              className={`cursor-pointer ${
                currentPage === pages.length - 1 ? "invisible" : "visible"
              }`}
              onClick={() => {
                handleNextPage();
                scrollToTop();
              }}
            />
          </div> */}
          {currentPage === pages.length - 1 && (
            <button
              type="submit"
              className="rounded-lg border-2 w-full sm:w-[100px] mx-auto mt-5 text-xl text-white p-2 hover:bg-black/40 transition duration-300 ease-in-out"
            >
              Enviar
            </button>
          )}
          {errorMessage && (
            <div className="mt-5 text-red-500 text-center">{errorMessage}</div>
          )}
        </form>
      )}
    </div>
  );
}

export default Form;
