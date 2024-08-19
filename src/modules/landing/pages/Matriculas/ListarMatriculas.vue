<template>
  <div class="container">
    <h1>Listado de Matrículas</h1>

    <!-- Filtros -->
    <div class="filters">
      <span>Filtros:</span><br>
      <label>Curso</label>
      <select v-model="filtro.curso" @change="filtrarMatriculas" class="filter-select">
        <option value="">Todos los Cursos</option>
        <option v-for="curso in cursos" :key="curso" :value="curso">
          {{ curso }}
        </option>
      </select>
      <label>Periodos</label>
      <select v-model="filtro.periodo" @change="filtrarMatriculas" class="filter-select">
        <option value="">Todos los Periodos</option>
        <option v-for="periodo in periodosLectivos" :key="periodo" :value="periodo">
          {{ periodo }}
        </option>
      </select>
      <label>Estado</label>
      <select v-model="filtro.estado" @change="filtrarMatriculas" class="filter-select">
        <option value="">Todos los Estados</option>
        <option value="Ingresada">Ingresada</option>
        <option value="Aprobada">Aprobada</option>
      </select>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Periodo Lectivo</th>
          <th>Curso</th>
          <th>Estudiante</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="matricula in matriculasFiltradas" :key="matricula.id">
          <td>{{ matricula.id }}</td>
          <td>{{ matricula.periodo }}</td>
          <td>{{ matricula.curso }}</td>
          <td>{{ matricula.estudiante }}</td>
          <td>{{ matricula.estado }}</td>
          <td>
            <button @click="editMatricula(matricula.id)" class="btn btn-info btn-sm">Editar</button>
            <button @click="deleteMatricula(matricula.id)" class="btn btn-danger btn-sm">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para ver/editar matrícula -->
    <div v-if="showModal && selectedMatricula" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Editar Matrícula</h2>
        <form @submit.prevent="saveMatricula">
          <label for="periodo">Periodo:</label>
          <input type="text" v-model="selectedMatricula.periodo" readonly><br>
          <label for="estudiante">Estudiante:</label>
          <input type="text" v-model="selectedMatricula.estudiante" readonly><br>
          <label for="curso_id">Curso ID:</label>
          <input type="number" v-model="selectedMatricula.curso_id" required><br>
          <label for="estado">Estado:</label>
          <input type="text" v-model="selectedMatricula.estado" required><br>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from '@/plugins/axios';

interface Matricula {
  id: number;
  periodo: string;
  estudiante: string;
  curso_id: number;
  curso: string;
  estado: string;
}

export default defineComponent({
  name: 'ListaMatriculas',
  setup() {
    const matriculas = ref<Matricula[]>([]);
    const periodosLectivos = ref<string[]>([]);
    const cursos = ref<string[]>([]);
    const filtro = ref({
      periodo: '',
      curso: '',
      estado: '',
    });

    const showModal = ref(false);
    const selectedMatricula = ref<Matricula | null>(null);

    const fetchMatriculas = async () => {
      try {
        const response = await axios.get('/matricula');
        const data = response.data.data.map((matricula: any) => ({
          ...matricula,
          curso_id: matricula.curso_id || matricula.curso,
        }));
        matriculas.value = data;

        periodosLectivos.value = [...new Set(matriculas.value.map(m => m.periodo))];
        cursos.value = [...new Set(matriculas.value.map(m => m.curso))];
      } catch (error) {
        console.error('Error fetching matriculas:', error);
      }
    };

    const editMatricula = (id: number) => {
      selectedMatricula.value = matriculas.value.find(matricula => matricula.id === id) || null;
      showModal.value = true;
    };

    const saveMatricula = async () => {
      if (selectedMatricula.value) {
        try {
          await axios.put(`/matricula/${selectedMatricula.value.id}`, selectedMatricula.value);
          fetchMatriculas();
          closeModal();
          alert('Matrícula actualizada exitosamente.');
        } catch (error) {
          console.error('Error actualizando matrícula:', error);
          alert('Error actualizando matrícula.');
        }
      }
    };

    const closeModal = () => {
      showModal.value = false;
      selectedMatricula.value = null;
    };

    const deleteMatricula = async (id: number) => {
      if (confirm('¿Está seguro de que desea eliminar esta matrícula?')) {
        try {
          await axios.delete(`/matricula/${id}`);
          fetchMatriculas();
          alert('Matrícula eliminada exitosamente.');
        } catch (error) {
          console.error('Error eliminando matrícula:', error);
          alert('Error eliminando matrícula.');
        }
      }
    };

    const filtrarMatriculas = () => {
      return matriculas.value.filter(matricula => {
        return (
          (filtro.value.curso === '' || matricula.curso === filtro.value.curso) &&
          (filtro.value.periodo === '' || matricula.periodo === filtro.value.periodo) &&
          (filtro.value.estado === '' || matricula.estado === filtro.value.estado)
        );
      });
    };

    const matriculasFiltradas = computed(() => filtrarMatriculas());

    onMounted(fetchMatriculas);

    return {
      matriculas,
      periodosLectivos,
      cursos,
      filtro,
      showModal,
      selectedMatricula,
      editMatricula,
      saveMatricula,
      closeModal,
      deleteMatricula,
      filtrarMatriculas, // Asegúrate de devolver filtrarMatriculas en el return
      matriculasFiltradas,
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
  margin-right: 5px;
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
