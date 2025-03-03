// Data for years, months, Pakshas, and Tithis
const years = Array.from({ length: 50 }, (_, i) => 2000 + i); // 2000–2049
const months = [
    "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", 
    "Shravana", "Bhadrapada", "Ashwin", "Kartik", 
    "Margashirsha", "Pausha", "Magha", "Phalguna"
];
const pakshas = ["Krishna Paksha", "Shukla Paksha"];
const tithis = [
    "Pratipada (1)", "Dwitiya (2)", "Tritiya (3)", "Chaturthi (4)", 
    "Panchami (5)", "Shashthi (6)", "Saptami (7)", "Ashtami (8)", 
    "Navami (9)", "Dashami (10)", "Ekadashi (11)", "Dwadashi (12)", 
    "Trayodashi (13)", "Chaturdashi (14)", "Amavasya (15)", "Purnima (15)"
];

// List of Adhik Maas (extra months) with Gregorian year and Hindu month index
const adhikMaasList = [
    { year: 2013, monthIndex: 5 },  // Adhik Bhadrapada (2012–2013)
    { year: 2016, monthIndex: 3 },  // Adhik Ashada (2015–2016)
    { year: 2019, monthIndex: 2 },  // Adhik Jyeshta (2018–2019)
    { year: 2021, monthIndex: 6 },  // Adhik Ashwin (2020–2021)
    { year: 2024, monthIndex: 4 },  // Adhik Shravan (2023–2024)
    { year: 2027, monthIndex: 2 },  // Adhik Jyeshta (2026–2027)
    { year: 2030, monthIndex: 0 },  // Adhik Chaitra (2029–2030)
    { year: 2032, monthIndex: 5 },  // Adhik Bhadrapada (2031–2032)
    { year: 2035, monthIndex: 3 },  // Adhik Ashada (2034–2035)
    { year: 2026, monthIndex: 3 },  // Adhik Ashadha (2025–2026)
    { year: 2029, monthIndex: 0 },  // Adhik Chaitra (2028–2029)
    { year: 2031, monthIndex: 5 },  // Adhik Bhadrapada (2030–2031)
    { year: 2034, monthIndex: 3 },  // Adhik Ashada (2033–2034)
    { year: 2036, monthIndex: 10 }, // Adhik Magha (2035–2036)
    { year: 2039, monthIndex: 0 },  // Adhik Chaitra (2038–2039)
    { year: 2041, monthIndex: 5 },  // Adhik Bhadrapada (2040–2041)
    { year: 2044, monthIndex: 3 },  // Adhik Ashada (2043–2044)
    { year: 2046, monthIndex: 10 }, // Adhik Magha (2045–2046)
    { year: 2049, monthIndex: 0 },  // Adhik Chaitra (2048–2049)
];

// Populate dropdowns
function populateDropdown(id, options) {
    const select = document.getElementById(id);
    options.forEach((option, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.text = option;
        select.add(opt);
    });
}

// Function to update month dropdown with Adhik Maas
function updateMonthDropdown(year, monthId) {
    const select = document.getElementById(monthId);
    select.innerHTML = ''; // Clear existing options

    // Add standard months
    months.forEach((month, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.text = month;
        select.add(opt);
    });

    // Add Adhik Maas if applicable
    const adhikMaas = adhikMaasList.find(maas => maas.year === year);
    if (adhikMaas) {
        const opt = document.createElement('option');
        opt.value = adhikMaas.monthIndex;
        opt.text = `Adhik ${months[adhikMaas.monthIndex]}`;
        select.add(opt);
    }
}

// Event listeners for year dropdowns
document.getElementById('startYear').addEventListener('change', function() {
    const year = parseInt(this.value) + 2000; // Convert index to year
    updateMonthDropdown(year, 'startMonth');
});

document.getElementById('endYear').addEventListener('change', function() {
    const year = parseInt(this.value) + 2000; // Convert index to year
    updateMonthDropdown(year, 'endMonth');
});

// Initialize dropdowns
populateDropdown('startYear', years);
populateDropdown('endYear', years);
populateDropdown('startPaksha', pakshas);
populateDropdown('endPaksha', pakshas);
populateDropdown('startTithi', tithis);
populateDropdown('endTithi', tithis);
updateMonthDropdown(2000, 'startMonth'); // Default start year
updateMonthDropdown(2000, 'endMonth');   // Default end year

