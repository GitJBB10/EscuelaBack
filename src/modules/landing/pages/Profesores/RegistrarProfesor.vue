<template>
  <div class="container">
    <h1>Registrar Profesor</h1>
    <form @submit.prevent="registerProfesor">
      
      <div class="form-row">

        <div class="form-group col">
          <label for="identificacion">Identificación <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.identificacion" required class="form-control" />
        </div>

        <div class="form-group col">
          <label for="representante"></label>
          
        </div>

      </div>

      
      <div class="form-row">
        <div class="form-group col">
          <label for="nombres">Nombres <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.nombres" required class="form-control" />
        </div>
        <div class="form-group col">
          <label for="apellidos">Apellidos <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.apellidos" required class="form-control" />
        </div>
      </div>

   
        <div class="form-row">
        <div class="form-group col">
          <label for="genero">Género <span class="obligtorio_label">(*)</span></label>
          <select v-model="form.genero" required class="form-control">
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div class="form-group col">
          <label for="genero">Estado Civil <span class="obligtorio_label">(*)</span></label>
          <select v-model="form.estado_civil" required class="form-control">
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
          </select>
        </div>  

        <div class="form-group col">
          <label for="f_nacimiento">Fecha de Nacimiento <span class="obligtorio_label">(*)</span></label>
          <input type="date" v-model="form.f_nacimiento" required class="form-control" />
        </div>
      </div>

      <div class="form-row">

        <div class="form-group col">
          <label for="mail">Correo <span class="obligtorio_label">(*)</span></label>
          <input type="email" v-model="form.mail" required class="form-control" />
        </div>

        <div class="form-group col">
          <label for="telefono">Telefono <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.telefono" required class="form-control" />
        </div>

      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="direccion">Dirección <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.direccion" required class="form-control" />
        </div>
       
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from '@/plugins/axios';

export default defineComponent({
  name: 'RegistrarEstudiante',
  
  setup() {
    const form = reactive({
      nombres: '',
      apellidos: '',
      mail: '',
      genero: '',
      f_nacimiento: '',
      direccion: '',
      identificacion:'',
      estado_civil:'',
      telefono:'',
    });


    const registerProfesor = async () => {
      try {
        await axios.post('/profesor', form);
        alert('Profesor registrado exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });

      } catch (error) {
        console.error('Error registrando profesor:', error);
        alert('Error registrando profesor.');
      }
    };

    return {
      form,
      registerProfesor,
    };
  },
});
</script>

<style scoped>
.container {
  width: 850px;
  margin-top: 20px;
  margin-left: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: cadetblue;
  font-weight: bold;
  font-size: large;
}

.obligtorio_label {
  color: red;
  margin-left: 5px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

.form-group:last-child {
  margin-right: 0;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-append {
  margin-left: 5px;
}

.input-group .form-control {
  flex: 1;
}

.btn {
  margin-top: 10px;
}

.btn-primary {
  padding: 5px 10px;
  margin-top: 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  padding: 5px 10px;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: -10px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

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
