# Informe Final: Desarrollo de la Aplicación AromaLife

## Descripción
Este informe detalla el desarrollo de la aplicación web AromaLife, diseñada para gestionar las operaciones de una tienda de velas aromáticas. La aplicación incluye funcionalidades como autenticación de usuarios, gestión de políticas de devolución, y registro de nuevos usuarios, entre otras. Se ha implementado utilizando tecnologías modernas como React, Next.js, y Context API para la gestión del estado.

## Introducción
El objetivo principal de este proyecto es proporcionar una plataforma intuitiva y funcional para los clientes de AromaLife. La aplicación permite a los usuarios interactuar con la tienda de manera eficiente, ofreciendo una experiencia personalizada y segura. Este informe describe las principales características implementadas, el diseño técnico, y cómo se cumplen los requisitos establecidos en la rúbrica.

## Explicación de la Clase: Página de Registro (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `Page` es un componente funcional de React que actúa como un punto de entrada para la página de registro de usuarios. Su propósito es renderizar el componente `RegisterPage`, que contiene la lógica y el diseño de la funcionalidad de registro.

### Funcionalidades Implementadas
1. **Renderización del Componente de Registro**:
   - La clase simplemente retorna el componente `RegisterPage`, delegando toda la lógica y el diseño de la funcionalidad de registro a este componente.

2. **Modularidad**:
   - Al separar la lógica de registro en el componente `RegisterPage`, se promueve la reutilización del código y la organización del proyecto.

### Implementación Técnica
1. **Uso de React**:
   - El componente utiliza React para estructurar y renderizar el contenido de la página.

2. **Importación del Componente `RegisterPage`**:
   - Se importa el componente `RegisterPage` desde la carpeta `components/register`, lo que permite mantener la lógica de registro en un archivo dedicado.



### Descripción
La clase `ReturnsPage` es un componente funcional de React que actúa como la página principal para mostrar las políticas de devolución de la tienda. Su propósito es presentar información detallada sobre las políticas de devolución, los procedimientos en caso de daños, y los datos de contacto del servicio al cliente.

### Funcionalidades Implementadas
1. **Visualización de Políticas de Devolución**:
   - La página muestra las políticas actualizadas de devolución, incluyendo cambios debido a COVID-19.
   - Se detalla el proceso para realizar devoluciones en tienda y en línea.

2. **Información sobre Productos en Oferta**:
   - Se especifica que los productos en oferta son de venta final y no son elegibles para devoluciones o cambios.

3. **Gestión de Daños y Perjuicios**:
   - Se proporciona un procedimiento para reportar productos dañados, incluyendo el envío de un correo electrónico con evidencia del daño.

4. **Datos de Contacto**:
   - La página incluye información de contacto del servicio al cliente, como horarios, teléfono y correo electrónico.

5. **Navegación**:
   - Se implementa un botón para regresar a la página anterior utilizando el hook `useRouter` de Next.js.

### Implementación Técnica
1. **Uso de React**:
   - El componente utiliza React para estructurar y renderizar la información de manera dinámica.

2. **Estilización**:
   - Se emplean clases de Tailwind CSS para aplicar estilos consistentes y responsivos.

3. **Navegación con Next.js**:
   - El hook `useRouter` permite manejar la navegación, facilitando la interacción del usuario con la aplicación.

## Explicación de la Clase: Panel de Administración (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `AdminPanelPage` es un componente funcional de React que actúa como el panel de administración de la aplicación. Su propósito es permitir la gestión de diferentes secciones de la tienda, como fragancias, contenedores, complementos y órdenes. Los administradores pueden añadir, editar y eliminar elementos en cada sección.

### Funcionalidades Implementadas
1. **Gestión de Secciones**:
   - El panel permite alternar entre diferentes secciones: fragancias, contenedores, complementos y órdenes.
   - Cada sección tiene su propia lógica para mostrar y gestionar los elementos.

