// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const countdownElement = document.getElementById('countdown');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const currencySelect = document.getElementById('currency-select');
  const cryptoSelect = document.getElementById('crypto-select');
  const options = ["BTC", "ETH", "USDT", "XRP", "TRX", "DASH", "ZEC", "XEM", "IOST", "WIN", "BTT", "WRX"];

  // Populate the cryptocurrency dropdown options
  options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      cryptoSelect.appendChild(opt);
  });

  // Function to fetch data from the API
  const fetchFromWazirApi = async () => {
      try {
          const response = await fetch("https://quad-b-assignment-hodlinfo.vercel.app/api/fetch-tickers");
          const data = await response.json();
          // Handle response as needed
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  // Initial fetch of data from the API
  fetchFromWazirApi();

  // Countdown timer logic
  let countdown = 60;
  countdownElement.textContent = countdown;
  setInterval(() => {
      if (countdown > 0) {
          countdown -= 1;
          countdownElement.textContent = countdown;
          // Fetch new data when countdown reaches zero
          if (countdown === 0) {
              fetchFromWazirApi();
          }
      }
  }, 1000);

  // Toggle dark mode on or off
  darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  });

  // Open Telegram website when button is clicked
  document.getElementById('connect-telegram').addEventListener('click', () => {
      window.open('https://telegram.org/', '_blank');
  });

  // API URL for fetching cryptocurrency data
  const apiUrl = 'https://quad-b-assignment-hodlinfo.vercel.app/api/tickers';
  const tableBody = document.querySelector('#crypto-table tbody');
  const loadingSpinner = document.getElementById('loading-spinner');

  // Function to fetch and display cryptocurrency data in the table
  async function fetchCryptoData() {
      try {
          const response = await fetch(apiUrl);
          const tickers = await response.json();
          populateTable(tickers);
          // Hide the loading spinner once data is loaded
          loadingSpinner.style.display = 'none';
      } catch (error) {
          console.error('Error fetching tickers data:', error);
      }
  }

  // Populate the table with fetched cryptocurrency data
  function populateTable(tickers) {
      tableBody.innerHTML = ''; // Clear existing rows
      tickers.forEach((ticker, index) => {
          const row = `
              <tr>
                  <td>${index + 1}</td>
                  <td>${ticker.name}</td>
                  <td class="text-right">₹ ${formatNumber(ticker.last)}</td>
                  <td class="text-right">₹ ${formatNumber(ticker.buy)} / ₹ ${formatNumber(ticker.sell)}</td>
                  <td class="text-right">${formatNumber(ticker.volume)}</td>
                  <td class="text-right">${ticker.baseUnit}</td>
              </tr>
          `;
          tableBody.innerHTML += row;
      });
  }

  // Format numbers with commas
  function formatNumber(num) {
      return num ? num.toLocaleString() : num;
  }

  // Initial fetch of cryptocurrency data
  fetchCryptoData();
});
