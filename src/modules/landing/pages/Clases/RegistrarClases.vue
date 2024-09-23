<template>
  <div class="container">
    <h1>Registrar Clase</h1>
    <form @submit.prevent="registerClase">
      <div class="form-row">
        <!-- Select para cursos -->
        <div class="form-group col">
          <label for="curso_id">Curso <span class="obligtorio_label">(*)</span></label>
          <select v-model="form.curso_id" required class="form-control">
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.nombre_curso }}
            </option>
          </select>
        </div>
        <!-- Select para materias -->
        <div class="form-group col">
          <label for="materia_id">Materia <span class="obligtorio_label">(*)</span></label>
          <select v-model="form.materia_id" required class="form-control">
            <option v-for="materia in materias" :key="materia.id" :value="materia.id">
              {{ materia.nombre_materia }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <!-- Hora de inicio -->
        <div class="form-group col">
          <label for="hora_inicio">Hora de Inicio <span class="obligtorio_label">(*)</span></label>
          <input
            type="time"
            v-model="form.hora_inicio"
            required
            class="form-control"
            placeholder="Seleccione la hora de inicio"
          />
        </div>
        <!-- Hora de fin -->
        <div class="form-group col">
          <label for="hora_fin">Hora de Fin <span class="obligtorio_label">(*)</span></label>
          <input
            type="time"
            v-model="form.hora_fin"
            required
            class="form-control"
            placeholder="Seleccione la hora de fin"
          />
        </div>
      </div>

      <div class="form-row">
        <!-- Select para profesores -->
      <div class="form-group col">
        <label for="profesor">Profesor <span class="obligtorio_label">(*)</span></label>
        <input
          type="text"
          v-model="selectedProfesorNameDisplay"
          @focus="showModal = true"
          readonly
          class="form-control"
          placeholder="Seleccione un profesor"
        />
      </div>

        <div class="form-group col">
          <label for="f_nacimiento"></label>
        </div>

      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>

    <EstudianteModal
      v-if="showModal"
      @close="showModal = false"
      @select="selectEstudiante"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref,computed, onMounted } from 'vue';
import axios from '@/plugins/axios';
import EstudianteModal from '@/modules/landing/pages/Clases/ProfesorModal.vue';


interface Curso {
  id: number;
  nombre_curso: string;
}

interface Materia{
  id: number;
  nombre_materia: string;
}
interface Profesor {
  id: number;
  nombres: string;
  apellidos: string;
  mail: string;
  genero:string;
  f_nacimiento:string;
  direccion:string;
}

export default defineComponent({
  name: 'RegistrarMatricula',
  components: {
    EstudianteModal,
  },
  setup() {
    const materias = ref<Materia[]>([]);
    const cursos = ref<Curso[]>([]);
    const showModal = ref(false);
    const selectedProfesor  = ref<Profesor | null>(null);

    const form = reactive({
      curso_id: null as number | null,
      materia_id: null as number | null,
      profesor_id: null as number | null,
      hora_inicio: '',
      hora_fin: '',
      created_at: '',
      updated_at: '',
    });

    const fetchMaterias = async () => {
      try {
        const response = await axios.get('/materia');
        materias.value = response.data;
      } catch (error) {
        console.error('Error fetching materias', error);
      }
    };

    const fetchCursos = async () => {
      try {
        const response = await axios.get('/curso');
        cursos.value = response.data;
      } catch (error) {
        console.error('Error fetching cursos:', error);
      }
    };

    const selectEstudiante = (profesor: Profesor) => {
      form.profesor_id = profesor.id;
      selectedProfesor.value = profesor;
      showModal.value = false;
    };

    const selectedProfesorNameDisplay = computed(() => {
      if (selectedProfesor.value) {
        return `${selectedProfesor.value.nombres} ${selectedProfesor.value.apellidos}`;
      }
      return '';
    });

    const registerClase = async () => {
      
      try {
        await axios.post('/clase', form);
        alert('Clase registrada exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });
        selectedProfesor.value = null;
      } catch (error) {
        console.error('Error registrando matrícula:', error);
        alert('Error registrando matrícula.');
      }
    };

    onMounted(() => {
      fetchMaterias();
      fetchCursos();
    });

    return {
      form,
      materias,
      cursos,
      showModal,
      selectedProfesorNameDisplay,
      selectedProfesor,
      selectEstudiante,
      registerClase,
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
