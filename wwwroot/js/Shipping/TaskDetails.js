// Initialize AOS
AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-in-out',
});

// Add comment functionality
function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (!commentText) {
        alert('يرجى كتابة التعليق أولاً');
        return;
    }
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">محمد العلي (الشحن)</span>
            <span class="comment-date">الآن</span>
        </div>
        <div class="comment-text">${commentText}</div>
    `;
    const commentsSection = document.querySelector('.comments-section');
    const addCommentDiv = commentsSection.querySelector('.mt-6');
    commentsSection.insertBefore(commentItem, addCommentDiv);
    document.getElementById('newComment').value = '';
    alert('تم إرسال التعليق بنجاح! سيصل إشعار لقسم الاستيراد.');
}
// Update status
function updateStatus() {
    const status = document.getElementById('shippingStatus').value;
    let statusText = '';
    switch(status) {
        case 'coordinating': statusText = 'جاري التنسيق'; break;
        case 'contacting_warehouse': statusText = 'التواصل مع المخازن'; break;
        case 'waiting_confirmation': statusText = 'بانتظار تأكيد الحجز'; break;
        case 'booked': statusText = 'تم الحجز'; break;
        case 'in_transit': statusText = 'قيد النقل'; break;
        case 'delivered': statusText = 'تم التسليم'; break;
    }
    alert(`تم تحديث حالة الشحن إلى: ${statusText}`);
}
// Open final report modal
function openFinalReportModal() {
    document.getElementById('finalReportModal').classList.add('show');
}
// Close modal
function closeModal() {
    document.getElementById('finalReportModal').classList.remove('show');
}
// Handle report file upload
function handleReportUpload(input) {
    const file = input.files[0];
    if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        document.getElementById('reportFileName').textContent = `${fileName} (${fileSize} MB)`;
        document.getElementById('uploadedReport').style.display = 'block';
    }
}
function removeReportFile() {
    document.getElementById('reportFileInput').value = '';
    document.getElementById('uploadedReport').style.display = 'none';
}
// Complete shipping task
function completeShippingTask() {
    const reportFile = document.getElementById('reportFileInput').files[0];
    // Validation
    if (!reportFile) {
        alert('يرجى رفع ملف التقرير');
        return;
    }
    // Simulate completion process
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري الإرسال...';
    btn.disabled = true;
    setTimeout(() => {
        closeModal();
        alert('تم إكمال مهمة الشحن بنجاح! تم إرسال إشعار للمحاسب بأن تكاليف الشحن أصبحت نهائية ومتاحة.');
        window.location.href = '/Shipping/Dashboard';
    }, 2000);
}
// Sidebar toggle functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    const toggleIcon = toggleButton.querySelector('i');
    sidebar.classList.toggle('hidden');
    if (sidebar.classList.contains('hidden')) {
        mainContent.classList.remove('mr-64');
        mainContent.classList.add('mr-0');
        toggleIcon.className = 'fas fa-bars';
    } else {
        mainContent.classList.remove('mr-0');
        mainContent.classList.add('mr-64');
        toggleIcon.className = 'fas fa-times';
    }
}
// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Shipping Task Details page loaded successfully');
    // Auto-save comments
    const commentTextarea = document.getElementById('newComment');
    if(commentTextarea) {
        commentTextarea.addEventListener('input', function() {
            localStorage.setItem('shippingComment_ORD-2025-005', this.value);
        });
        // Load saved comment
        const savedComment = localStorage.getItem('shippingComment_ORD-2025-005');
        if (savedComment) {
            commentTextarea.value = savedComment;
        }
    }
});