2. **Visualización de Elementos**:
   - Los elementos de cada sección se muestran en un diseño de tarjetas con información relevante, como nombre, descripción, precio, y más.

3. **Añadir Nuevos Elementos**:
   - Los administradores pueden añadir nuevos elementos a cualquier sección utilizando un formulario modal.

4. **Editar Elementos Existentes**:
   - Los elementos existentes pueden ser editados mediante un formulario modal que permite modificar sus propiedades.

5. **Eliminar Elementos**:
   - Los administradores pueden eliminar elementos de cualquier sección con confirmación previa.

6. **Gestión de Órdenes**:
   - En la sección de órdenes, se muestra información detallada como ID, estado, total, método de pago, dirección de envío, y más.

### Implementación Técnica
1. **Uso de React**:
   - El componente utiliza hooks como `useState` y `useEffect` para manejar el estado y los efectos secundarios.

2. **Navegación con Next.js**:
   - Se utiliza el hook `useRouter` para manejar la navegación dentro del panel.

3. **Servicios API**:
   - Se integran servicios API para realizar operaciones CRUD (crear, leer, actualizar, eliminar) en cada sección:
     - `fetchFragrances`, `createFragrance`, `updateFragrance`, `deleteFragrance` para fragancias.
     - `fetchContainers`, `createContainer`, `updateContainer`, `deleteContainer` para contenedores.
     - `fetchComplementaryProducts`, `createComplementaryProduct`, `updateComplementaryProduct`, `deleteComplementaryProduct` para complementos.
     - `fetchAllOrders`, `createOrder`, `updateOrder`, `deleteOrder` para órdenes.

4. **Modales para Añadir y Editar**:
   - Los formularios para añadir y editar elementos se implementan en modales que aparecen dinámicamente según la acción seleccionada.

5. **Estilización**:
   - Se emplean clases de Tailwind CSS para aplicar estilos consistentes y responsivos.

6. **Mapeo de Imágenes**:
   - Se utiliza un mapeo de nombres a URLs de imágenes para mostrar imágenes específicas según el elemento.

### Resumen
El `AdminPanelPage` es una herramienta completa para la gestión de la tienda, proporcionando una interfaz intuitiva para realizar operaciones administrativas. Su diseño modular y uso de servicios API lo hacen escalable y fácil de mantener.

## Explicación de la Clase: Página del Carrito de Compras (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `CartPage` es un componente funcional de React que actúa como la página principal para gestionar el carrito de compras de los usuarios. Su propósito es mostrar los productos personalizados y sus complementos que el usuario ha añadido al carrito, permitir la modificación de cantidades, eliminar productos, y proceder al checkout.

### Funcionalidades Implementadas
1. **Visualización de Productos en el Carrito**:
   - Muestra las velas personalizadas y sus complementos añadidos al carrito.
   - Cada producto incluye información como nombre, precio, cantidad, y opciones para modificar la cantidad o eliminar el producto.

2. **Gestión de Complementos**:
   - Los complementos asociados a las velas personalizadas se muestran en una lista separada.
   - Los usuarios pueden eliminar complementos específicos directamente desde el carrito.

3. **Modificación de Cantidades**:
   - Permite a los usuarios ajustar la cantidad de cada producto en el carrito mediante un campo de entrada numérico.

4. **Eliminación de Productos**:
   - Los usuarios pueden eliminar velas personalizadas y sus complementos asociados del carrito.

5. **Resumen del Total**:
   - Calcula y muestra el total del carrito, incluyendo el precio de las velas personalizadas y los complementos.

6. **Checkout**:
   - Incluye un botón para proceder al checkout, que guarda los productos del carrito en `localStorage` y redirige al usuario a la página de checkout.

