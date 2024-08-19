<template>
  <div class="container">
    <h1>Registrar Matricula</h1>
    <form @submit.prevent="registerMatricula">
      <div class="form-row">
        <!-- Select para periodos lectivos -->
        <div class="form-group col">
          <label for="periodo_id">Periodo Lectivo</label>
          <select v-model="form.periodo_id" required class="form-control">
            <option v-for="periodo in periodosLectivos" :key="periodo.id" :value="periodo.id">
              {{ periodo.periodo }}
            </option>
          </select>
        </div>
        <!-- Select para cursos -->
        <div class="form-group col">
          <label for="curso_id">Curso</label>
          <select v-model="form.curso_id" required class="form-control">
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.nombre_curso }}
            </option>
          </select>
        </div>
        <div class="form-group col">
          <label for="estado">Estado</label>
          <select v-model="form.estado" required class="form-control">
            <option value="Ingresada">Ingresada</option>
            <option value="Aprobada">Aprobada</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <!-- Select para estudiantes -->
      <div class="form-group col">
        <label for="estudiante">Estudiante</label>
        <input
          type="text"
          v-model="selectedEstudianteNameDisplay"
          @focus="showModal = true"
          readonly
          class="form-control"
          placeholder="Seleccione un estudiante"
        />
      </div>

        <div class="form-group col">
          <label for="f_nacimiento"></label>
        </div>

      </div>


      <!-- Datos del Estudiante -->
      <div v-if="selectedEstudiante">
        <div class="form-row">
          <div class="form-group col">
            <label for="genero">Género</label>
            <input type="text" :value="selectedEstudiante.genero" readonly class="form-control" />
          </div>
          <div class="form-group col">
            <label for="f_nacimiento">Fecha de Nacimiento</label>
            <input type="text" :value="selectedEstudiante.f_nacimiento" readonly class="form-control" />
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group col">
            <label for="representante">Representante</label>
            <input type="text" :value="selectedEstudiante.representante" readonly class="form-control" />
          </div>
        </div>

      <div class="form-row">
          <div class="form-group col">
            <label for="direccion">Dirección</label>
            <input type="text" :value="selectedEstudiante.direccion" readonly class="form-control" />
          </div>
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
import EstudianteModal from '@/modules/landing/pages/Matriculas/EstudianteModal.vue';

interface PeriodoLectivo {
  id: number;
  periodo: string;
  estado: string;
  fecha_inicio: string;
  fecha_fin: string;
}

interface Curso {
  id: number;
  nombre_curso: string;
}

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  mail: string;
  genero:string;
  f_nacimiento:string;
  direccion:string;
  representante:string;
}

export default defineComponent({
  name: 'RegistrarMatricula',
  components: {
    EstudianteModal,
  },
  setup() {
    const periodosLectivos = ref<PeriodoLectivo[]>([]);
    const cursos = ref<Curso[]>([]);
    const showModal = ref(false);
    const selectedEstudiante  = ref<Estudiante | null>(null);

    const form = reactive({
      periodo_id: null as number | null,
      estudiante_id: null as number | null,
      curso_id: null as number | null,
      estado: '',
      created_at: '',
      updated_at: '',
      representante_id: null as number | null,
    });

    const fetchPeriodosLectivos = async () => {
      try {
        const response = await axios.get('/periodo');
        periodosLectivos.value = response.data.filter(
          (periodo: PeriodoLectivo) => periodo.estado === 'Vigente'
        );
      } catch (error) {
        console.error('Error fetching periodos lectivos:', error);
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

    const selectEstudiante = (estudiante: Estudiante) => {
      form.estudiante_id = estudiante.id;
      selectedEstudiante.value = estudiante;
      showModal.value = false;
    };

    const selectedEstudianteNameDisplay = computed(() => {
      if (selectedEstudiante.value) {
        return `${selectedEstudiante.value.nombres} ${selectedEstudiante.value.apellidos}`;
      }
      return '';
    });

    const registerMatricula = async () => {
      
      try {
        await axios.post('/matricula', form);
        alert('Matricula registrada exitosamente.');
        // Reset form
        Object.keys(form).forEach((key) => {
          (form as any)[key] = '';
        });
        selectedEstudiante.value = null;
      } catch (error) {
        console.error('Error registrando matrícula:', error);
        alert('Error registrando matrícula.');
      }
    };

    onMounted(() => {
      fetchPeriodosLectivos();
      fetchCursos();
    });

    return {
      form,
      periodosLectivos,
      cursos,
      showModal,
      selectedEstudianteNameDisplay,
      selectedEstudiante,
      selectEstudiante,
      registerMatricula,
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
