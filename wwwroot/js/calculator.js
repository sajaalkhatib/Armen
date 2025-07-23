document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shipping-form');
    const loader = document.getElementById('calculation-loader');
    const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));
    const shipmentDetails = document.getElementById('shipment-details');
    const totalCostSpan = document.getElementById('total-cost');

    const baseRate = 50; // Base rate per carton
    const weightMultiplier = 2; // Additional cost per kg

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Show loader
        loader.style.display = 'flex';

        // Get form values
        const shipment = {
            origin: document.getElementById('origin').value,
            destination: document.getElementById('destination').value,
            itemType: document.getElementById('item-type').value,
            length: parseFloat(document.getElementById('length').value),
            width: parseFloat(document.getElementById('width').value),
            height: parseFloat(document.getElementById('height').value),
            cartons: parseInt(document.getElementById('cartons').value),
            weight: parseFloat(document.getElementById('weight').value)
        };

        // Calculate cost based on cartons and weight
        shipment.estimatedCost = (baseRate * shipment.cartons) + (weightMultiplier * shipment.weight);

        // Simulate calculation delay
        setTimeout(() => {
            // Update shipment details
            updateShipmentDetails(shipment);

            // Update total cost
            totalCostSpan.textContent = `$${shipment.estimatedCost.toFixed(2)}`;

            // Hide loader and show modal
            loader.style.display = 'none';
            resultsModal.show();

            // Reset form
            form.reset();
        }, 1500);
    });

    function updateShipmentDetails(shipment) {
        shipmentDetails.innerHTML = `
            <div class="shipment-card">
                <div class="shipment-header">
                                    <h5 class="modal-title" id="resultsModalLabel">تفاصيل الشحنة</h5>

                </div>
                <div class="shipment-details">
                    <div class="detail-row">
                        <span class="detail-label">نوع البضاعة:</span>
                        <span class="detail-value">${shipment.itemType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">المسار:</span>
                        <span class="detail-value">${shipment.origin} → ${shipment.destination}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">الأبعاد:</span>
                        <span class="detail-value">${shipment.length} × ${shipment.width} × ${shipment.height} سم</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">عدد الكراتين:</span>
                        <span class="detail-value">${shipment.cartons}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">الوزن:</span>
                        <span class="detail-value">${shipment.weight} كجم</span>
                    </div>
                </div>
            </div>
        `;
    }
}); 