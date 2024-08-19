<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="modal-title">Buscar Estudiante</h2>
        <button @click="$emit('close')" class="close">&times;</button>
      </div>
      <div class="modal-body">
        <input
          type="text"
          v-model="searchTerm"
          @input="filterEstudiantes"
          placeholder="Buscar por nombre"
          class="form-control"
        />
        <ul>
          <li
            v-for="estudiante in filteredEstudiantes"
            :key="estudiante.id"
            @click="selectEstudiante(estudiante)"
            class="cursor-pointer p-2 hover:bg-gray-200"
          >
            {{ estudiante.nombres }} {{ estudiante.apellidos }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted  } from 'vue';
import axios from '@/plugins/axios';

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  mail: string;
  genero:string;
  f_nacimiento:string;
  direccion:string;
}

export default defineComponent({
  name: 'EstudianteModal',
  setup(_, { emit }) {
    const estudiantes = ref<Estudiante[]>([]);
    const filteredEstudiantes = ref<Estudiante[]>([]);
    const searchTerm = ref('');

    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('/estudiante');
        estudiantes.value = response.data.data;
        filteredEstudiantes.value = estudiantes.value;
      } catch (error) {
        console.error('Error fetching estudiantes:', error);
      }
    };

    const filterEstudiantes = () => {
      filteredEstudiantes.value = estudiantes.value.filter((estudiante) =>
        `${estudiante.nombres} ${estudiante.apellidos}`
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase())
      );
    };

    const selectEstudiante = (estudiante: Estudiante) => {
      emit('select', estudiante);
    };

    watch(searchTerm, filterEstudiantes);

    onMounted(() => {
      fetchEstudiantes();
    });

    return {
      searchTerm,
      filteredEstudiantes,
      filterEstudiantes,
      selectEstudiante,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 100%;
  z-index: 10000;
}

.modal-header, .modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  color: rgb(24, 49, 75);
  font-weight: bold;
}

.close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.modal-body {
  max-height: 400px;
  overflow-y: auto;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
