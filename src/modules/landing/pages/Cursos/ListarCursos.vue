<template>
  <div class="container">
    <h1>Listado de Cursos</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Curso</th>
          <th>Descripción</th>
          <th>Created_at</th>
          <th>Updated_at</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="curso in cursos" :key="curso.id">
          <td>{{ curso.id }}</td>
          <td>{{ curso.nombre_curso }}</td>
          <td>{{ curso.descripcion }}</td>
          <td>{{ curso.created_at }}</td>
          <td>{{ curso.updated_at }}</td>
          <td class="acciones">
            <button @click="verCurso(curso.id)">Detalle</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para ver curso -->
    <verCursoModal
      v-if="showModalVer"
      :showModal="showModalVer"
      :curso="selectedCurso"
      @close="closeModalVer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from '../../../../plugins/axios';
import verCursoModal from '@/modules/landing/pages/Cursos/VerCursosModal.vue';

interface Curso {
  id: number;
  nombre_curso: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Cursos',
  components: {
    verCursoModal,
  },
  setup() {
    const cursos = ref<Curso[]>([]);
    const showModalVer = ref(false);
    const selectedCurso = ref<Curso | null>(null);

    // Función para cargar los cursos desde la API
    const fetchCursos = async () => {
      try {
        const response = await axios.get('/curso');
        console.log(response.data); // Verificar la estructura de los datos recibidos
        cursos.value = response.data; // Asignar los datos recibidos a cursos.value
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    // Función para abrir el modal de visualización del curso
    const verCurso = (id: number) => {
      const curso = cursos.value.find((c) => c.id === id);
      if (curso) {
        selectedCurso.value = { ...curso };
        showModalVer.value = true;
      }
    };

    // Función para cerrar el modal de visualización del curso
    const closeModalVer = () => {
      showModalVer.value = false;
      selectedCurso.value = null;
    };

    // Cargar los cursos al montar el componente
    onMounted(() => {
      fetchCursos();
    });

    return {
      cursos,
      verCurso,
      showModalVer,
      selectedCurso,
      closeModalVer,
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

.acciones {
  color: darkmagenta;
}

h1 {
  color: cadetblue;
  font-weight: bold;
  font-size: medium;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 5px;
  text-align: left;
  font-size: small;
}

table th {
  background-color: #203b55;
  color: azure;
  font-weight: bold;
  font-size: small;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
  transition: background-color 0.3s ease;
}

.link {
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

.link:hover {
  color: #0056b3;
}
</style>
