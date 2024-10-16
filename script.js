document.addEventListener("DOMContentLoaded", () => {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    // Set default dates to current date
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    endDateInput.value = today;

    // Open calendar when the input is clicked
    startDateInput.addEventListener("focus", () => startDateInput.showPicker());
    endDateInput.addEventListener("focus", () => endDateInput.showPicker());
});

let isPriceEditable = false;

function togglePriceEdit() {
    const priceInput = document.getElementById("price");
    const editButton = document.getElementById("editPriceBtn");

    isPriceEditable = !isPriceEditable;
    priceInput.disabled = !isPriceEditable;

    // Change button text and class based on the edit state
    if (isPriceEditable) {
        editButton.innerText = "ફેરફારો સાચવો";
        editButton.classList.add("save-price-btn");
        editButton.classList.remove("edit-price-btn");
    } else {
        editButton.innerText = "કિંમત બદલો";
        editButton.classList.add("edit-price-btn");
        editButton.classList.remove("save-price-btn");
    }
}

function calculateTotal() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    const dailyLiters = parseFloat(document.getElementById("dailyLiters").value);
    const pricePerLiter = parseFloat(document.getElementById("price").value);

    if (!startDate || !endDate || isNaN(dailyLiters)) {
        document.getElementById("result").innerText = "કૃપા કરીને તમામ ફીલ્ડ ભરો.";
        return;
    }

    if (startDate > endDate) {
        document.getElementById("result").innerText = "છેલ્લી તારીખ શરૂઆતની તારીખ પછીની જ હોવી જોઈએ.";
        return;
    }

    const daysCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const totalCost = daysCount * dailyLiters * pricePerLiter;

    document.getElementById("result").innerText = `કુલ કિંમત: ₹${totalCost.toFixed(2)} (${daysCount} દિવસ માટે)`;
}