7. **Carrito Vacío**:
   - Si el carrito está vacío, muestra un mensaje indicando que no hay productos y ofrece un botón para personalizar una vela.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` y `useEffect` para manejar el estado de los productos en el carrito y los complementos.

2. **Integración con Servicios API**:
   - Se utilizan servicios API para cargar las velas personalizadas y sus complementos desde el servidor:
     - `fetchCustomCandlesByUserId` para obtener las velas personalizadas del usuario.
     - `fetchCustomCandleComplementaryProductsByCustomCandleId` para obtener los complementos asociados.
     - `fetchComplementaryProductById` para obtener información detallada de los complementos.

3. **Gestión de Estado Local**:
   - Los productos y complementos se almacenan en el estado local del componente utilizando `useState`.

4. **Cálculo del Total**:
   - El total del carrito se calcula sumando los precios de las velas personalizadas y los complementos.

5. **Navegación con Next.js**:
   - Utiliza el hook `useRouter` para redirigir al usuario a la página de checkout o a la página de personalización de velas.

6. **Estilización**:
   - Se emplean clases de Tailwind CSS para aplicar estilos consistentes y responsivos.

### Resumen
La clase `CartPage` proporciona una experiencia completa para la gestión del carrito de compras, permitiendo a los usuarios visualizar, modificar y eliminar productos, así como proceder al checkout. Su integración con servicios API y su diseño modular la hacen eficiente y fácil de mantener.

## Explicación de la Clase: Página de Checkout (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `CheckoutPage` es un componente funcional de React que actúa como la página principal para finalizar el proceso de compra. Su propósito es recopilar la información de envío y pago del usuario, mostrar un resumen de los productos en el carrito, calcular el total de la compra, y procesar la orden.

### Funcionalidades Implementadas
1. **Recopilación de Información de Envío**:
   - Permite al usuario ingresar datos como nombre completo, teléfono, dirección, ciudad y código postal.
   - Algunos campos, como el nombre y el correo electrónico, se completan automáticamente utilizando los datos del usuario autenticado.

2. **Selección del Método de Pago**:
   - Ofrece opciones de pago como tarjeta de crédito/débito, PayPal y MercadoPago.
   - El usuario puede seleccionar su método preferido mediante botones de radio.

3. **Resumen del Pedido**:
   - Muestra una lista de los productos en el carrito, incluyendo nombre, descripción, precio y cantidad.
   - También incluye una sección para los complementos añadidos al carrito.

4. **Cálculo del Total**:
   - Calcula el subtotal de los productos y complementos, agrega el costo de envío, y muestra el total final.

5. **Procesamiento de la Orden**:
   - Al hacer clic en el botón "Completar Compra", se crea una orden en el servidor con los datos de envío, los productos seleccionados, y el método de pago.
   - Los productos en el carrito se marcan como completados y se eliminan del almacenamiento local.

6. **Redirección al Perfil**:
   - Una vez completada la compra, el usuario es redirigido a su perfil.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` para manejar el estado del formulario y los datos del carrito.
   - Utiliza `useEffect` para cargar los datos del carrito desde `localStorage`.

2. **Integración con Servicios API**:
   - Se utilizan servicios API para crear la orden y los ítems de la orden:
     - `createOrder` para crear la orden principal.
     - `createOrderItem` para asociar los productos a la orden.
     - `updateCustomCandle` para actualizar el estado de las velas personalizadas.

3. **Gestión de Estado Local**:
   - Los datos del formulario y los productos del carrito se almacenan en el estado local del componente.

4. **Navegación con Next.js**:
   - Utiliza el hook `useRouter` para redirigir al usuario al perfil después de completar la compra.

5. **Estilización**:
   - Se emplean clases de Tailwind CSS para aplicar estilos consistentes y responsivos.

### Resumen
La clase `CheckoutPage` proporciona una experiencia completa para finalizar la compra, permitiendo al usuario ingresar información de envío, seleccionar un método de pago, y procesar la orden. Su integración con servicios API y su diseño modular la hacen eficiente y fácil de mantener.

