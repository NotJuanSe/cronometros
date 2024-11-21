// Gestor de Cronómetros

class GestorCronometros {
    constructor() {
        this.cronometros = [];
    }

    crearCronometro(duracion) {
        return {
            duracion: duracion,
            restante: duracion,
            estado: 'En Pausa',
            intervaloId: null
        };
    }

    iniciarCronometros(configuracionesCronometro) {
        // Limpiar cronómetros existentes
        this.cronometros.forEach(cronometro => {
            if (cronometro.intervaloId) {
                clearInterval(cronometro.intervaloId);
            }
        });

        // Crear cronómetros
        this.cronometros = configuracionesCronometro.map(config => 
            this.crearCronometro(config)
        );

        // Iniciar todos los cronómetros simultáneamente
        this.cronometros.forEach((cronometro, indice) => {
            const elementoCronometro = document.getElementById(`cronometro${indice + 1}`);
            const elementoEstado = document.getElementById(`estado${indice + 1}`);

            // Función para formatear el tiempo
            const formatearTiempo = (tiempo) => {
                if (tiempo < 0) tiempo = 0;
                
                const minutos = Math.floor(tiempo / 60);
                const segundos = tiempo % 60;
                return `${minutos.toString().padStart(2, '0')} : ${segundos.toString().padStart(2, '0')}`;
            };

            // Mostrar tiempo inicial
            elementoCronometro.textContent = formatearTiempo(cronometro.restante);

            cronometro.intervaloId = setInterval(() => {
                // Decrementar tiempo
                cronometro.restante--;
                
                // Actualizar visualización del cronómetro
                elementoCronometro.textContent = formatearTiempo(cronometro.restante);

                // Actualizar estado
                elementoEstado.textContent = 'Ejecutando...';

                // Verificar si el cronómetro ha terminado
                if (cronometro.restante <= 0) {
                    clearInterval(cronometro.intervaloId);
                    cronometro.estado = 'En Pausa';
                    elementoEstado.textContent = 'En Pausa';
                    elementoCronometro.textContent = '00 : 00';
                }
            }, 1000);
        });
    }
}

// Configuración de la Interfaz de Usuario
document.addEventListener('DOMContentLoaded', () => {
    const gestorCronometros = new GestorCronometros();
    const botonIniciar = document.getElementById('botonIniciar');

    botonIniciar.addEventListener('click', () => {
        const entradaCronometro1 = document.getElementById('entradaCronometro1');
        const entradaCronometro2 = document.getElementById('entradaCronometro2');
        const entradaCronometro3 = document.getElementById('entradaCronometro3');

        const configuracionesCronometro = [
            parseInt(entradaCronometro1.value),
            parseInt(entradaCronometro2.value),
            parseInt(entradaCronometro3.value)
        ];

        // Validar entradas
        if (configuracionesCronometro.some(isNaN)) {
            alert('Por favor, ingrese tiempos válidos para todos los cronómetros');
            return;
        }

        gestorCronometros.iniciarCronometros(configuracionesCronometro);
    });
});