// Calculate days between dates with Adhik Maas adjustment
function getDaysBetweenDates(startYear, startMonth, startPaksha, startTithi, endYear, endMonth, endPaksha, endTithi) {
    const tithisPerMonth = 30;

    // Calculate raw Tithis (1 Tithi = 1 day)
    const startTotalTithis = (startYear * 12 * tithisPerMonth) + 
                             (startMonth * tithisPerMonth) + 
                             (startPaksha === 0 ? 0 : 15) + 
                             startTithi;
    const endTotalTithis = (endYear * 12 * tithisPerMonth) + 
                           (endMonth * tithisPerMonth) + 
                           (endPaksha === 0 ? 0 : 15) + 
                           endTithi;
    let rawDays = endTotalTithis - startTotalTithis;

    // Add 30 days for each Adhik Maas in the date range
    let adhikMaasCount = 0;
    for (const maas of adhikMaasList) {
        if (
            maas.year > startYear || 
            (maas.year === startYear && maas.monthIndex >= startMonth)
        ) {
            if (
                maas.year < endYear || 
                (maas.year === endYear && maas.monthIndex <= endMonth)
            ) {
                adhikMaasCount++;
            }
        }
    }

    // Adjust raw days by adding 30 days for each Adhik Maas
    const adjustedDays = rawDays + (adhikMaasCount * 30);

    return adjustedDays;
}

// Hybrid interest calculation (simple for <1 year, compound for ≥1 year)
function calculateInterest() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const startYear = parseInt(document.getElementById('startYear').value) + 2000;
    const startMonth = parseInt(document.getElementById('startMonth').value);
    const startPaksha = parseInt(document.getElementById('startPaksha').value);
    const startTithi = parseInt(document.getElementById('startTithi').value);
    const endYear = parseInt(document.getElementById('endYear').value) + 2000;
    const endMonth = parseInt(document.getElementById('endMonth').value);
    const endPaksha = parseInt(document.getElementById('endPaksha').value);
    const endTithi = parseInt(document.getElementById('endTithi').value);
    const frequency = parseInt(document.getElementById('frequency').value);

    // Validate inputs
    if (isNaN(principal) || isNaN(rate) || principal <= 0 || rate <= 0) {
        alert("Please enter valid principal and interest rate.");
        return;
    }

    // Calculate adjusted days with Adhik Maas
    const days = getDaysBetweenDates(startYear, startMonth, startPaksha, startTithi, endYear, endMonth, endPaksha, endTithi);
    if (days < 0) {
        alert("Ending date must be after the starting date.");
        return;
    }

    const years = days / 365.25;
    let result;

    if (years < 1) {
        // Simple interest for <1 year
        const interest = (principal * rate * years) / 100;
        result = `
            <h3>Simple Interest: ₹${interest.toFixed(2)}</h3>
            <p>Principal: ₹${principal.toFixed(2)}</p>
            <p>Time Period: ${days} days (≈${years.toFixed(2)} years)</p>
        `;
    } else {
        // Compound interest for ≥1 year
        const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * years);
        const interestEarned = amount - principal;
        result = `
            <h3>Compound Interest: ₹${interestEarned.toFixed(2)}</h3>
            <p>Total Amount: ₹${amount.toFixed(2)}</p>
            <p>Time Period: ${days} days (≈${years.toFixed(2)} years)</p>
        `;
        updateChart(principal, rate, days, frequency);
    }

    document.getElementById('result').innerHTML = result;
}

// Chart visualization
let chart;
function updateChart(P, r, days, n) {
    const ctx = document.getElementById('chart').getContext('2d');
    if (chart) chart.destroy();

    const labels = Array.from({ length: Math.ceil(days) }, (_, i) => i + 1);
    const data = labels.map(t => {
        const years = t / 365.25;
        return P * Math.pow(1 + (r / 100) / n, n * years);
    });

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Amount (₹)',
                data,
                borderColor: '#d97706',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Days' }},
                y: { title: { display: true, text: 'Amount (₹)' }}
            }
        }
    });
}