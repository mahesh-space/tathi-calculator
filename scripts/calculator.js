let chart;

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const tathis = parseInt(document.getElementById('tathis').value);
    const frequency = parseInt(document.getElementById('frequency').value);

    // Tathi to years conversion
    const daysPerTathi = 29.53 / 30; // ~0.9843 days per Tathi
    const years = (tathis * daysPerTathi) / 365.25;

    // Compound interest calculation
    const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * years);

    // Display result
    document.getElementById('result').innerHTML = `
        <h3>Total Amount: ₹${amount.toFixed(2)}</h3>
        <p>Principal: ₹${principal.toFixed(2)}</p>
        <p>Interest Earned: ₹${(amount - principal).toFixed(2)}</p>
    `;

    // Update chart
    updateChart(principal, rate, tathis, frequency);
}

function updateChart(P, r, T, n) {
    const ctx = document.getElementById('chart').getContext('2d');
    if (chart) chart.destroy();

    const labels = Array.from({length: T}, (_, i) => i + 1);
    const data = labels.map(t => {
        const years = (t * 0.9843) / 365.25;
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
                x: { title: { display: true, text: 'Tathis' }},
                y: { title: { display: true, text: 'Amount (₹)' }}
            }
        }
    });
}
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
function populateDropdown(id, options) {
    const select = document.getElementById(id);
    options.forEach((option, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.text = option;
        select.add(opt);
    });
}

// Populate starting and ending date dropdowns
populateDropdown('startMonth', months);
populateDropdown('endMonth', months);
populateDropdown('startPaksha', pakshas);
populateDropdown('endPaksha', pakshas);
populateDropdown('startTithi', tithis);
populateDropdown('endTithi', tithis);
function getDaysBetweenDates(startMonth, startPaksha, startTithi, endMonth, endPaksha, endTithi) {
    // Each month has 30 Tithis (15 for Krishna Paksha and 15 for Shukla Paksha)
    const tithisPerMonth = 30;
    const daysPerTithi = 29.53 / 30; // ~0.9843 days per Tithi

    // Calculate total Tithis for starting and ending dates
    const startTotalTithis = (startMonth * tithisPerMonth) + 
                             (startPaksha === 0 ? 0 : 15) + 
                             startTithi;
    const endTotalTithis = (endMonth * tithisPerMonth) + 
                           (endPaksha === 0 ? 0 : 15) + 
                           endTithi;

    // Calculate the difference in days
    return (endTotalTithis - startTotalTithis) * daysPerTithi;
}
function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const startMonth = parseInt(document.getElementById('startMonth').value);
    const startPaksha = parseInt(document.getElementById('startPaksha').value);
    const startTithi = parseInt(document.getElementById('startTithi').value);
    const endMonth = parseInt(document.getElementById('endMonth').value);
    const endPaksha = parseInt(document.getElementById('endPaksha').value);
    const endTithi = parseInt(document.getElementById('endTithi').value);
    const frequency = parseInt(document.getElementById('frequency').value);

    // Calculate time difference in days
    const days = getDaysBetweenDates(startMonth, startPaksha, startTithi, endMonth, endPaksha, endTithi);
    const years = days / 365.25;

    // Compound interest formula
    const amount = principal * Math.pow(1 + (rate / 100) / frequency, frequency * years);

    // Display result
    document.getElementById('result').innerHTML = `
        <h3>Total Amount: ₹${amount.toFixed(2)}</h3>
        <p>Principal: ₹${principal.toFixed(2)}</p>
        <p>Interest Earned: ₹${(amount - principal).toFixed(2)}</p>
    `;

    // Update chart
    updateChart(principal, rate, days, frequency);
}
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
