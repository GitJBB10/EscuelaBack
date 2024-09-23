<template>
  <div class="container">
    <h1>Registrar Cursos</h1>
    <form @submit.prevent="registerCurso">
      <div class="form-row">
        <div class="form-group col">
          <div >
              <label for="name">Curso <span class="obligtorio_label">(*)</span></label>
          </div>
          <input type="text" v-model="form.nombre_curso" required class="form-control" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label for="descripcion">Descripción <span class="obligtorio_label">(*)</span></label>
          <input type="text" v-model="form.descripcion" required class="form-control" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import axios from '../../../../plugins/axios';

export default defineComponent({
  name: 'RegistrarCurso',
  setup() {
    const form = reactive({
      nombre_curso: '',
      descripcion: '',
    });

    const registerCurso = async () => {    
      try {
        await axios.post('/curso', {
          nombre_curso: form.nombre_curso,
          descripcion: form.descripcion,
        });
        alert('Usuario registrado exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });
      } catch (error) {
        console.error('Error registrando curso:', error);
        alert('Error registrando curso.');
      }
    };

    return {
      form,
      registerCurso,
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

h1 {
  margin-bottom: 20px;
  color: cadetblue;
  font-weight: bold;
}

.obligtorio_label {
  color: red;
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

.text-danger {
  color: red;
  font-size: 0.875rem;
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
