<template>


  <TreeRoot
    v-slot="{ flattenItems }"
    class="list-none select-none w-56 bg-white text-blackA11 rounded-lg p-2 text-sm font-medium"
    :items="filteredItems"
    :get-key="(item) => item.id"
    :default-expanded="['estudiantes', 'representantes']"
  >
    <h2 class="font-semibold !text-base text-blackA11 px-2 pt-1">
      Menú
    </h2>
    <TreeItem
      v-for="item in flattenItems"
      v-slot="{ isExpanded }"
      :key="item._id"
      :style="{ 'padding-left': `${item.level - 0.5}rem` }"
      v-bind="item.bind"
      class="flex items-center py-1 px-2 my-0.5 rounded outline-none focus:ring-grass8 focus:ring-2 data-[selected]:bg-grass4"
    >
      <template v-if="item.hasChildren">
        <Icon
          v-if="!isExpanded"
          :icon="item.value.iconClosed as string"
          class="h-4 w-4"
        />
        <Icon
          v-else
          :icon="item.value.iconOpen as string"
          class="h-4 w-4"
        />
      </template>
      <Icon
        v-else
        :icon="item.value.icon as string || 'lucide:file'"
        class="h-4 w-4"
      />
      <div class="pl-2">
        <template v-if="item.value.routerLink">
          <RouterLink :to="item.value.routerLink">{{ item.value.title }}</RouterLink>
        </template>
        <template v-else>
          {{ item.value.title }}
        </template>
      </div>
    </TreeItem>
  </TreeRoot>
</template>

<script setup lang="ts">
import { TreeItem, TreeRoot } from 'radix-vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

// Obtener permisos del almacenamiento local
const userPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
console.log(userPermissions); // Verifica los permisos

// Definir el tipo para los items del árbol
interface TreeItemType {
  id: string;
  title: string;
  iconClosed?: string;
  iconOpen?: string;
  icon?: string;
  routerLink?: string;
  children?: TreeItemType[];
  requiredPermission?: string | string[];
  parent?: TreeItemType;
}

const filterItemsByPermissions = (items: TreeItemType[], userPermissions: string[]): TreeItemType[] => {
  return items.reduce<TreeItemType[]>((filteredItems, item) => {
    const filteredChildren = item.children ? filterItemsByPermissions(item.children, userPermissions) : [];

    const hasPermission = !item.requiredPermission ||
      (Array.isArray(item.requiredPermission)
        ? item.requiredPermission.some(permission => userPermissions.includes(permission))
        : userPermissions.includes(item.requiredPermission));

    if (hasPermission || filteredChildren.length > 0) {
      console.log(`Item permitido: ${item.title}`);
      filteredItems.push({ ...item, children: filteredChildren });
    }

    return filteredItems;
  }, []);
};


