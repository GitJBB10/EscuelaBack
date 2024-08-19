<!-- EditarRepresentantesModal.vue -->
<template>
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h2>Editar Usuario</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Campos del formulario -->
          <div class="form-row">
            <div class="form-group col">
              <label for="name">Usuario</label>
              <input type="text" v-model="form.name" required class="form-control" />
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group col">
              <label for="email">Email</label>
              <input type="text" v-model="form.email" required class="form-control" />
            </div>
          </div>
  
          <div class="buttons">
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import type { PropType } from 'vue'; 
  import axios from '../../../../plugins/axios';
  
  interface Usuario {
    id: number;
    name: string;
    email: string;
  }
  
  export default defineComponent({
    name: 'EditarUsuarioModal',
    props: {
      showModal: {
        type: Boolean,
        required: true
      },
      usuario: {
        type: Object as PropType<Usuario | null>,
        required: true
      }
    },
    emits: ['close','update'],
    setup(props, { emit }) {
      const form = ref({ ...props.usuario });
  
      watch(() => props.usuario, (newVal) => {
        if (newVal) {
          form.value = { ...newVal };
        }
      });
  
      const handleSubmit = async () => {
        try {
          await axios.put(`/user/${form.value.id}`, form.value);
          alert('Usuario actualizado exitosamente.');
          emit('update');
          emit('close');
        } catch (error) {
          console.error('Error al actualizar Usuario:', error);
          alert('Error al actualizar Usuario. ');
        }
      };
  
      const closeModal = () => {
        emit('close');
      };
  
      return {
        form,
        handleSubmit,
        closeModal,
      };
    },
  });
  </script>
  
  <style scoped>

  label{
    color: #6c757d;
    font-weight: bold;
  }

  h2{
    margin-bottom: 20px;
    padding: 5px;
    color: aliceblue;
    background-color: dodgerblue;
  }

  select,
  input{
    margin-left: 10px;
    color:#6c757d;
  }

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
    width: 420px;
    max-width: 90%;
    height: 250px;
  }
  
  .form-row {
    display: flex;
    margin-bottom: 10px;
  }
  
  .form-group {
    flex: 1;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  
  .form-group:last-child {
    margin-right: 0;
  }
  
  .buttons {
    display: flex;
    justify-content: flex-end;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 30px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  </style>
  