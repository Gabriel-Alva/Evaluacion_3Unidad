// js/contacto.js
// Archivo para validación de formulario e interacciones dinámicas en la página de contacto

// Esperar a que el DOM esté completamente cargado
window.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario
    const formulario = document.querySelector('form');

    // Evento submit del formulario
    formulario.addEventListener('submit', function(event) {
        // Prevenir el envío por defecto
        event.preventDefault();

        // Validar los campos
        let esValido = true;
        let mensajes = [];

        // Obtener valores de los campos
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const telefono = document.getElementById('telefono');
        const asunto = document.getElementById('asunto');
        const mensaje = document.getElementById('mensaje');

        // Limpiar estilos previos
        [nombre, correo, telefono, asunto, mensaje].forEach(campo => {
            campo.classList.remove('is-invalid');
        });

        // Validar nombre (no vacío)
        if (nombre.value.trim() === '') {
            esValido = false;
            mensajes.push('El nombre es obligatorio.');
            nombre.classList.add('is-invalid');
        }

        // Validar correo (formato básico)
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo.value.trim())) {
            esValido = false;
            mensajes.push('El correo no es válido.');
            correo.classList.add('is-invalid');
        }

        // Validar asunto (seleccionado)
        if (!asunto.value) {
            esValido = false;
            mensajes.push('Selecciona un asunto.');
            asunto.classList.add('is-invalid');
        }

        // Validar mensaje (mínimo 10 caracteres)
        if (mensaje.value.trim().length < 10) {
            esValido = false;
            mensajes.push('El mensaje debe tener al menos 10 caracteres.');
            mensaje.classList.add('is-invalid');
        }

        // Si no es válido, mostrar mensajes y evitar envío
        mostrarMensajes(mensajes, esValido);
        if (!esValido) return;

        // Si es válido, mostrar mensaje de éxito y limpiar formulario
        formulario.reset();
    });

    // Función para mostrar mensajes de error o éxito
    function mostrarMensajes(mensajes, exito) {
        // Eliminar alertas previas
        const alertasPrevias = document.querySelectorAll('.alert-mensaje');
        alertasPrevias.forEach(alerta => alerta.remove());

        // Crear div de alerta
        const div = document.createElement('div');
        div.className = 'alert alert-mensaje mt-3';
        div.role = 'alert';
        if (exito) {
            div.classList.add('alert-success');
            div.textContent = '¡Formulario enviado correctamente!';
        } else {
            div.classList.add('alert-danger');
            div.innerHTML = mensajes.map(m => `<div>${m}</div>`).join('');
        }
        // Insertar después del formulario
        formulario.parentNode.insertBefore(div, formulario.nextSibling);
        // Quitar mensaje después de 4 segundos
        setTimeout(() => div.remove(), 4000);
    }

    // =============================
    // Ejemplo 1: Evento mouseover en el botón de enviar
    // =============================
    const btnEnviar = document.querySelector('button[type="submit"]');
    if (btnEnviar) {
        btnEnviar.addEventListener('mouseover', function() {
            // Guardar texto original
            if (!btnEnviar.dataset.originalText) {
                btnEnviar.dataset.originalText = btnEnviar.textContent;
            }
            btnEnviar.textContent = '¡Listo para enviar!';
        });
        btnEnviar.addEventListener('mouseout', function() {
            btnEnviar.textContent = btnEnviar.dataset.originalText || 'Enviar';
        });
    }

    // =============================
    // Ejemplo 2: Evento clic en el logo
    // =============================
    const logo = document.querySelector('.navbar-brand img');
    if (logo) {
        logo.addEventListener('click', function() {
            // Crear mensaje flotante
            const div = document.createElement('div');
            div.textContent = '¡Gracias por visitar Sabores del Mundo!';
            div.style.position = 'fixed';
            div.style.top = '20px';
            div.style.left = '50%';
            div.style.transform = 'translateX(-50%)';
            div.style.background = '#C1440E';
            div.style.color = '#fff';
            div.style.padding = '12px 32px';
            div.style.borderRadius = '20px';
            div.style.zIndex = '9999';
            div.style.fontWeight = 'bold';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 2500);
        });
    }

    // =============================
    // Ejemplo 3: Evento focus en el campo mensaje
    // =============================
    if (mensaje) {
        mensaje.addEventListener('focus', function() {
            mensaje.style.background = '#fffbe6';
        });
        mensaje.addEventListener('blur', function() {
            mensaje.style.background = '';
        });
    }

    // =============================
    // Ejemplo 4: Evento scroll en la ventana
    // =============================
    let avisoScroll = null;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            if (!avisoScroll) {
                avisoScroll = document.createElement('div');
                avisoScroll.textContent = '¿Necesitas ayuda? ¡Contáctanos!';
                avisoScroll.style.position = 'fixed';
                avisoScroll.style.top = '0';
                avisoScroll.style.left = '0';
                avisoScroll.style.width = '100%';
                avisoScroll.style.background = '#203500';
                avisoScroll.style.color = '#fff';
                avisoScroll.style.textAlign = 'center';
                avisoScroll.style.padding = '8px 0';
                avisoScroll.style.zIndex = '9999';
                avisoScroll.style.fontWeight = 'bold';
                document.body.appendChild(avisoScroll);
            }
        } else {
            if (avisoScroll) {
                avisoScroll.remove();
                avisoScroll = null;
            }
        }
    });

    // =============================
    // Ejemplo 5: Carga dinámica de contenido (noticias)
    // =============================
    const btnCargarNoticias = document.getElementById('btn-cargar-noticias');
    const contenedorNoticias = document.getElementById('contenedor-noticias');

    if (btnCargarNoticias && contenedorNoticias) {
        btnCargarNoticias.addEventListener('click', function() {
            // Datos de ejemplo para las noticias
            const noticias = [
                {
                    titulo: 'Nuevo curso de cocina internacional',
                    descripcion: '¡Inscríbete en nuestro nuevo curso y aprende recetas de todo el mundo!',
                    fecha: '10 de junio, 2025',
                    imagen: 'img/logo.png'
                },
                {
                    titulo: 'Visita guiada a la escuela',
                    descripcion: 'Ven a conocer nuestras instalaciones y equipo docente.',
                    fecha: '15 de junio, 2025',
                    imagen: 'img/logo.png'
                },
                {
                    titulo: 'Testimonios de nuestros egresados',
                    descripcion: 'Descubre las historias de éxito de quienes estudiaron con nosotros.',
                    fecha: '20 de junio, 2025',
                    imagen: 'img/logo.png'
                }
            ];

            // Limpiar el contenedor antes de cargar
            contenedorNoticias.innerHTML = '';

            // Crear y agregar cada card de noticia
            noticias.forEach(noticia => {
                // Crear el div de la card
                const card = document.createElement('div');
                card.className = 'col-md-4';
                card.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <img src="${noticia.imagen}" class="card-img-top" alt="Imagen noticia">
                        <div class="card-body">
                            <h5 class="card-title">${noticia.titulo}</h5>
                            <p class="card-text">${noticia.descripcion}</p>
                        </div>
                        <div class="card-footer text-muted small">${noticia.fecha}</div>
                    </div>
                `;
                contenedorNoticias.appendChild(card);
            });

            // Deshabilitar el botón después de cargar
            btnCargarNoticias.disabled = true;
            btnCargarNoticias.textContent = 'Noticias cargadas';
        });
    }
}); 