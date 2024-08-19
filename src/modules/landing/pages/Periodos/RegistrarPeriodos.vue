<template>
  <div class="container">
    <h1>Registrar Periodos</h1>
    <form @submit.prevent="registerPeriodo">
      <div class="form-row">
        <div class="form-group col">
          <label for="materia">Periodo</label>
          <input type="text" v-model="form.periodo" required class="form-control" />
        </div>
      </div>

      <div class="form-row">

        <div class="form-group col">
          <label for="fecha_inicio">Fecha de Inicio</label>
          <input type="date" v-model="form.fecha_inicio" required class="form-control" />
        </div>

        <div class="form-group col">
          <label for="fecha_fin">Fecha de Fin</label>
          <input type="date" v-model="form.fecha_fin" required class="form-control" />
        </div>

      </div>

      <div class="form-row">

        <div class="form-group col">
          <label for="genero">Estado</label>
          <select v-model="form.estado" required class="form-control">
            <option value="Vigente">Vigente</option>
            <option value="Cerrado">Cerrado</option>
          </select>
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
  name: 'RegistrarPeriodo',
  setup() {
    const form = reactive({
      periodo: '',
      estado: '',
      fecha_inicio: '',
      fecha_fin: '',
      created_at: '',
      updated_at: '',
    });

    const registerPeriodo = async () => {    
      try {
        await axios.post('/periodo', {
          periodo: form.periodo,
          estado: form.estado,
          fecha_inicio: form.fecha_inicio,
          fecha_fin: form.fecha_fin,
        });
        alert('Periodo registrado exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });
      } catch (error) {
        console.error('Error registrando Periodo:', error);
        alert('Error registrando Periodo.');
      }
    };

    return {
      form,
      registerPeriodo,
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
