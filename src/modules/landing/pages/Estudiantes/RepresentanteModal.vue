<template>
  <div class="modal-overlay" @click.self="onClose">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Buscar Representante</h2>
        <button class="close-button" @click="onClose">×</button>
      </div>
      <div class="modal-body">
        <input 
          type="text" 
          v-model="searchTerm" 
          @input="filterRepresentantes" 
          placeholder="Buscar por nombre..." 
          class="form-control"
        />
        <ul>
          <li v-for="representante in filteredRepresentantes" :key="representante.id" @click="selectRepresentante(representante)">
            {{ representante.nombres }} {{ representante.apellidos }}
          </li>
        </ul>
      </div>
      <div class="modal-footer">
        <button @click="onClose">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from '@/plugins/axios';

interface Representante {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  mail: string;
  genero: string | null;
  f_nacimiento: string;
  parentesco: string;
  direccion: string;
  telefono: string;
}

export default defineComponent({
  name: 'RepresentanteModal',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'select'],
  setup(props, { emit }) {
    const representantes = ref<Representante[]>([]);
    const searchTerm = ref('');

    const fetchRepresentantes = async () => {
      try {
        const response = await axios.get('/representante');
        representantes.value = response.data.data; // Acceder a "data"
      } catch (error) {
        console.error('Error fetching representantes:', error);
      }
    };

    const filteredRepresentantes = ref<Representante[]>([]);

    const filterRepresentantes = () => {
      filteredRepresentantes.value = representantes.value.filter(representante =>
        representante.nombres.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        representante.apellidos.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    };

    const selectRepresentante = (representante: Representante) => {
      emit('select', representante);
      emit('close');
    };

    const onClose = () => {
      emit('close');
    };

    onMounted(() => {
      fetchRepresentantes();
      filterRepresentantes();
    });

    return {
      searchTerm,
      filteredRepresentantes,
      selectRepresentante,
      onClose,
      filterRepresentantes,
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
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-body {
  flex: 1;
  margin-bottom: 15px;
}

.modal-footer {
  text-align: right;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-control {
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

li:hover {
  background: #f0f0f0;
}
</style>