## Explicación de la Clase: Página de Acceso Restringido (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `ForbiddenPage` es un componente funcional de React que actúa como la página principal para mostrar un mensaje de acceso restringido. Su propósito es informar al usuario que no tiene los permisos necesarios para acceder a la página solicitada y ofrecer un enlace para regresar al inicio.

### Funcionalidades Implementadas
1. **Mensaje de Acceso Restringido**:
   - Muestra un mensaje claro indicando que el usuario no tiene permisos suficientes para acceder a la página.

2. **Enlace para Regresar al Inicio**:
   - Incluye un enlace que redirige al usuario a la página principal de la aplicación.

3. **Diseño Centrado**:
   - El diseño está centrado vertical y horizontalmente en la pantalla, proporcionando una experiencia visual limpia y profesional.

### Implementación Técnica
1. **Uso de React**:
   - El componente utiliza React para estructurar y renderizar el contenido de la página.

2. **Estilización**:
   - Se emplean estilos en línea para aplicar un diseño limpio y responsivo:
     - Fondo claro (`#FBF9F5`) para la página.
     - Caja blanca con bordes redondeados y sombra para el mensaje principal.
     - Colores específicos para el texto y el enlace (`#D32F2F` para el encabezado y `#8FA889` para el enlace).

3. **Enlace de Navegación**:
   - Utiliza un elemento `<a>` para redirigir al usuario a la página principal.

### Resumen
La clase `ForbiddenPage` proporciona una experiencia sencilla y efectiva para manejar accesos restringidos. Su diseño centrado y mensaje claro aseguran que el usuario entienda la situación y pueda regresar fácilmente al inicio.

## Explicación del Hook: `useRoleGuard` (`useRoleGuard.ts`)

### Ubicación
El hook se encuentra en el archivo:

useRoleGuard.ts

### Descripción
El hook `useRoleGuard` es una función personalizada de React que se utiliza para restringir el acceso a ciertas páginas de la aplicación según los roles del usuario. Su propósito es verificar si el usuario tiene los roles necesarios para acceder a una página específica y redirigirlo a la página de acceso restringido (`/forbidden`) en caso de que no cumpla con los requisitos.

### Funcionalidades Implementadas
1. **Verificación de Roles**:
   - Compara los roles del usuario con una lista de roles permitidos (`allowedRoles`).
   - La comparación se realiza ignorando mayúsculas y minúsculas para mayor flexibilidad.

2. **Redirección Automática**:
   - Si el usuario no está autenticado o no tiene un rol permitido, el hook redirige automáticamente al usuario a la página `/forbidden`.

3. **Uso Dinámico**:
   - Permite especificar una lista de roles permitidos al momento de usar el hook, adaptándose a las necesidades de cada página.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza el hook `useEffect` para ejecutar la lógica de verificación cada vez que cambian los datos del usuario o la lista de roles permitidos.

2. **Integración con Context API**:
   - Utiliza el contexto `useUser` para acceder a los datos del usuario autenticado, como sus roles.

3. **Navegación con Next.js**:
   - Utiliza el hook `useRouter` para redirigir al usuario a la página `/forbidden` en caso de que no cumpla con los requisitos.

4. **Comparación de Roles**:
   - Convierte los roles del usuario y los roles permitidos a minúsculas para realizar una comparación insensible a mayúsculas/minúsculas.

### Resumen
El hook `useRoleGuard` es una herramienta eficiente para implementar restricciones de acceso basadas en roles dentro de la aplicación. Su diseño modular y reutilizable permite aplicarlo fácilmente en cualquier página que requiera control de acceso, mejorando la seguridad y la experiencia del usuario.

## Explicación de la Clase: Página de Inicio de Sesión (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `LoginPage` es un componente funcional de React que actúa como la página principal para iniciar sesión en la aplicación. Su propósito es permitir que los usuarios ingresen sus credenciales (correo electrónico y contraseña) para autenticarse y acceder a las funcionalidades protegidas de la aplicación.

