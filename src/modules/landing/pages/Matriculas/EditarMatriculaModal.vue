<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="modal-title">Editar xz Matrícula</h3>
        <button class="close" @click="$emit('close')">X</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Estudiante:</label>
          <p>{{ matricula.estudiante }}</p>
        </div>
        <div class="form-group">
          <label>Periodo Lectivo:</label>
          <p>{{ matricula.periodo }}</p>
        </div>
        <div class="form-group">
          <label for="curso">Curso</label>
          <select v-model="editedMatricula.curso_id" class="form-control">
            <option v-for="curso in cursos" :key="matricula.curso_id" :value="matricula.curso">
              {{ curso }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="estado">Estado</label>
          <select v-model="editedMatricula.estado" class="form-control">
            <option value="Ingresada">Ingresada</option>
            <option value="Aprobada">Aprobada</option>
          </select>
        </div>
        <div class="modal-footer">
          <button @click="guardarCambios" class="btn btn-primary">Guardar Cambios</button>
          <button @click="$emit('close')" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { PropType } from 'vue';
import axios from '@/plugins/axios';

interface Matricula {
  id: number;
  periodo: string;
  curso_id: number;
  curso: string;
  estudiante: string;
  estado: string;
}
interface Curso {
  id: number;
  nombre: string;
}

export default defineComponent({
  name: 'EditarMatriculaModal',
  props: {
    matricula: {
      type: Object as PropType<Matricula>,
      required: true
    },
    cursos: {
    type: Array as PropType<string[]>,
    required: true,
  }
  },
  emits: ['close', 'guardar'],
  setup(props, { emit }) {
    const editedMatricula = { ...props.matricula };


    const close = () => {
      emit('close');
    };

    const guardarCambios = async () => {
      try {
        await axios.put(`/matricula/${editedMatricula.id}`, editedMatricula);
        alert('Matrícula actualizada exitosamente.');
        emit('close');
      } catch (error) {
        console.error('Error actualizando matrícula:', error);
        alert('Error actualizando matrícula.');
      }
    };

    return {
      editedMatricula,
      guardarCambios,
      close,
    };
  }
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
.label{
  color: darkolivegreen;
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
}

.close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
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
</style>
