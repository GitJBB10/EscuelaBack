<template>
  <div class="container">
    <h1>Listado de Clases</h1>

    <!-- Filtros -->
    <div class="filters">
      <span>Filtros:</span><br>
      <label>Curso</label>
      <select v-model="filtro.curso" @change="filtrarClases" class="filter-select">
        <option value="">Todos los Cursos</option>
        <option v-for="curso in cursos" :key="curso" :value="curso">
          {{ curso }}
        </option>
      </select>
      <label>Materias</label>
      <select v-model="filtro.materia" @change="filtrarClases" class="filter-select">
        <option value="">Todas las Materias</option>
        <option v-for="materia in materias" :key="materia" :value="materia">
          {{ materia }}
        </option>
      </select>
      <label>Profesor</label>
      <select v-model="filtro.profesor" @change="filtrarClases" class="filter-select">
        <option value="">Todos los profesores</option>
        <option v-for="profesor in profesores" :key="profesor" :value="profesor">
          {{ profesor }}
        </option>
      </select>
      <button @click="descargarReporte" class="btn btn-primary">Descargar Reporte</button>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Curso</th>
          <th>Materia</th>
          <th>Hora Inicio</th>
          <th>Hora Fin</th>
          <th>Profesor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="clase in clasesFiltradas" :key="clase.id">
          <td>{{ clase.id }}</td>
          <td>{{ clase.nombre_curso }}</td>
          <td>{{ clase.nombre_materia }}</td>
          <td>{{ clase.hora_inicio }}</td>
          <td>{{ clase.hora_fin }}</td>
          <td>{{ clase.nombre_profesor }}</td>
          <td>
            <button @click="editClase(clase.id)" class="btn btn-info btn-sm">Editar</button>
            <button @click="deleteClase(clase.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal para ver/editar matrícula -->
    <div v-if="showModal && selectedClase" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Editar Clase</h2>
        <form @submit.prevent="saveClase">
          <label for="curso_id">Curso:</label>
          <input type="number" v-model="selectedClase.nombre_curso" required><br>
          <label for="materia_id">Materia:</label>
          <input type="text" v-model="selectedClase.nombre_materia" required><br>
          <label for="profesor_id">Profesor:</label>
          <input type="text" v-model="selectedClase.nombre_profesor" required><br>
          <label for="hora_inicio">Hora inicio:</label>
          <input type="text" v-model="selectedClase.hora_inicio" required><br>
          <label for="hora_fin">Hora fin:</label>
          <input type="text" v-model="selectedClase.hora_fin" required><br>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from '@/plugins/axios';

interface Clase {
  id: number;
  curso_id:number;
  nombre_curso: string;
  materia_id:number;
  nombre_materia: string;
  profesor_id: number;
  nombre_profesor: string;
  hora_inicio: string;
  hora_fin: string;
}

