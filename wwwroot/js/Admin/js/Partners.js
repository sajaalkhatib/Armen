let companies = [
    {
        name: "شركة النقل السريع",
        description: "شركة متخصصة في النقل البري والشحن الداخلي بأسعار تنافسية",
        country: "فلسطين"
    },
    {
        name: "شركة الشحن البحري الصينية",
        description: "أكبر شركات الشحن البحري في الصين مع أسطول يضم أكثر من 100 سفينة",
        country: "الصين"
    },
    {
        name: "أرامكس",
        description: "شركة شحن دولية رائدة في منطقة الشرق الأوسط وشمال أفريقيا",
        country: "الإمارات"
    }
];

function renderCompanies() {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    companies.forEach((company, idx) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold">${company.name}</td>
            <td>${company.description}</td>
            <td>${company.country}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-idx="${idx}" data-bs-toggle="modal" data-bs-target="#editCompanyModal">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-idx="${idx}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // ربط أحداث التعديل
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = function () {
            const idx = this.getAttribute('data-idx');
            const company = companies[idx];
            document.getElementById('editCompanyName').value = company.name;
            document.getElementById('editCompanyDescription').value = company.description;
            document.getElementById('editCompanyCountry').value = company.country;
            document.getElementById('editCompanyForm').setAttribute('data-idx', idx);
        };
    });

    // ربط الحذف
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = function () {
            const idx = this.getAttribute('data-idx');
            if (confirm("هل أنت متأكد من حذف هذه الشركة؟")) {
                companies.splice(idx, 1);
                renderCompanies();
            }
        };
    });
}

function addCompany() {
    const name = document.getElementById('companyName').value.trim();
    const description = document.getElementById('companyDescription').value.trim();
    const country = document.getElementById('companyCountry').value.trim();

    if (!name) {
        alert("يرجى إدخال اسم الشركة");
        return;
    }

    companies.push({ name, description, country });
    renderCompanies();

    document.getElementById('addCompanyForm').reset();
    bootstrap.Modal.getInstance(document.getElementById('addCompanyModal')).hide();
}

function saveCompany() {
    const idx = document.getElementById('editCompanyForm').getAttribute('data-idx');
    if (idx === null) return;

    const name = document.getElementById('editCompanyName').value.trim();
    const description = document.getElementById('editCompanyDescription').value.trim();
    const country = document.getElementById('editCompanyCountry').value.trim();

    if (!name) {
        alert("يرجى إدخال اسم الشركة");
        return;
    }

    companies[idx] = { name, description, country };
    renderCompanies();

    bootstrap.Modal.getInstance(document.getElementById('editCompanyModal')).hide();
}

document.addEventListener('DOMContentLoaded', renderCompanies);
