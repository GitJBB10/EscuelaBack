<template>
  <div class="modal-overlay" v-if="showModal && representante">
    <div class="modal">
      <h2>Detalles del Representante</h2>
      <div class="details">
        <div><strong>ID:</strong> {{ representante.id }}</div>
        <div><strong>Identificación:</strong> {{ representante.identificacion }}</div>
        <div><strong>Nombres:</strong> {{ representante.nombres }}</div>
        <div><strong>Apellidos:</strong> {{ representante.apellidos }}</div>
        <div><strong>Correo:</strong> {{ representante.mail }}</div>
        <div><strong>Género:</strong> {{ representante.genero }}</div>
        <div><strong>Fecha de Nacimiento:</strong> {{ representante.f_nacimiento }}</div>
        <div><strong>Parentesco:</strong> {{ representante.parentesco }}</div>
        <div><strong>Dirección:</strong> {{ representante.direccion }}</div>
        <div><strong>Teléfono:</strong> {{ representante.telefono }}</div>
      </div>

      <hr />
      <h3><strong> Estudiantes Relacionados</strong></h3>
      <ul v-if="estudiantes.length > 0">
        <li v-for="(estudiante, index) in estudiantes" :key="index">
          <div> {{ estudiante.nombres }}</div>
        </li>
      </ul>
      <div v-else>
        <p>No hay estudiantes relacionados.</p>
      </div>

      <div class="buttons">
        <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import axios from '../../../../plugins/axios';

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

interface Estudiante {
  nombres: string;
}

export default defineComponent({
  name: 'VerRepresentanteModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    representante: {
      type: Object as PropType<Representante | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const estudiantes = ref<Estudiante[]>([]);

    watch(() => props.representante, async (newVal) => {
      if (newVal) {
        try {
          console.log('Fetching estudiantes for representante ID:', newVal.id);
          const response = await axios.get(`/representante/${newVal.id}/estudiantes`);
          estudiantes.value = response.data;
          console.log('Estudiantes fetched:', response.data);
        } catch (error) {
          console.error('Error fetching estudiantes:', error);
        }
      } else {
        console.log('No representante provided');
      }
    }, { immediate: true });

    const closeModal = () => {
      emit('close'); // Emitir evento 'close' al cerrar el modal
    };

    return {
      estudiantes,
      closeModal,
    };
  },
  mounted() {
    console.log('VerRepresentanteModal component mounted');
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 90%;
}

h2 {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.details {
  margin-bottom: 15px;
}

.details div {
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