export default defineComponent({
  name: 'ListaClases',
  setup() {
    const clases = ref<Clase[]>([]);
    const cursos = ref<string[]>([]);
    const materias = ref<string[]>([]);
      const profesores = ref<string[]>([]);
    const filtro = ref({
      curso: '',
      materia: '',
      profesor: '',
    });

    const showModal = ref(false);
    const selectedClase = ref<Clase | null>(null);

    const fetchClases = async () => {
      try {
        const response = await axios.get('/clase');
        const data = response.data.data.map((clase: any) => ({
          ...clase,
          curso_id: clase.curso_id || clase.curso,
        }));
        clases.value = data;

        materias.value = [...new Set(clases.value.map(m => m.nombre_materia))];
        profesores.value = [...new Set(clases.value.map(m => m.nombre_profesor))];
        cursos.value = [...new Set(clases.value.map(m => m.nombre_curso))];
      } catch (error) {
        console.error('Error fetching matriculas:', error);
      }
    };

    const editClase = (id: number) => {
      selectedClase.value = clases.value.find(clase => clase.id === id) || null;
      showModal.value = true;
    };

    const obtenerMateriaId = (materia: string) => {
      const materiaEncontrada = clases.value.find(p => p.nombre_materia === materia);
      return materiaEncontrada ? materiaEncontrada.materia_id : null;
    };

    const obtenerCursoId = (curso: string) => {
      const cursoEncontrado = clases.value.find(m => m.nombre_curso === curso);
      return cursoEncontrado ? cursoEncontrado.curso_id : null;
    };

    const obtenerProfesorId = (profesor: string) => {
      const profesorEncontrado = clases.value.find(m => m.nombre_profesor === profesor);
      return profesorEncontrado ? profesorEncontrado.profesor_id : null;
    };

    const saveClase = async () => {
      if (selectedClase.value) {
        try {

          const formatHour = (hora:string) => hora.slice(0, 5); // Quitar los segundos del formato 'HH:MM:SS'
          const payload = {
            curso_id: selectedClase.value.curso_id || obtenerCursoId(selectedClase.value.nombre_curso),
            materia_id: selectedClase.value.materia_id || obtenerMateriaId(selectedClase.value.nombre_materia),
            profesor_id: selectedClase.value.profesor_id || obtenerProfesorId(selectedClase.value.nombre_profesor), 
            hora_inicio: formatHour(selectedClase.value.hora_inicio),
            hora_fin: formatHour(selectedClase.value.hora_fin),
          };
          
          console.log('Payload:', payload);
          
          await axios.put(`/clase/${selectedClase.value.id}`, payload);
          fetchClases();
          closeModal();
          alert('Clase actualizada exitosamente.');
        } catch (error) {
          console.error('Error actualizando Clase:', error);
          alert('Error actualizando Clase.');
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
      selectedClase.value = null;
    };

    const deleteClase = async (id: number) => {
      if (confirm('¿Está seguro de que desea eliminar esta clase?')) {
        try {
          await axios.delete(`/clase/${id}`);
          fetchClases();
          alert('Clase eliminada exitosamente.');
        } catch (error) {
          console.error('Error eliminando clase:', error);
          alert('Error eliminando clase.');
        }
      }
    };

    const filtrarClases = () => {
      return clases.value.filter(clase => {
        return (
          (filtro.value.curso === '' || clase.nombre_curso === filtro.value.curso) &&
          (filtro.value.materia === '' || clase.nombre_materia === filtro.value.materia) &&
          (filtro.value.profesor === '' || clase.nombre_profesor === filtro.value.profesor)
        );
      });
    };

    const clasesFiltradas = computed(() => filtrarClases());

    const descargarReporte = async () => {
      try {

        const params = new URLSearchParams();
        if (filtro.value.curso) {
          params.append('curso', filtro.value.curso);
        }
        if (filtro.value.materia) {
          params.append('materia', filtro.value.materia);
        }
        if (filtro.value.profesor) {
          params.append('profesor', filtro.value.profesor);
        }

        const response = await axios.get(`/clase/reporte?${params.toString()}`, {
          responseType: 'blob', // Indicar que se espera un blob (archivo)
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'clases.xlsx'); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error descargando reporte:', error);
        alert('Error descargando reporte.');
      }
    };

    onMounted(fetchClases);

    return {
      clases,
      cursos,
      materias,
      profesores,
      filtro,
      showModal,
      selectedClase,
      editClase,
      saveClase,
      closeModal,
      deleteClase,
      filtrarClases, // Asegúrate de devolver filtrarMatriculas en el return
      clasesFiltradas,
      descargarReporte,
    };
  },
});
</script>


<style scoped>
.container {
  width: 1000px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.filters span {
  margin-right: 10px;
  font-weight: bolder;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.filter-select {
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px, 0px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

h1 {
  margin-top: 10px;
  margin-bottom: 20px;
  color: cadetblue;
  font-weight: bold;
  font-size: large;
}

h2{
  color: #203b55;
  font-weight: bold;
}

label {
  margin-left: 30px;
  margin-right: 10px;
  color: #203b55;
  font-size: 14px;
  font-weight: bolder;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 5px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
}

.table th {
  background-color: #203b55;
  color: azure;
  font-weight: bold;
  font-size: small;
}

.btn {
  margin-left: 10px;
}

.btn-primary{
  color: #17a2b8;
}

.btn-info {
  background-color: #17a2b8;
  border: none;
  color: white;
  cursor: pointer;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  color: white;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

/* Modal styles */
.modal {
display: flex;
justify-content: center;
align-items: center;
position: fixed;
z-index: 1;
left: 0;
top: 0;
width: 100%;
height: 100%;
overflow: auto;
background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
background-color: #fefefe;
margin: 15% auto;
padding: 20px;
border: 1px solid #888;
width: 550px;
position: relative;
border-radius: 10px;
}

.modal-input {
  width: 75%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

.close {
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
position: absolute;
right: 10px;
top: 10px;
cursor: pointer;
}

.close
,
.close
{
color: black;
text-decoration: none;
cursor: pointer;
}

</style>