### Funcionalidades Implementadas
1. **Formulario de Inicio de Sesión**:
   - Permite a los usuarios ingresar su correo electrónico y contraseña para autenticarse.
   - Incluye validación de campos obligatorios antes de enviar el formulario.

2. **Gestión de Errores**:
   - Muestra mensajes de error si los campos están vacíos o si las credenciales son incorrectas.

3. **Visibilidad de Contraseña**:
   - Incluye un botón para alternar entre mostrar y ocultar la contraseña, mejorando la experiencia del usuario.

4. **Autenticación**:
   - Envía las credenciales al servidor mediante el servicio `loginUser`.
   - Al autenticarse correctamente, guarda el token y los datos del usuario en `localStorage` y actualiza el estado global del usuario utilizando el contexto `useUser`.

5. **Redirección**:
   - Redirige al usuario a la página principal (`/`) después de un inicio de sesión exitoso.

6. **Enlace para Recuperar Contraseña**:
   - Proporciona un enlace para que los usuarios puedan recuperar su contraseña en caso de olvidarla.

7. **Registro de Nuevos Usuarios**:
   - Incluye un enlace para redirigir a los usuarios a la página de registro si no tienen una cuenta.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` para manejar el estado de los campos del formulario, errores y visibilidad de la contraseña.
   - Utiliza el hook `useRouter` de Next.js para manejar la redirección después del inicio de sesión.

2. **Integración con Servicios API**:
   - Utiliza el servicio `loginUser` para enviar las credenciales al servidor y recibir el token y los datos del usuario.

3. **Gestión de Estado Global**:
   - Utiliza el contexto `useUser` para actualizar el estado global del usuario autenticado.

4. **Estilización**:
   - Utiliza un archivo CSS modular (`LoginPage.module.css`) para aplicar estilos personalizados al formulario y sus elementos.

5. **Uso de Variables de Entorno**:
   - Utiliza la variable de entorno `NEXT_PUBLIC_IMAGE_BASE_URL` para cargar imágenes dinámicamente, como los íconos de visibilidad de contraseña.

### Resumen
La clase `LoginPage` proporciona una experiencia completa para el inicio de sesión, permitiendo a los usuarios autenticarse de manera segura y eficiente. Su integración con servicios API, gestión de estado global y diseño intuitivo la hacen una pieza clave en la funcionalidad de autenticación de la aplicación.

## Explicación de la Clase: Página de Personalización (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
page.tsx


### Descripción
La clase `Personalize` es un componente funcional de React que actúa como la página principal para personalizar velas aromáticas. Su propósito es permitir a los usuarios seleccionar contenedores, fragancias, imágenes, mensajes sensoriales, complementos y generar códigos QR para crear una vela personalizada.

### Funcionalidades Implementadas
1. **Selección de Contenedor**:
   - Permite al usuario elegir entre diferentes tipos de contenedores disponibles para la vela.
   - Muestra imágenes y precios de los contenedores.

2. **Selección de Fragancia**:
   - Permite al usuario seleccionar una fragancia para la vela.
   - Muestra imágenes asociadas a cada fragancia.

3. **Personalización con Imagen**:
   - Permite al usuario subir una imagen personalizada que será utilizada en la vela.
   - Muestra una vista previa de la imagen subida.

4. **Generación de Mensaje Sensorial con IA**:
   - Permite al usuario escribir un mensaje que será embellecido utilizando un servicio de inteligencia artificial.
   - Muestra el resultado generado por la IA.

5. **Generación de Código QR**:
   - Permite al usuario generar un código QR basado en una URL proporcionada.
   - Muestra una vista previa del código QR generado.

6. **Selección de Complementos**:
   - Permite al usuario añadir complementos como chocolates, flores, jabones, entre otros, a la vela personalizada.

7. **Resumen del Pedido**:
   - Muestra un resumen de la vela personalizada, incluyendo el contenedor, fragancia, mensaje sensorial, complementos y el precio total.

8. **Confirmación y Compra**:
   - Permite al usuario confirmar la personalización y proceder a la compra.
   - Crea la vela personalizada en el servidor y la añade al carrito.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` para manejar el estado de las selecciones y datos de personalización.
   - Utiliza `useEffect` para cargar datos desde servicios API al montar el componente.

