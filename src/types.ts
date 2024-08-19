// types.ts

export interface Representante {
    id: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    mail: string;
    genero: string | null;
    f_nacimiento: string;
    parentesco: string;
    direccion: string;
    telefono: string;
    created_at: string;
    updated_at: string;
  }
  

  export interface Role {
    id: number;
    name: string;
  }
  
  export interface Permission {
    id: number;
    name: string;
  }