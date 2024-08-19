<template>
  <div class="container">
    <h1>Registrar Representante</h1>
    <form @submit.prevent="registerRepresentante">
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

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from '../../../../plugins/axios';

export default defineComponent({
  name: 'RegistrarRepresentante',
  setup() {
    const form = reactive({
      identificacion: '',
      nombres: '',
      apellidos: '',
      mail: '',
      genero: '',
      f_nacimiento: '',
      direccion: '',
      parentesco: '',
      telefono: '',
    });

    const registerRepresentante = async () => {
      try {
        await axios.post('/representante', form);
        alert('Representante registrado exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });
      } catch (error) {
        console.error('Error registrando representante:', error);
        alert('Error registrando representante.');
      }
    };

    return {
      form,
      registerRepresentante,
    };
  },
});
</script>

<style scoped>
.container {
  width: 800px;
  margin-top: 20px;
  margin-left: 150px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

h1{
  margin-bottom: 20px;
  color: cadetblue;
  font-weight: bold;
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

.btn-primary {
  padding: 5px 15px;
  margin-top: 30px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
