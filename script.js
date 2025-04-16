const container = document.getElementById("crypto-container");

async function getCryptoData() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await res.json();

    container.innerHTML = ""; // Clear existing content

    data.forEach(coin => {
      const card = document.createElement("div");
      card.className = "crypto-card";

      card.innerHTML = `
        <img src="${coin.image}" alt="${coin.name}" />
        <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
        <p>💲 $${coin.current_price.toLocaleString()}</p>
        <p style="color: ${coin.price_change_percentage_24h >= 0 ? 'lime' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Failed to fetch crypto data:", err);
    container.innerHTML = "<p>Error loading data. Try again later.</p>";
  }
}

// Load initially
getCryptoData();

// Update every 60 seconds
setInterval(getCryptoData, 60000);
