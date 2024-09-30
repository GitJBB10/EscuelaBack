<template>
  <div class="modal-overlay" v-if="showModal && estudiante">
    <div class="modal">
      <h2>Datos del Estudiante</h2>
      <div class="details">
        <div><strong>identificación:</strong> {{ estudiante.identificacion }}</div>
        <div><strong>Nombres:</strong> {{ estudiante.nombres }}</div>
        <div><strong>Apellidos:</strong> {{ estudiante.apellidos }}</div>
        <div><strong>Correo:</strong> {{ estudiante.mail }}</div>
        <div><strong>Género:</strong> {{ estudiante.genero }}</div>
        <div><strong>Fecha de Nacimiento:</strong> {{ estudiante.f_nacimiento }}</div>
        <div><strong>Representante:</strong> {{ estudiante.representante }}</div>
        <div><strong>Dirección:</strong> {{ estudiante.direccion }}</div>
      </div>
      <hr />
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

interface Estudiante {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  mail: string;
  genero: string | null;
  f_nacimiento: string;
  representante:string
  direccion: string;
  created_at: string;
  updated_at: string;
}

export default defineComponent({
  name: 'VerEstudianteModal',
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    estudiante: {
      type: Object as PropType<Estudiante | null>,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close'); // Emitir evento 'close' al cerrar el modal
    };

    return {
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
