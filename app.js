
const materias = {
  '1° Año': [
    { nombre: "Introducción a la Problemática del Diseño", estado: "Aprobada", correlativas: [] },
    { nombre: "Estrategias de Aprendizaje", estado: "Aprobada", correlativas: [] },
    { nombre: "Introducción a la Tecnología", estado: "Aprobada", correlativas: [] },
    { nombre: "Sistemas Gráficos de Expresión", estado: "Aprobada", correlativas: [] },
    { nombre: "Arquitectura I", estado: "Aprobada", correlativas: [] },
    { nombre: "Matemática I", estado: "Aprobada", correlativas: [] },
    { nombre: "Física", estado: "Aprobada", correlativas: [] }
  ],
  '2° Año': [
    { nombre: "Construcciones I", estado: "Pendiente", correlativas: ["Introducción a la Tecnología"] },
    { nombre: "Instalaciones I", estado: "Pendiente", correlativas: ["Introducción a la Tecnología"] },
    { nombre: "Estructuras I", estado: "Pendiente", correlativas: ["Matemática I", "Física"] },
    { nombre: "Historia I", estado: "Pendiente", correlativas: ["Introducción a la Problemática del Diseño"] },
    { nombre: "Teorías y Métodos", estado: "Pendiente", correlativas: ["Arquitectura I"] },
    { nombre: "Morfología II", estado: "Pendiente", correlativas: ["Sistemas Gráficos de Expresión"] },
    { nombre: "Arquitectura II", estado: "Pendiente", correlativas: ["Arquitectura I"] }
  ]
};

function crearMalla(filtro = 'Todas') {
  const malla = document.getElementById('malla');
  malla.innerHTML = "";
  for (const [anio, lista] of Object.entries(materias)) {
    const columna = document.createElement('div');
    columna.className = 'year-column';
    const titulo = document.createElement('h2');
    titulo.textContent = anio;
    columna.appendChild(titulo);
    lista.forEach(materia => {
      if (filtro === 'Todas' || filtro === materia.estado) {
        const card = document.createElement('div');
        card.className = `card ${claseEstado(materia.estado)}`;
        if (!habilitada(materia)) card.classList.add('disabled');
        const nombre = document.createElement('div');
        nombre.textContent = materia.nombre;
        const select = document.createElement('select');
        ["Aprobada", "En Curso", "Pendiente"].forEach(estado => {
          const option = document.createElement('option');
          option.value = estado;
          option.textContent = estado;
          if (materia.estado === estado) option.selected = true;
          select.appendChild(option);
        });
        select.addEventListener('change', e => {
          materia.estado = e.target.value;
          crearMalla(filtro);
        });
        card.appendChild(nombre);
        card.appendChild(select);
        columna.appendChild(card);
      }
    });
    malla.appendChild(columna);
  }
}

function filtrar(filtro) {
  crearMalla(filtro);
}

function claseEstado(estado) {
  if (estado === 'Aprobada') return 'aprobada';
  if (estado === 'En Curso') return 'en-curso';
  return 'pendiente';
}

function habilitada(materia) {
  return !materia.correlativas || materia.correlativas.every(correl => estaAprobada(correl));
}

function estaAprobada(nombreMateria) {
  for (const lista of Object.values(materias)) {
    for (const mat of lista) {
      if (mat.nombre === nombreMateria) return mat.estado === 'Aprobada';
    }
  }
  return false;
}

crearMalla();
