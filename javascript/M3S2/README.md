# 🛍️ CRUD de Productos con Objetos, Sets y Maps en JavaScript

Este proyecto es un entrenamiento práctico que demuestra el uso de estructuras de datos avanzadas en JavaScript: **objetos, sets y maps**, aplicadas en la creación de un CRUD (Create, Read, Update, Delete) para productos.

---

## 🚀 Funcionalidad

La aplicación permite:

- Crear nuevos productos (nombre, precio, categoría).
- Mostrar productos organizados por categoría.
- Actualizar el nombre y precio de un producto existente.
- Eliminar productos.
- Validar que no se dupliquen los productos por nombre.

---

## 🧠 Estructuras de Datos Usadas

| Estructura | Descripción |
|-----------|-------------|
| `Object`  | Usado inicialmente para definir productos base (opcional). |
| `Set`     | Asegura que no se repita el nombre de productos. |
| `Map`     | Relaciona categorías con arrays de productos. |

---

## 🧩 Requisitos Técnicos Implementados

✅ Uso de una clase `Products` con propiedades:  
- `id`, `name`, `price`, `category`.

✅ Se utiliza `Set` para validar duplicados por nombre.

✅ `Map` para clasificar productos por categoría.

✅ Iteración con:
- `for...of` para recorrer arrays de productos.
- `forEach()` para recorrer el `Map`.
- `for...in` y `Object.keys()`, `Object.values()`, `Object.entries()` (ver sección extra si se incluyen productos iniciales).

---

## 👨‍💻 Cómo usarlo

1. Abre el archivo `index.html` en un navegador moderno.
2. Agrega, edita o elimina productos usando los formularios.
3. Haz clic en "Show products" para ver la lista actual.

---

## 📝 Estructura del Proyecto

```plaintext
.
├── index.html          # Estructura visual del CRUD
├── script.js           # Lógica JavaScript (con Sets, Maps y clases)
└── README.md           # Este archivo