2. **Integración con Servicios API**:
   - Utiliza múltiples servicios API para obtener datos y realizar operaciones:
     - `fetchContainers` para obtener los contenedores disponibles.
     - `fetchFragrances` para obtener las fragancias disponibles.
     - `fetchComplementaryProducts` para obtener los complementos disponibles.
     - `fetchBeautifyText` para embellecer mensajes con IA.
     - `fetchGenerateQrCode` para generar códigos QR.
     - `createCustomCandle` para crear la vela personalizada en el servidor.
     - `connectComplementaryProductToCustomCandle` para asociar complementos a la vela personalizada.

3. **Gestión de Estado Local**:
   - Utiliza estados locales para manejar las selecciones de contenedor, fragancia, complementos, imagen, mensaje sensorial y código QR.

4. **Navegación con Next.js**:
   - Utiliza el hook `useRouter` para redirigir al usuario al carrito después de confirmar la compra.

5. **Estilización**:
   - Utiliza clases de Tailwind CSS para aplicar estilos consistentes y responsivos.

6. **Mapeo de Imágenes**:
   - Utiliza mapeos de nombres a URLs de imágenes para mostrar imágenes específicas según el contenedor, fragancia o complemento seleccionado.

### Resumen
La clase `Personalize` proporciona una experiencia completa e interactiva para personalizar velas aromáticas. Su integración con servicios API, diseño modular y funcionalidades avanzadas como generación de mensajes con IA y códigos QR la hacen una pieza clave en la aplicación.

## Explicación de la Clase: Página de Perfil de Usuario (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `UserProfilePage` es un componente funcional de React que actúa como la página principal para gestionar el perfil del usuario. Su propósito es permitir a los usuarios visualizar su información personal y cambiar su contraseña de manera segura.

### Funcionalidades Implementadas
1. **Visualización de Información del Usuario**:
   - Muestra el nombre, correo electrónico y avatar del usuario autenticado.
   - Utiliza el contexto `useUser` para obtener los datos del usuario.

2. **Cambio de Contraseña**:
   - Permite al usuario cambiar su contraseña ingresando la contraseña actual, la nueva contraseña y confirmando la nueva contraseña.
   - Incluye validaciones para asegurar que los campos estén completos y que las contraseñas coincidan.

3. **Gestión de Errores**:
   - Muestra mensajes de error si los campos están vacíos, si la nueva contraseña no cumple con los requisitos, o si las contraseñas no coinciden.

4. **Confirmación de Éxito**:
   - Muestra un mensaje de éxito cuando la contraseña se actualiza correctamente.
   - Por seguridad, cierra la sesión del usuario y lo redirige a la página de inicio de sesión.

5. **Visibilidad de Contraseña**:
   - Incluye botones para alternar entre mostrar y ocultar las contraseñas ingresadas, mejorando la experiencia del usuario.

