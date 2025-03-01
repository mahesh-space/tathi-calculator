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