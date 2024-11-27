const axios = require('axios');

// Funktion zum Abrufen des Tesla-Aktienkurses
async function fetchTeslaStockPrice() {
  try {
    // Verwende eine zuverlässige API. Hier ein Beispiel mit Alpha Vantage
    const apiKey = 'V5B5009A5D13WMU9SEL'; // Ersetze mit deinem API-Schlüssel
    const symbol = 'TSLA';
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data['Global Quote'];

    if (data && data['05. price']) {
      const price = parseFloat(data['05. price']).toFixed(2);
      document.getElementById('price').innerText = `$${price}`;
    } else {
      document.getElementById('price').innerText = 'Daten nicht verfügbar';
    }
  } catch (error) {
    console.error('Fehler beim Abrufen des Aktienkurses:', error);
    document.getElementById('price').innerText = 'Fehler beim Laden';
  }
}

// Initialer Abruf und regelmäßige Aktualisierung alle 60 Sekunden
fetchTeslaStockPrice();
setInterval(fetchTeslaStockPrice, 60000);