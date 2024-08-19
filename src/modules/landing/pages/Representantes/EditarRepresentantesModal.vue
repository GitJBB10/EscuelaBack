<!-- EditarRepresentantesModal.vue -->
<template>
    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h2>Editar Representante</h2>
        <form @submit.prevent="handleSubmit">
          <!-- Campos del formulario -->
          <div class="form-row">
            <div class="form-group col">
              <label for="identificacion">Identificación</label>
              <input type="text" v-model="form.identificacion" required class="form-control" />
            </div>
            <div class="form-group col">
              <label for="parentesco">Parentesco</label>
              <input type="text" v-model="form.parentesco" required class="form-control" />
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group col">
              <label for="nombres">Nombres</label>
              <input type="text" v-model="form.nombres" required class="form-control" />
            </div>
            <div class="form-group col">
              <label for="apellidos">Apellidos</label>
              <input type="text" v-model="form.apellidos" required class="form-control" />
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group col">
              <label for="genero">Género</label>
              <select v-model="form.genero" required class="form-control">
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
  
            <div class="form-group col">
              <label for="f_nacimiento">Fecha de Nacimiento</label>
              <input type="date" v-model="form.f_nacimiento" required class="form-control" />
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group col">
              <label for="mail">Correo</label>
              <input type="email" v-model="form.mail" required class="form-control" />
            </div>
            <div class="form-group col">
              <label for="telefono">Teléfono</label>
              <input type="text" v-model="form.telefono" required class="form-control" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col">
            <label for="direccion">Dirección</label>
            <input type="text" v-model="form.direccion" required class="form-control" />
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
  
  interface Representante {
    id: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    mail: string;
    genero: string | null;
    f_nacimiento: string;
    parentesco: string;
    direccion:string;
    telefono: string;
  }
  
  export default defineComponent({
    name: 'EditarRepresentanteModal',
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
    emits: ['close','update'],
    setup(props, { emit }) {
      const form = ref({ ...props.representante });
  
      watch(() => props.representante, (newVal) => {
        if (newVal) {
          form.value = { ...newVal };
        }
      });
  
      const handleSubmit = async () => {
        try {
          await axios.put(`/representante/${form.value.id}`, form.value);
          alert('Representante actualizado exitosamente.');
          emit('update');
          emit('close');
        } catch (error) {
          console.error('Error al actualizar representante:', error);
          alert('Error al actualizar representante. ');
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
    width: 700px;
    max-width: 90%;
    height: 385px;
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
  