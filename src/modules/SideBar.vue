<template>


  <TreeRoot
    v-slot="{ flattenItems }"
    class="list-none select-none w-56 bg-white text-blackA11 rounded-lg p-2 text-sm font-medium"
    :items="items"
    :get-key="(item) => item.id"
    :default-expanded="['estudiantes', 'docentes', 'representantes']"
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

// Definir el tipo para los items del árbol
interface TreeItemType {
  id: string;
  title: string;
  iconClosed?: string;
  iconOpen?: string;
  icon?: string;
  routerLink?: string;
  children?: TreeItemType[];
}

const items: TreeItemType[] = [
  {
    id: 'estudiantes',
    title: 'Estudiantes',
    iconClosed: 'mdi:account-school-outline',
    iconOpen: 'mdi:account-school',
    children: [
      { id: 'estudiantes-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/estudiantes/listar' },
      { id: 'estudiantes-registrar', title: 'Registrar', icon: 'mdi:account-plus',
      routerLink: '/estudiantes/registrar' },
    ],
  },
  {
    id: 'profesores',
    title: 'Profesores',
    iconClosed: 'mdi:teacher',
    iconOpen: 'mdi:human-male-board-poll',
    children: [
      { id: 'profesores-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/profesores/listar'},
      { id: 'profesores-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/profesores/registrar' },
    ],
  },
  {
    id: 'representantes',
    title: 'Representantes',
    iconClosed: 'mdi:account-group-outline',
    iconOpen: 'mdi:account-group',
    children: [
      { id: 'representantes-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/representante/listar'},
      { id: 'representantes-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/representante/registrar' },
    ],
  },
  {
    id: 'cursos',
    title: 'Cursos',
    iconClosed: 'mdi:chair-school',
    iconOpen: 'mdi:chair-school',
    children: [
      { id: 'cursos-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/cursos/listar'},
      { id: 'cursos-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/cursos/registrar' },
    ],
  },
  {
    id: 'materias',
    title: 'Materias',
    iconClosed: 'mdi:book-open-outline',
    iconOpen: 'mdi:book-open-outline',
    children: [
      { id: 'materias-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/materias/listar'},
      { id: 'materias-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/materias/registrar' },
    ],
  },
  { id: 'periodo-lectivo', title: 'Peridos Lectivos', icon: 'mdi:calendar-month-outline', routerLink: '/periodos/registrar' },
  {
    id: 'matriculas',
    title: 'Matriculas',
    iconClosed: 'mdi:town-hall',
    iconOpen: 'mdi:town-hall',
    children: [
      { id: 'materias-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/matriculas/listar'},
      { id: 'matriculas-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/matriculas/registrar' },
    ],
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    iconClosed: 'mdi:badge-account-outline',
    iconOpen: 'mdi:badge-account',
    children: [
      { id: 'usuarios-listar', title: 'Listar', icon: 'mdi:account-search',
        routerLink: '/usuarios/listar'},
      { id: 'usuarios-registrar', title: 'Registrar', icon: 'mdi:account-plus',routerLink: '/usuarios/registrar' },
    ],
  },
  {
    id: 'roles_permisos',
    title: 'Roles y Permisos',
    iconClosed: 'mdi:badge-account-outline',
    iconOpen: 'mdi:badge-account',
    children: [
      { id: 'roles-listar', title: 'Listar Roles', icon: 'mdi:account-search',
        routerLink: '/roles/listar'},
      { id: 'roles-asignar', title: 'Asignar Roles', icon: 'mdi:account-plus',routerLink: '/roles/asignar' },
      { id: 'permisos-asignar', title: 'Asignar Permisos', icon: 'mdi:account-plus',routerLink: '/roles/permisos' },
    ],
  },
  //{ id: 'app-vue', title: 'app.vue', icon: 'mdi:vuejs' },

]
</script>

<style scoped>

</style>
