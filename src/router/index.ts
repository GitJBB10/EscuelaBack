import LandingLayout from "@/modules/landing/layouts/LandingLayout.vue";
import NoEncontrado404 from "@/modules/commom/NoEncontado404.vue";

import ListarUsuarios from "@/modules/landing/pages/Usuarios/ListarUsuarios.vue";
import RegistrarUsuarios from "@/modules/landing/pages/Usuarios/RegistrarUsuario.vue";
import ListarEstudiantes from "@/modules/landing/pages/Estudiantes/ListarEstudiantes.vue";
import RegistrarEstudiante from "@/modules/landing/pages/Estudiantes/RegistrarEstudiante.vue";
import ListarRepresentantes from "@/modules/landing/pages/Representantes/ListarRepresentantes.vue";
import RegistrarRepresentantes from "@/modules/landing/pages/Representantes/RegistrarRepresentante.vue";
import ListarCursos from "@/modules/landing/pages/Cursos/ListarCursos.vue";
import RegistrarCursos from "@/modules/landing/pages/Cursos/RegistrarCursos.vue";
import ListarMaterias from "@/modules/landing/pages/Materias/ListarMaterias.vue";
import RegistrarMaterias from "@/modules/landing/pages/Materias/RegistrarMaterias.vue";
import RegistrarPeriodos from "@/modules/landing/pages/Periodos/RegistrarPeriodos.vue";
import RegistrarMatriculas from "@/modules/landing/pages/Matriculas/RegistrarMatricula.vue";
import ListarMatriculas from "@/modules/landing/pages/Matriculas/ListarMatriculas.vue";
import RegistrarProfesores from "@/modules/landing/pages/Profesores/RegistrarProfesor.vue";
import ListarProfesores from "@/modules/landing/pages/Profesores/ListarProfesores.vue";
import AsignarPermisos from "@/modules/auth/pages/Roles/AsignarPermisos.vue";
import ListarRoles from "@/modules/auth/pages/Roles/ListarRoles.vue";
import AsignarRoles from "@/modules/auth/pages/Roles/AsignarRoles.vue";
import RegistrarClases from "@/modules/landing/pages/Clases/RegistrarClases.vue";
import ListarClases from "@/modules/landing/pages/Clases/ListarClases.vue";

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";



export const router = createRouter({
    history: createWebHistory( import.meta.env.BASE_URL),
    routes: [
    // Landing
    {
        path: '/',
        name: 'landing',
        component: LandingLayout,
        children:[
        
            // Usuarios
        
            { path: '/usuarios/listar',name: 'ListarUsuarios',component: ListarUsuarios },
            { path: '/usuarios/registrar',name: 'RegistrarUsuarios',component: RegistrarUsuarios },
            
            // Estudiantes
            { path: '/estudiantes/registrar',name: 'RegistrarEstudiante',component: RegistrarEstudiante},
            { path: '/estudiantes/listar',name: 'ListarEstudiantes',component: ListarEstudiantes },
        
            // Representantes
        
            { path: '/representante/listar',name: 'ListarRepresentantes',component: ListarRepresentantes },
            { path: '/representante/registrar',name: 'RegistrarRepresentantes',component: RegistrarRepresentantes },

            // Cursos
            { path: '/cursos/listar',name: 'ListarCursos',component: ListarCursos },
            { path: '/cursos/registrar',name: 'RegistrarCursos',component: RegistrarCursos },

            // Materias
            { path: '/materias/registrar',name: 'RegistrarMaterias',component: RegistrarMaterias },
            { path: '/materias/listar',name: 'ListarMaterias',component: ListarMaterias },

            // Clases
            { path: '/clases/registrar',name: 'RegistrarClases',component: RegistrarClases },
            { path: '/clases/listar',name: 'ListarClases',component: ListarClases },

            // Periodos
            { path: '/periodos/registrar',name: 'RegistrarPeriodos',component: RegistrarPeriodos },

            // Matriculas
            { path: '/matriculas/registrar',name: 'RegistrarMatriculas',component: RegistrarMatriculas },
            { path: '/matriculas/listar',name: 'ListarMatriculas',component: ListarMatriculas },

            // Profesores
            { path: '/profesores/registrar',name: 'RegistrarProfesores',component: RegistrarProfesores },
            { path: '/profesores/listar',name: 'ListarProfesores',component: ListarProfesores },

            //Roles
            { path: '/roles/permisos',name: 'AsignarPermisos',component: AsignarPermisos },
            { path: '/roles/listar',name: 'ListarRoles',component: ListarRoles },
            { path: '/roles/asignar',name: 'AsignarRoles',component: AsignarRoles },

        ],
    },

    // Auth
    {
        path: '/login',
        name: 'AuthPage',
        component: ()=> import('@/modules/auth/pages/LoginPage.vue')
    }, 
    

    // No encontrado
    {
        path: '/:pathMatch(.*)*',
        component: NoEncontrado404,
    }


    ],
});

export default router;