import React, { useMemo, useState } from 'react';

export default function PrototipoWebComercial() {
  const screens = [
    {
      id: 'P01',
      title: 'Presentación',
      subtitle: '',
      body: [
        'La mayoría de los programas falla en un punto crítico: no cambia el desempeño.',

      ],
      audioText:
        'La capacitación tradicional suele privilegiar los contenidos. Este programa no busca solo transmitir conceptos, sino ayudar a descubrir cómo y por qué adquirir nuevas capacidades permite vivir mejor.',
      interaction: {
        type: 'compare',
        leftTitle: 'Capacitación tradicional',
        leftPoints: ['Contenido genérico', 'Baja transferencia', 'Escasa personalización'],
        rightTitle: 'Nuestra promesa',
        rightPoints: ['Brechas reales', 'Aplicación en cada sesión', 'Seguimiento individual'],
      },
    },
    {
      id: 'P02',
      title: 'Tres pilares que aumentan impacto',
      subtitle: '',
      body: [
        'El programa se estructura sobre tres pilares que mejoran el aprendizaje y la satisfacción de los participantes. ',
      ],
      audioText:
        'El diseño integra pertinencia, acompañamiento y aprendizaje experiencial. La diferencia actual es que la IA permite operar estos pilares con mayor escalabilidad y seguimiento.',
      interaction: {
        type: 'tabs',
        items: [
          { label: 'Pertinencia', content: 'Cada ejecutivo trabaja sobre brechas reales de su rol y contexto.' },
          { label: 'Acompañamiento', content: 'Tutoría individual y retroalimentación continua para sostener el proceso.' },
          { label: 'Experiencial', content: 'Dinámicas, casos y presión aplicada para mover conducta, no solo comprensión.' },
        ],
      },
    },
    {
      id: 'P03',
      title: 'Arquitectura del programa',
      subtitle: 'El programa mantiene la estructura de 10 sesiones de medio día de 5 horas por día. Incorporando el aprendizaje experiencial a través del juego y un aula virtual que integra todo el proceso en una experiencia sistémica. Los participantes pueden optar a un diplomado de 120 horas si completan las actividades del aula virtual.',
      body: [],
      audioText:
        'La arquitectura es simple y deliberada: primero se comprende, luego se aplica en condiciones exigentes y finalmente se conecta con el marco estratégico del negocio.',
      interaction: {
        type: 'timeline',
        items: [
          { label: '2h Conceptos', content: 'Modelos de administración y discusión de casos.' },
          { label: '2h Aplicación', content: 'Dinámicas para forzar uso práctico del criterio.' },
          { label: '1h Alta gerencia', content: 'Lectura estratégica del problema y sus implicancias.' },
        ],
      },
    },
    {
      id: 'P04',
      title: 'Contenidos del programa',
      subtitle: '5 temas, 2 sesiones por tema',
      body: [],
      audioText: 'El programa cubre cinco temas centrales. Cada tema se trabaja en dos sesiones, combinando marco conceptual y aplicación práctica mediante dinámicas de grupo y juegos de simulación.',
      interaction: {
        type: 'cards',
        items: [
          { label: 'Estrategia (Porter)', content: 'Foco: análisis estructural de la industria y posicionamiento competitivo. Dinámica: simulación competitiva con decisiones bajo restricciones.' },
          { label: 'Innovación (Christensen)', content: 'Foco: innovación disruptiva y creación de valor en incertidumbre. Dinámica: laboratorio para diseñar soluciones bajo presión de tiempo.' },
          { label: 'Confianza (Luhmann)', content: 'Foco: reducción de complejidad y coordinación social. Dinámica: negociación con información incompleta.' },
          { label: 'Trabajo en equipo (Hackman)', content: 'Foco: condiciones para efectividad de equipos. Dinámica: desafío complejo con roles diferenciados.' },
          { label: 'Alto desempeño (Ericsson)', content: 'Foco: práctica deliberada y feedback. Dinámica: entrenamiento intensivo con ciclos de ajuste.' },
        ],
      },
    },
    {
      id: 'P05',
      title: 'Personalización',
      subtitle: '',
      body: [
        'Cada participante define objetivos vinculados a su momento profesional y personal.',
      ],
      audioText:
        'La personalización no se limita al contenido. Parte desde brechas reales, objetivos propios y decisiones de aplicación concretas. Eso aumenta la pertinencia y la probabilidad de transferencia.',
      interaction: {
        type: 'accordion',
        items: [
          { label: 'Brecha', content: 'Ejemplo: dificultad para tomar decisiones bajo presión sin perder de vista la cadena de valor del negocio.' },
          { label: 'Objetivo', content: 'Ejemplo: identificar mi estado emocional cuando mi superior jerárquico me hace un pedido importante y urgente e identificar herramientas para ordenar las ideas y retomar control' },
          { label: 'Intervención', content: 'escribir en mi bitácora un episodio real en el que sentí pérdida de control frente a un pedido importante y urgente, estudiar las herramientas que me envió mi tutor, usar el juego de negocios de la sesión 3 para entrenar el uso de esas herramientas' },
          { label: 'Tecnología', content: `El programa se ejecuta sobre el LMS institucional ya operativo, el cual será configurado y adaptado para la implementación del modelo en GM. El LMS incorpora una arquitectura tecnológica con agentes automatizados desarrollados en n8n, modelos de lenguaje (LLMs) operando en Vertex AI y analítica de aprendizaje visualizados en Looker Studio. Esta integración permite monitoreo permanente y en línea del proceso formativo.` },
        ],
      },
    },
    {
      id: 'P07',
      title: 'Sistema de seguimiento y transferencia',
      subtitle: 'Cada jornada cierra con una bitácora obligatoria.',
      body: [
        'La bitácora se procesa para generar retroalimentación y recomendaciones personalizadas.',
      ],
      audioText:
        'La bitácora cumple una función crítica: capturar aprendizaje, dificultad y decisión de aplicación. Sobre esa base, la plataforma y la tutoría sostienen el cambio entre sesiones.',
      interaction: {
        type: 'flow',
        items: [
          'Participante registra aprendizajes',
          'La plataforma procesa señales',
          'Se generan sugerencias y refuerzos',
          'El tutor valida, ajusta, envía email y acompaña reacciones.',
        ],
      },
    },
    {
      id: 'P06',
      title: 'Aprendizaje integrado al negocio',
      subtitle: 'Teoría, práctica y conexión estratégica.',
      body: [],
      audioText:
        'Aquí el aprendizaje no corre por fuera del negocio. Cada módulo vincula modelos, experiencia aplicada e intervención de la alta gerencia para asegurar conexión con la realidad estratégica.',
      interaction: {
        type: 'cards',
        items: [
          { label: 'Conceptual', content: 'Modelos y casos para ordenar criterio ejecutivo.' },
          { label: 'Aplicado', content: 'Dinámicas que fuerzan coordinación, decisión y ajuste.' },
          { label: 'Estratégico', content: 'Participación de líderes para conectar con prioridades reales.' },
        ],
      },
    },
    {
      id: 'P09',
      title: 'La decisión no es sobre contenidos',
      subtitle: 'Es sobre el tipo de resultado que la organización necesita.',
      body: [

      ],
      audioText:
        'Si el objetivo es solo exposición a contenidos, hay alternativas más simples. Si el objetivo es maximizar el valor en un periodo de tiempo acotado, este diseño es coherente con ese desafío.',
      interaction: {
        type: 'decision',
        question: '¿Qué necesita hoy su organización?',
        options: [
          { label: 'Contenido', feedback: 'Entonces conviene una solución más liviana y menos intensiva.' },
          { label: 'Acompañar el proceso de cambio', feedback: 'Entonces este diseño es consistente con el tipo de resultado que busca.' },
        ],
      },
    }
  ];


  const [current, setCurrent] = useState(0);
  const [tabSelections, setTabSelections] = useState({});
  const [openAccordions, setOpenAccordions] = useState({});
  const [decision, setDecision] = useState('');

  const screen = screens[current];
  const screenIndex = screens.findIndex((s) => s.id === screen.id);
  const progress = ((screenIndex + 1) / screens.length) * 100;




  const next = () => {
    setCurrent((c) => Math.min(c + 1, screens.length - 1));
  };

  const prev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const renderInteraction = () => {
    const interaction = screen.interaction;
    if (!interaction) return null;

    if (interaction.type === 'compare') {
      return (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{interaction.leftTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {interaction.leftPoints.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">{interaction.rightTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {interaction.rightPoints.map((p, i) => <li key={i}>• {p}</li>)}
            </ul>
          </div>
        </div>
      );
    }

    if (interaction.type === 'tabs') {
      const selected = tabSelections[current] ?? 0;
      return (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            {interaction.items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setTabSelections((s) => ({ ...s, [current]: idx }))}
                className={`px-4 py-2 rounded-full text-sm border ${selected === idx ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-700 border-slate-300'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-slate-700 leading-relaxed">{interaction.items[selected].content}</div>
        </div>
      );
    }

    if (interaction.type === 'accordion') {
      return (
        <div className="mt-6 space-y-3">
          {interaction.items.map((item, idx) => {
            const key = `${screen.id}-${idx}`;
            const open = !!openAccordions[key];
            return (
              <div key={idx} className="rounded-2xl border bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenAccordions((s) => ({ ...s, [key]: !open }))}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-slate-500">{open ? '−' : '+'}</span>
                </button>
                {open && <div className="px-5 pb-4 text-slate-700">{item.content}</div>}
              </div>
            );
          })}
        </div>
      );
    }

    if (interaction.type === 'cards') {
      return (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {interaction.items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-sm uppercase tracking-wide text-slate-500 mb-2">{item.label}</div>
              <div className="text-slate-800 leading-relaxed">{item.content}</div>
            </div>
          ))}
        </div>
      );
    }

    if (interaction.type === 'timeline') {
      return (
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {interaction.items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm relative">

              <div className="font-semibold mb-2">{item.label}</div>
              <div className="text-slate-700 text-sm">{item.content}</div>
            </div>
          ))}
        </div>
      );
    }

    if (interaction.type === 'flow') {
      return (
        <div className="mt-6 grid md:grid-cols-4 gap-3">
          {interaction.items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-4 shadow-sm text-sm text-slate-700">
              <div className="text-xs text-slate-500 mb-2">Paso {idx + 1}</div>
              {item}
            </div>
          ))}
        </div>
      );
    }

    if (interaction.type === 'steps') {
      return (
        <div className="mt-6 space-y-3">
          {interaction.items.map((item, idx) => (
            <div key={idx} className="rounded-2xl border bg-white p-5 shadow-sm flex gap-4 items-start">
              <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold">{idx + 1}</div>
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-slate-700 text-sm mt-1">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (interaction.type === 'decision') {
      const selected = interaction.options.find((o) => o.label === decision);
      return (
        <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="font-semibold mb-4">{interaction.question}</div>
          <div className="flex flex-wrap gap-3">
            {interaction.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setDecision(option.label)}
                className={`px-4 py-2 rounded-full border text-sm ${decision === option.label ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-700 border-slate-300'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {selected && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 text-slate-700 text-sm">
              {selected.feedback}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-orange-600">
      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8">
        <div className="rounded-3xl bg-white shadow-sm border overflow-hidden">
          <div className="bg-slate-950 text-white px-6 py-8 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-3">Propuesta preparada por el centro de liderazgo STEC.</div>
                <h1 className="text-2xl md:text-4xl font-semibold leading-tight max-w-4xl">
                  Diplomado en Habilidades Directivas para Profesionales - Generadora Metropolitana
                </h1>

              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 text-sm">
                <div className="text-slate-300">Pantalla actual</div>
                <div className="text-xl font-semibold">{screen.id}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-sm text-slate-300">{current + 1} de {screens.length}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-0">
            <aside className="border-r bg-slate-50 p-4 md:p-5">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">Navegación</div>
              <div className="space-y-2">
                {screens.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setCurrent(idx); }}
                    className={`w-full text-left rounded-2xl px-4 py-3 border transition ${idx === current ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'}`}
                  >
                    <div className="text-xs opacity-70">{item.id}</div>
                    <div className="text-sm font-medium mt-1">{item.title}</div>
                  </button>
                ))}
              </div>
            </aside>

            <main className="p-5 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="max-w-3xl">
                  <div className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-3">{screen.id}</div>
                  <h2 className="text-2xl md:text-4xl font-semibold leading-tight">{screen.title}</h2>
                  <p className="text-slate-600 mt-3 text-lg">{screen.subtitle}</p>
                </div>

              </div>

              <div className="mt-8">
                <section className="rounded-3xl bg-slate-50 border p-6 md:p-8">

                  <div className="space-y-4">
                    {screen.body.map((paragraph, idx) => (
                      <p key={idx} className="text-slate-800 text-lg leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                  {renderInteraction()}
                  {screen.id === 'P03' && (
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold mb-2">Lugar</div>
                        <div className="text-slate-700 text-sm leading-relaxed">
                          Auditorio UST Sede Vergara.<br />
                          <strong>Sesión de cierre: Club de Campo Entel</strong>
                        </div>
                      </div>
                      <div className="rounded-2xl border bg-white p-5 shadow-sm">
                        <div className="text-sm font-semibold mb-2">Certificación Formal</div>
                        <div className="text-slate-700 text-sm leading-relaxed">
                          Ofrecemos la posibilidad de obtener un diplomado de 120 horas como parte del mismo programa.
                        </div>
                      </div>
                    </div>
                  )}
                  {screen.id === 'P09' && (
                    <div className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
                      <div className="text-sm font-semibold mb-2">Valor por alumno</div>
                      <div className="text-slate-700 text-sm leading-relaxed">
                        $1.380.000.- (en base a 35 alumnos inscritos). Incluye dos coffee ejecutivo nivel medio alto, almuerzo, pack de bienvenida, mochila institucional, jornada de cierre en club de campo y coctel de despedida, además de diplomas y acceso a aula virtual por el tiempo que dure el programa.
                      </div>
                    </div>
                  )}
                </section>
              </div>

              <div className="flex items-center justify-between gap-4 mt-8">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="px-5 py-3 rounded-2xl border bg-white disabled:opacity-40"
                >
                  Anterior
                </button>

                <button
                  onClick={next}
                  disabled={current === screens.length - 1}
                  className="px-5 py-3 rounded-2xl bg-orange-500 text-white disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
