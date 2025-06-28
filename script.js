let data = [];

fetch("data.csv")
  .then(response => response.text())
  .then(text => {
    // Use XLSX namespace here
    const workbook = XLSX.read(text, { type: "string" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(firstSheet);
    console.log("CSV data loaded:", data);
  });

function showTreatment() {
  if (data.length === 0) {
    document.getElementById("message").innerText = "Loading messages...";
    return;
  }

  // Pick a random row
  const row = data[Math.floor(Math.random() * data.length)];

  document.getElementById("message").innerHTML = `
    <p><strong>Compliment:</strong> ${row.Compliment}</p>
    <p><strong>Self-Care Tip:</strong> ${row.SelfCare}</p>
    <p><strong>Quote:</strong> ${row.Quote}</p>
  `;
}
