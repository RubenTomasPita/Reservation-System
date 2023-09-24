document.addEventListener('DOMContentLoaded', () => {
  const reservaForm = document.getElementById('reservaForm');

  reservaForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    try {
      // Realizar una solicitud POST para enviar los datos de reserva al servidor (Para no perderme)
      const response = await fetch('/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personas, fecha, hora }),
      });

      const responseText = await response.text();

      
      if (responseText.includes('Error al realizar la reserva')) {
      
        alert('Error al realizar la reserva');
      } else {
        
        reservaForm.reset();
        // Abrir  nueva ventana con el mensaje de confirmacion
        window.open('/reserva_exitosa.html', '_blank', 'width=400,height=200');
      }
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
    }
  });
});
