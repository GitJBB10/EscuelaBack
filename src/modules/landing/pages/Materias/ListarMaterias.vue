<template>
  <div class="container">
    <h1>Listado de Materias</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Materia</th>
          <th>Descripción</th>
          <th>Fecha Creación</th>
          <th>Fecha Actualización</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="materia in materias" :key="materia.id">
          <td>{{ materia.id }}</td>
          <td>{{ materia.nombre_materia }}</td>
          <td>{{ materia.descripcion }}</td>
          <td>{{ materia.created_at }}</td>
          <td>{{ materia.updated_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from '../../../../plugins/axios';

interface Materia {
  id: number;
  nombre_materia: string;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'Materias',
  setup() {
    const materias = ref<Materia[]>([]);

    // Función para cargar las materias desde la API
    const fetchMaterias = async () => {
      try {
        const response = await axios.get('/materia');
        console.log(response.data); // Verificar la estructura de los datos recibidos
        materias.value = response.data; // Asignar los datos recibidos a materias.value
      } catch (error) {
        console.error('Error fetching materias:', error);
      }
    };

    // Cargar las materias al montar el componente
    onMounted(() => {
      fetchMaterias();
    });

    return {
      materias,
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