6. **Redirección Automática**:
   - Si el usuario no está autenticado, muestra un mensaje de carga o redirige a la página de inicio de sesión.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` para manejar el estado de los campos del formulario, errores y mensajes de éxito.
   - Utiliza el contexto `useUser` para obtener y actualizar los datos del usuario.

2. **Integración con Servicios API**:
   - Utiliza el servicio `changeUserPassword` para enviar la solicitud de cambio de contraseña al servidor.

3. **Validación de Formulario**:
   - Implementa una función de validación para verificar que los campos estén completos, que la nueva contraseña cumpla con los requisitos, y que las contraseñas coincidan.

4. **Estilización**:
   - Utiliza un archivo CSS modular (`UserProfilePage.module.css`) para aplicar estilos personalizados al formulario y sus elementos.

5. **Uso de Imágenes**:
   - Utiliza la librería `next/image` para mostrar íconos de visibilidad de contraseña y el avatar del usuario.

6. **Gestión de Sesión**:
   - Cierra la sesión del usuario después de cambiar la contraseña, eliminando los datos del usuario y el token de `localStorage`.

### Resumen
La clase `UserProfilePage` proporciona una experiencia completa para la gestión del perfil del usuario, permitiendo visualizar información personal y cambiar la contraseña de manera segura. Su integración con servicios API, validaciones robustas y diseño intuitivo la hacen una pieza clave en la funcionalidad de la aplicación.

## Explicación de la Clase: Página de Suscripción (`page.tsx`)

### Ubicación
La clase se encuentra en el archivo:
```
page.tsx
```

### Descripción
La clase `Subscription` es un componente funcional de React que actúa como la página principal para gestionar los planes de suscripción de velas aromáticas. Su propósito es presentar diferentes planes de suscripción, beneficios exclusivos, y responder preguntas frecuentes sobre el servicio.

### Funcionalidades Implementadas
1. **Sección Hero**:
   - Muestra un encabezado atractivo con un fondo estilizado que introduce la suscripción mensual de velas personalizadas.

2. **Planes de Suscripción**:
   - Presenta tres planes de suscripción: Esencial, Premium y Exclusivo.
   - Cada plan incluye detalles como precio, beneficios específicos (cantidad de velas, personalización, envío, etc.), y un botón para seleccionar el plan.

3. **Beneficios Exclusivos**:
   - Muestra una sección con beneficios destacados, como personalización con IA, experiencia sensorial, y acceso a contenido exclusivo.

4. **Preguntas Frecuentes (FAQ)**:
   - Implementa un sistema de acordeón para responder preguntas comunes sobre la suscripción, como cómo funciona, política de cancelación, y tiempos de envío.

### Implementación Técnica
1. **Uso de React**:
   - Utiliza hooks como `useState` para manejar el estado del acordeón en la sección de preguntas frecuentes.

2. **Estilización**:
   - Utiliza clases de Tailwind CSS para aplicar estilos modernos y responsivos.
   - Incluye transiciones y efectos de sombra para mejorar la experiencia visual.

3. **Interactividad**:
   - Implementa un sistema de acordeón para expandir y colapsar las respuestas en la sección de preguntas frecuentes.

4. **Diseño Modular**:
   - Divide la página en secciones claras: Hero, Planes de Suscripción, Beneficios, y Preguntas Frecuentes.

### Resumen
La clase `Subscription` proporciona una experiencia completa para explorar y seleccionar planes de suscripción de velas aromáticas. Su diseño atractivo, interactividad, y organización modular la convierten en una pieza clave para atraer y retener clientes.

## Conclusión

El desarrollo de la aplicación web AromaLife ha permitido crear una plataforma robusta, intuitiva y funcional para gestionar las operaciones de una tienda de velas aromáticas. A lo largo del informe, se han detallado las principales funcionalidades implementadas, como la autenticación de usuarios, personalización de productos, gestión de políticas de devolución, suscripción a planes exclusivos, y administración de la tienda. 

La aplicación utiliza tecnologías modernas como React, Next.js, y Context API para garantizar una experiencia de usuario fluida y segura, además de facilitar la gestión del estado global. Cada componente y página ha sido diseñado con modularidad y escalabilidad en mente, lo que asegura que la aplicación pueda adaptarse a futuras necesidades y crecer junto con el negocio.

En resumen, AromaLife no solo cumple con los requisitos funcionales establecidos, sino que también ofrece una experiencia personalizada y atractiva para los usuarios, posicionándose como una solución tecnológica eficiente para el mercado de velas aromáticas.







