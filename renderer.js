const axios = require('axios');

async function fetchTeslaStockPrice() {
    try {
        const apiKey = 'V5B5009A5D13WMU9SEL';
        const symbol = 'TSLA';
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

        const response = await axios.get(url);
        console.log('API response:', response.data);

        const data = response.data['Global Quote'];

        // Überprüfe, ob die Struktur korrekt ist
        if (data && data['05. price']) {
            const price = parseFloat(data['05. price']).toFixed(2);
            document.getElementById('price').innerText = `$${price}`;
        } else if (response.data['Note']) {
            // API-Limit erreicht
            console.error('API-Limit erreicht:', response.data['Note']);
            document.getElementById('price').innerText = 'API-Limit erreicht';
        } else {
            console.error('Unerwartete Antwortstruktur:', response.data);
            document.getElementById('price').innerText = 'Daten nicht verfügbar';
        }
    } catch (error) {
        console.error('Fehler beim Abrufen des Aktienkurses:', error.message);
        document.getElementById('price').innerText = `Fehler: ${error.message}`;
    }
}

// Initialer Abruf und regelmäßige Aktualisierung
fetchTeslaStockPrice();
setInterval(fetchTeslaStockPrice, 60000);