const items: TreeItemType[] = [
  {
    id: 'estudiantes',
    title: 'Estudiantes',
    iconClosed: 'mdi:account-school-outline',
    iconOpen: 'mdi:account-school',

    children: [
      { id: 'estudiantes-listar', 
        title: 'Listar', 
        icon: 'mdi:account-search',
        routerLink: '/estudiantes/listar',
        requiredPermission: ['read_estudiantes'] },
      { id: 'estudiantes-registrar', 
        title: 'Registrar', 
        icon: 'mdi:account-plus',
        routerLink: '/estudiantes/registrar',
        requiredPermission: ['create_estudiantes'] 
      },
    ],
  },
  {
    id: 'profesores',
    title: 'Profesores',
    iconClosed: 'mdi:teacher',
    iconOpen: 'mdi:human-male-board-poll',
    requiredPermission: ['mnu_profesores'],
    children: [
      { 
        id: 'profesores-listar', 
        title: 'Listar', 
        icon: 'mdi:account-search',
        routerLink: '/profesores/listar',
        requiredPermission: ['read_profesores']
      },
      { 
        id: 'profesores-registrar',
        title: 'Registrar',
        icon: 'mdi:account-plus',
        routerLink: '/profesores/registrar',
        requiredPermission: ['create_profesores']
       },
    ],
  },
  {
    id: 'representantes',
    title: 'Representantes',
    iconClosed: 'mdi:account-group-outline',
    iconOpen: 'mdi:account-group',
    requiredPermission: ['read_representantes'],
    children: [
      { 
        id: 'representantes-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/representante/listar',
        requiredPermission: ['read_representantes']
      },
      { 
        id: 'representantes-registrar', title: 'Registrar', icon: 'mdi:account-plus',
        routerLink: '/representante/registrar',
        requiredPermission: ['create_representantes']
       },
    ],
  },
  {
    id: 'cursos',
    title: 'Cursos',
    iconClosed: 'mdi:chair-school',
    iconOpen: 'mdi:chair-school',
    requiredPermission: ['read_cursos'],
    children: [
      { 
        id: 'cursos-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/cursos/listar',
        requiredPermission: ['read_cursos']
      },
      { 
        id: 'cursos-registrar', title: 'Registrar', icon: 'mdi:account-plus',
        routerLink: '/cursos/registrar',
        requiredPermission: ['create_cursos']
       },
    ],
  },
  {
    id: 'materias',
    title: 'Materias',
    iconClosed: 'mdi:book-open-outline',
    iconOpen: 'mdi:book-open-outline',
    requiredPermission: ['read_materia'],
    children: [
      { 
        id: 'materias-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/materias/listar',
        requiredPermission: ['read_materia']
      },
      { 
        id: 'materias-registrar', title: 'Registrar', icon: 'mdi:account-plus',
        routerLink: '/materias/registrar',
        requiredPermission: ['create_materia']
       },
    ],
  },
  { 
    id: 'periodo-lectivo', 
    title: 'Peridos Lectivos', 
    icon: 'mdi:calendar-month-outline', 
    routerLink: '/periodos/registrar',
    requiredPermission: ['manager_periodos'], 
  },
  {
    id: 'matriculas',
    title: 'Matriculas',
    iconClosed: 'mdi:town-hall',
    iconOpen: 'mdi:town-hall',
    requiredPermission: ['read_matriculas'],
    children: [
      { 
        id: 'materias-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/matriculas/listar',
        requiredPermission: ['read_matriculas']
      },
      { 
        id: 'matriculas-registrar', title: 'Registrar', icon: 'mdi:account-plus',
        routerLink: '/matriculas/registrar',
        requiredPermission: ['crear_matriculas'] 
      },
    ],
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    iconClosed: 'mdi:badge-account-outline',
    iconOpen: 'mdi:badge-account',
    requiredPermission: ['read_users'],
    children: [
      { id: 'usuarios-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/usuarios/listar',
        requiredPermission: ['read_users']},
      { id: 'usuarios-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/usuarios/registrar',
      requiredPermission: ['create_users']
       },
    ],
  },
  {
    id: 'roles_permisos',
    title: 'Roles y Permisos',
    iconClosed: 'mdi:badge-account-outline',
    iconOpen: 'mdi:badge-account',
    requiredPermission: ['read_roles'],
    children: [
      { id: 'roles-listar', title: 'Listar Roles', icon: 'mdi:account-search',
        routerLink: '/roles/listar',
        requiredPermission: ['read_roles']},
      { id: 'roles-asignar', title: 'Asignar Roles', icon: 'mdi:account-plus',routerLink: '/roles/asignar',
      requiredPermission: ['read_roles']
       },
      { id: 'permisos-asignar', title: 'Asignar Permisos', icon: 'mdi:account-plus',routerLink: '/roles/permisos',
      requiredPermission: ['read_permission']
       },
    ],
  },
  //{ id: 'app-vue', title: 'app.vue', icon: 'mdi:vuejs' },

];

// Filtrar los items basados en los permisos del usuario
const filteredItems = filterItemsByPermissions(items, userPermissions);

</script>

<style scoped>

</style>
