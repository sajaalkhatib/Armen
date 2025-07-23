// بيانات الأخبار (ستأتي من قاعدة البيانات في التطبيق الحقيقي)
    const newsData = {
        1: {
        id: 1,
    title: "إطلاق خدمة الشحن الجوي السريع إلى الصين",
    date: "2023-05-15",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "نفخر بالإعلان عن إطلاق خدمة الشحن الجوي السريع مباشرة إلى جميع المدن الصينية الرئيسية بأسعار تنافسية مع وقت توصيل لا يتجاوز 72 ساعة. هذه الخدمة الجديدة تأتي استجابة لاحتياجات عملائنا الكرام الذين يبحثون عن حلول سريعة وآمنة لنقل بضائعهم.",
    status: "published",
    category: "services",
    featured: true
      },
    2: {
        id: 2,
    title: "تخفيضات كبيرة على رسوم التخليص الجمركي",
    date: "2023-05-08",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "بمناسبة الذكرى السنوية لتأسيس الشركة، نقدم تخفيضات تصل إلى 30% على خدمات التخليص الجمركي لجميع العملاء. هذه العروض سارية طوال شهر مايو 2023 ولجميع أنواع البضائع المستوردة أو المصدرة عبر موانئنا المختلفة.",
    status: "published",
    category: "offers",
    featured: true
      },
    3: {
        id: 3,
    title: "افتتاح فرع جديد في مدينة دبي",
    date: "2023-05-01",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    content: "يسرنا الإعلان عن افتتاح فرعنا الجديد في دبي لخدمة عملائنا في الإمارات ودول الخليج العربي. الفرع الجديد يقدم جميع خدمات الاستيراد والتصدير والشحن الجوي والبحري مع فريق محترف من الخبراء في مجال التجارة الدولية.",
    status: "published",
    category: "branches",
    featured: true
      }
    };

    // معاينة الصورة عند تغيير الرابط
    $('#newsImageUrl').on('input', function() {
      const url = $(this).val();
    if (url) {
        $('#imagePreview').attr('src', url).show();
      } else {
        $('#imagePreview').hide();
      }
    });

    // فتح Modal لإضافة خبر جديد
    $('[data-bs-target="#addNewsModal"], [data-bs-target="#newsModal"]').click(function() {
        $('#newsModalLabel').text('إضافة خبر جديد');
    $('#newsForm')[0].reset();
    $('#imagePreview').hide();
    $('#deleteNewsBtn').hide();
    $('#newsModal').modal('show');
    });

    $(document).ready(function () {
    // تفعيل زر إضافة خبر جديد
    $('[data-bs-target="#addNewsModal"]').off('click').on('click', function () {
        $('#newsModalLabel').text('إضافة خبر جديد');
        $('#newsForm')[0].reset();
        $('#imagePreview').hide();
        $('#deleteNewsBtn').hide();
        $('#newsId').val('');
        $('#newsModal').modal('show');
    });

    // تفعيل زر قراءة المزيد
    $(document).on('click', '.btn-outline-primary', function (e) {
        e.preventDefault();
        var card = $(this).closest('.news-card');
        var title = card.find('.card-title').text();
        var content = card.find('.card-text').text();
        alert('تفاصيل الخبر:\n' + title + '\n\n' + content);
    });

    // تفعيل زر تعديل
    $(document).on('click', '.btn-warning', function () {
        var card = $(this).closest('.news-card');
        var title = card.find('.card-title').text();
        var date = card.find('.news-date').text();
        var content = card.find('.card-text').text();
        var img = card.find('img').attr('src');
        $('#newsModalLabel').text('تعديل الخبر');
        $('#newsId').val(card.index() + 1);
        $('#newsTitle').val(title);
        $('#newsDate').val(''); // يمكن تحسينه لاحقاً
        $('#newsContent').val(content);
        $('#imagePreview').attr('src', img).show();
        $('#deleteNewsBtn').show();
        $('#newsModal').modal('show');
    });

    // تفعيل زر حذف
    $(document).on('click', '.btn-danger', function () {
        var card = $(this).closest('.news-card');
        if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
            card.parent().remove();
        }
    });

    // حفظ الخبر (إضافة/تعديل)
    $('#saveNewsBtn').off('click').on('click', function () {
        var form = document.getElementById('newsForm');
        if (form.checkValidity()) {
            var id = $('#newsId').val();
            var title = $('#newsTitle').val();
            var date = $('#newsDate').val();
            var content = $('#newsContent').val();
            var img = $('#imagePreview').attr('src') || '';
            if (!id) {
                // إضافة خبر جديد وهمي
                var html = `<div class='col-md-6 col-lg-4 mb-4'><div class='card news-card h-100'>
                    <img src='${img}' class='card-img-top' alt='صورة الخبر'>
                    <div class='card-body'>
                        <div class='d-flex justify-content-between align-items-center mb-2'>
                            <span class='news-date'><i class='far fa-calendar-alt me-1'></i> ${date}</span>
                            <div><span class='badge bg-success me-1'>منشور</span></div>
                        </div>
                        <h5 class='card-title'>${title}</h5>
                        <p class='card-text'>${content}</p>
                        <div class='d-flex justify-content-between align-items-center'>
                            <a href='#' class='btn btn-sm btn-outline-primary'>قراءة المزيد</a>
                            <div class='btn-group' role='group'>
                                <button class='btn btn-warning btn-xs me-1'>تعديل</button>
                                <button class='btn btn-danger btn-xs'>حذف</button>
                            </div>
                        </div>
                    </div>
                </div></div>`;
                $('.row.mb-4 .card-body .row').prepend(html);
            } else {
                // تعديل خبر موجود (تحديث مباشر)
                var card = $('.news-card').eq(id - 1);
                card.find('.card-title').text(title);
                card.find('.card-text').text(content);
                card.find('img').attr('src', img);
            }
            $('#newsModal').modal('hide');
        } else {
            form.classList.add('was-validated');
        }
    });

    // حذف الخبر
    $('#deleteNewsBtn').click(function() {
      const id = $('#newsId').val();
    deleteNews(id);
    });

    // تعيين تاريخ اليوم كتاريخ افتراضي
    const today = new Date().toISOString().split('T')[0];
    $('#newsDate').val(today);

    // إعداد بسيط للصفحة
    $(document).ready(function() {
        // تحسين تجربة النماذج
        $('.form-control, .form-select').on('focus', function () {
            $(this).css('border-color', 'var(--primary)');
        }).on('blur', function () {
            $(this).css('border-color', '#e9ecef');
        });
    });

    // إضافة CSS بسيط
    $('<style>')
        .prop('type', 'text/css')
        .html(`
        .btn:focus {
            outline: none;
        box-shadow: 0 0 0 3px rgba(2, 95, 112, 0.2);
        }
        .form-control:focus, .form-select:focus {
            box - shadow: 0 0 0 3px rgba(2, 95, 112, 0.1);
        }
        `)
        .appendTo('head');
