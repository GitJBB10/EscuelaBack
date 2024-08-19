<template>
  <div class="assign-permissions-container">
    <div class="assign-permissions">
      <div class="header">
        <h2 class="titulo">Crear y Asignar Permisos a Roles</h2>
      </div>

      <div class="form-group">
        <label for="role" class="label-rol">Rol</label>
        <div class="role-select-container">
          <select v-model="selectedRole" class="form-control" id="role">
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
          <div class="container-btn">
            <button @click="showRoleModal = true" class="btn btn-secondary">Crear Rol</button>
            <button @click="showPermissionModal = true" class="btn btn-secondary">Crear Permiso</button>
          </div>
        </div>
      </div>
      
      <div class="permissions-container">
        <div class="assigned-permissions">
          <h3>Permisos Asignados</h3>
          <div class="permissions-list">
            <div v-if="assignedPermissions.length === 0">
              <p>No se han asignado permisos</p>
            </div>
            <ul>
              <li v-for="permission in assignedPermissions" :key="permission.id">
                {{ permission.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="available-permissions">
          <h3>Permisos Disponibles</h3>
          <div class="permissions-list">
            <div v-for="permission in permissions" :key="permission.id" class="permission-item">
              <label>
                <input type="checkbox" :value="permission.id" v-model="selectedPermissions" />
                {{ permission.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="btn-rows-bottom">
        <button @click="assignPermissions" class="btn btn-primary">Asignar Permisos</button>
      </div>
    </div>

    <!-- Modal para crear nuevo rol -->
    <div v-if="showRoleModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="titulo_modal">Crear Nuevo Rol</h3>
        <input class="modal-input" v-model="newRoleName" type="text" placeholder="Nombre del nuevo rol" />
        <div class="modal-buttons">
          <button @click="createRole" class="btn btn-primary">Guardar</button>
          <button @click="showRoleModal = false" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal para crear nuevo permiso -->
    <div v-if="showPermissionModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="titulo_modal">Crear Nuevo Permiso</h3>
        <input class="modal-input"  v-model="newPermissionName" type="text" placeholder="Nombre del nuevo permiso" />
        <div class="modal-buttons">
          <button @click="createPermission" class="btn btn-primary">Guardar</button>
          <button @click="showPermissionModal = false" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import axios from '@/plugins/axios';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
}

export default defineComponent({
  name: 'AsignarPermisos',
  setup() {
    const roles = ref<Role[]>([]);
    const permissions = ref<Permission[]>([]);
    const assignedPermissions = ref<Permission[]>([]);
    const selectedRole = ref<number | null>(null);
    const selectedPermissions = ref<number[]>([]);

    const newRoleName = ref('');
    const newPermissionName = ref('');
    const showRoleModal = ref(false);
    const showPermissionModal = ref(false);

    const fetchRolesAndPermissions = async () => {
      try {
        const rolesResponse = await axios.get('/role');
        const permissionsResponse = await axios.get('/permission');
        roles.value = rolesResponse.data;
        permissions.value = permissionsResponse.data;
      } catch (error) {
        console.error('Error fetching roles or permissions:', error);
      }
    };

    const fetchAssignedPermissions = async () => {
      if (selectedRole.value !== null) {
        try {
          const response = await axios.get(`/role/${selectedRole.value}/permissions`);
          assignedPermissions.value = response.data;
          selectedPermissions.value = response.data.map((p: Permission) => p.id);
        } catch (error) {
          console.error('Error fetching assigned permissions:', error);
        }
      }
    };

    const assignPermissions = async () => {
      if (selectedRole.value === null) {
        alert('Seleccione un rol');
        return;
      }
      try {
        await axios.post(`/role/${selectedRole.value}/permissions`, {
          permissions: selectedPermissions.value,
        });
        alert('Permisos asignados correctamente');
        fetchAssignedPermissions();
      } catch (error) {
        console.error('Error asignando permisos:', error);
        alert('Error asignando permisos');
      }
    };

    const createRole = async () => {
      if (!newRoleName.value) {
        alert('Ingrese un nombre para el nuevo rol');
        return;
      }
      try {
        await axios.post('/role', { name: newRoleName.value });
        newRoleName.value = '';
        showRoleModal.value = false;
        fetchRolesAndPermissions();
      } catch (error) {
        alert('Error creando rol');
      }
    };

    const createPermission = async () => {
      if (!newPermissionName.value) {
        alert('Ingrese un nombre para el nuevo permiso');
        return;
      }
      try {
        await axios.post('/permission', { name: newPermissionName.value });
        newPermissionName.value = '';
        showPermissionModal.value = false;
        fetchRolesAndPermissions();
        alert('Permiso creado correctamente');
      } catch (error) {
        alert('Error creando permiso');
      }
    };

    onMounted(fetchRolesAndPermissions);
    watch(selectedRole, fetchAssignedPermissions);

    return {
      roles,
      permissions,
      assignedPermissions,
      selectedRole,
      selectedPermissions,
      assignPermissions,
      newRoleName,
      newPermissionName,
      showRoleModal,
      showPermissionModal,
      createRole,
      createPermission,
    };
  },
});
</script>

<style scoped>
.assign-permissions-container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 560px;
  background-color: #ffffff;
  padding: 5px;

}

.assign-permissions {
  width: 700px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.titulo{
  font-weight: 900;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}

.label-rol {
  margin-right: 10px;
  font-weight: 600;
}

.role-select-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.container-btn {
  display: flex;
  gap: 10px;
  margin-left: 20px;
}

.form-control {
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.permissions-container {
  display: flex;
  justify-content: space-between;
}

.assigned-permissions, .available-permissions {
  width: 48%;
}

.permissions-list {
  height: 320px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.assigned-permissions ul {
  list-style-type: none;
  padding: 0;
}

.assigned-permissions .permissions-list ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

h3{
  color: #5a6268;
  padding-top: 15px;
}

.permission-item {
  margin-bottom: 10px;
}

.btn {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn.btn-secondary {
  background-color: #6c757d;
  width: 120px;
  padding: 5px ;

}

.btn.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-rows-bottom {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.titulo_modal{
  font-weight: 600;
  margin-bottom: 10px;
}

.modal-input{
  border-width: 1px;
  width: 100%;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 10px;
  padding: 0px;
}



</style>
