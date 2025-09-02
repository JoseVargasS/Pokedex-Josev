export const t = {
  en: {
    cAccTitle: "Welcome to Poke Collection",
    email: "Email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    cAcc: "Create Account",
    login: "Login",
    logout: "Logout",
    phldSearch: "pokemon name",
    search: "Search",
    weight: "Weight",
    height: "Height",
    addfav: "Mark as Favorite",
    delFav: "Remove Favorite",
    fav: "Favorites",
    noSearch: "Ready to search",
    errSearch: "Pokemon not found",
    profile: "Profile",
    blank: "leave it blank to not change",
    update: "Update",
  },

  es: {
    cAccTitle: "Bienvenido a Poke Collection",
    email: "Correo electrónico",
    password: "Contraseña",
    firstName: "Nombres",
    lastName: "Apellidos",
    cAcc: "Crear cuenta",
    login: "Ingresar",
    logout: "Salir",
    phldSearch: "nombre de pokemon",
    search: "Buscar",
    weight: "Peso",
    height: "Altura",
    addfav: "Agregar a Favorite",
    delFav: "Eliminar Favorito",
    fav: "Favoritos",
    noSearch: "Listo para buscar",
    errSearch: "Pokemon no encontrado",
    profile: "Perfil",
    blank: "dejar vacio para no cambiar",
    update: "Actualizar",
  },
} as const;

// El tipo "Lang" es una clave del tipo de "t":
export type Lang = keyof typeof t; // "en" | "es"
//este tipo no se usa, solo sirve como otro ejemplo para entender el tipo de arriba
export type TranslationKey = keyof typeof t.en; // "cAccTitle" | " email" ...
//Asi puedo seguir agregando claves dentro de "t" (agregar mas idiomas) o "en"/"es" y los tipos se actualizaran automaticamente
