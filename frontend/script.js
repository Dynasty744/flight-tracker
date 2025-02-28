document.getElementById('flightForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const airline = document.getElementById('airline').value;

    fetch(`http://127.0.0.1:5000/flights?airline=${encodeURIComponent(airline)}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('results');
            results.innerHTML = '<h2>Flights:</h2>';
            if (data.length === 0) {
                results.innerHTML += '<p>No flights found.</p>';
            } else {
                data.forEach(flight => {
                    results.innerHTML += `
                        <div class="flight">
                            <p><strong>Flight:</strong> ${flight.flight.iata}</p>
                            <p><strong>Departure:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
                            <p><strong>Arrival:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
                            <p><strong>Status:</strong> ${flight.flight_status}</p>
                        </div>
                        <hr>
                    `;
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const results = document.getElementById('results');
            results.innerHTML = '<p>An error occurred while fetching flight data.</p>';
        });
});