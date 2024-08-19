<template>
  <div class="titulo"> <br> <h1>LISTADO DE ESTUDIANTES</h1></div>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="estudiante in estudiantes" :key="estudiante.id">
          <td>{{ estudiante.id }}</td>
          <td>{{ estudiante.nombres }}</td>
          <td>{{ estudiante.apellidos }}</td>
          <td>{{ estudiante.mail }}</td>
          <td>{{ estudiante.f_nacimiento }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from '../../../../plugins/axios';

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  mail: string;
  genero: string | null;
  f_nacimiento: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'BuscarEstudiantes',
  setup() {
    const estudiantes = ref<Estudiante[]>([]);

    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('/estudiante');
        estudiantes.value = response.data.data;
      } catch (error) {
        console.error('Error fetching estudiantes:', error);
      }
    };

    onMounted(() => {
      fetchEstudiantes();
    });

    return {
      estudiantes
    };
  }
});
</script>

<style scoped>
.titulo{
  margin-left: 40px;
  margin-bottom: 5px;
}

.container {
  max-width: 800px;
  margin-left: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 2px;
  text-align: left;
  max-width: 200px;
}

table th {
  background-color: #d106a5;
  color: aliceblue;
  font-size: small;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #fcdbff;
  transition: background-color 0.3s ease;
}
</style>
