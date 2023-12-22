$(document).ready(function () {
    cargarInformacion();
    actualizarEstadisticas();

    $("#botonGuardarInformacion").on("click", function (evento) {
        guardarInformacion();
    });

    $("#botonBorrarInformacion").on("click", function (evento) {
        borrarInformacion();
    });
});


function guardarInformacion() {
    var fecha = $('#fechaInput').val();
    var diaSemana = $('#diaInput').val();
    var hora = $('#horaInput').val();

    const [, dia, mes, año] = fecha.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    
    if (diaNum < 1 || diaNum > 31 || mesNum < 1 || mesNum > 12 || !fecha.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        alert('Formato de fecha incorrecto o valores de día/mes fuera de rango. Utilice DD/MM/AAAA');
        return;
    }
    
    console.log('La fecha es válida:', fecha);

    var diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    if (!diasSemana.includes(diaSemana.toLowerCase())) {
        alert('Nombre de día incorrecto. Utilice un día de la semana válido.');
        return;
    }

    const [, horas, minutos] = hora.match(/^(\d{1,2}):(\d{2})$/);
    if (
        (parseInt(horas, 10) < 0 || parseInt(horas, 10) > 23) ||
        (parseInt(minutos, 10) < 0 || parseInt(minutos, 10) > 59) ||
        !hora.match(/^\d{1,2}:\d{2}$/)
        ) {
    
    alert('Formato de hora incorrecto o valores fuera de rango. Utilice HH:MM');
    return;
    }

// Continúa con el código si la hora es válida
console.log('La hora es válida:', hora);


    var informacionGuardada = JSON.parse(localStorage.getItem('informacion')) || [];

    var userData = {
        fecha: fecha,
        diaSemana: diaSemana,
        hora: hora,
        ejercicio: $('#ejercicioInput').val()
    };

    informacionGuardada.push(userData);

    localStorage.setItem('informacion', JSON.stringify(informacionGuardada));

    location.reload();
}

function cargarInformacion() {
    var informacionGuardada = JSON.parse(localStorage.getItem('informacion')) || [];
    var infoList = $('#infoList');

    informacionGuardada.forEach(function (info) {
        infoList.append('<li>' + 'Fecha: ' + info.fecha + ', Día: ' + info.diaSemana + ', Hora: ' + info.hora + ', Parte del cuerpo trabajada: ' + info.ejercicio + '</li>');
    });
}

function borrarInformacion() {
    var confirmacion = window.confirm('¿Estás seguro de que deseas borrar todos los datos? Esta acción no se puede deshacer.');

    if (confirmacion) {
        localStorage.removeItem('informacion');
        location.reload();
    }
}

function actualizarEstadisticas() {
    var informacionGuardada = JSON.parse(localStorage.getItem('informacion')) || [];

    var ejerciciosContados = {};
    var maxHoras = 0;
    var ejercicioMasTrabajado = '';

    informacionGuardada.forEach(function (info) {
        if (ejerciciosContados[info.ejercicio]) {
            ejerciciosContados[info.ejercicio] += parseFloat(info.hora);
        } else {
            ejerciciosContados[info.ejercicio] = parseFloat(info.hora);
        }

        if (ejerciciosContados[info.ejercicio] > maxHoras) {
            maxHoras = ejerciciosContados[info.ejercicio];
            ejercicioMasTrabajado = info.ejercicio;
        }
    });

    $('#ejercicioMasTrabajado').text(ejercicioMasTrabajado);
}

