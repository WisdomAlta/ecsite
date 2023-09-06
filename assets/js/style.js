$(document).ready(function () {
    // scrolling();
    let shrinkHeader = 40;
    $(window).scroll(() => {
        scrolling();
    });
    const scrolling = () => {
        let scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('header').addClass('scroll');
            $('body.show-global-menu .menu-component').addClass('scroll');
            $('header .header-nav__lists').addClass('scroll')
        }
        else {
            $('header').removeClass('scroll');
            $('body.show-global-menu .menu-component').removeClass('scroll');
            $('header .header-nav__lists').removeClass('scroll')
        }
    }
    const getCurrentScroll = () => {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
    $('#menuBar').click(function (e) {
        e.preventDefault();
        let openDisplay = $('#menuBar svg.open').css('display');
        let closeDisplay = $('#menuBar svg.close').css('display');
        if (openDisplay === "block") {

            $('#menuBar svg.open').css('display', 'none');
            $('#menuBar svg.close').css('display', 'block');
            $('body').addClass('show-global-menu');
            $(this).addClass('back-clr-grey');

        }
        if (closeDisplay === "block") {
            $('#menuBar svg.close').css('display', 'none');
            $('#menuBar svg.open').css('display', 'block');
            $('body').removeClass('show-global-menu');
            $(this).removeClass('back-clr-grey');
        }
        scrolling();
    });



    var galleryThumbs = new Swiper(".gallery-thumbs", {
        centeredSlides: true,
        centeredSlidesBounds: true,
        direction: "vertical",
        spaceBetween: 20,
        slidesPerView: 3,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
    });
    var galleryTop = new Swiper(".gallery-top", {


        autoplay: {
            delay: 8000,
        },
        direction: 'horizontal',
        effect: 'fade',
        loop: true,
        speed: 1000,
        keyboard: {
            enabled: true,
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });

    var prdThumbs = new Swiper(".prd-swiper-thumbs", {
        centeredSlides: true,
        centeredSlidesBounds: true,
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 5,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        // Add breakpoints for responsive behavior
        breakpoints: {
            0: {
                direction: "horizontal",
                slidesPerView: 5,
            },
            429: {
                direction: "horizontal",
                slidesPerView: 5,
            },
            769: {
                direction: "vertical",
                slidesPerView: 5,
            },
        }

    });
    var prdSwiper = new Swiper(".prd-swiper", {
        direction: 'horizontal',
        loop: true,
        thumbs: {
            swiper: prdThumbs
        }
    });

    var spSlider = new Swiper(".sp-slider", { // main visual sp 
        autoplay: {
            delay: 8000,
        },
        direction: 'horizontal',
        effect: 'fade',
        loop: true,
        speed: 1000,
    });
    galleryTop.on('slideChange', function () {
        $('swiper-slide').each(function () {
            var slideDesc = $(this).find('.swiper-desc');
            var aniClass = slideDesc.data('vov');
            slideDesc.removeClass(aniClass);
        })
        var activeSlide = galleryTop.slides[galleryTop.activeIndex];
        var activeText = $(activeSlide).find('.swiper-desc');
        var animationClass = activeText.data('vov');
        if (animationClass) {
            console.log(animationClass);
            activeText.toggleClass(animationClass);
        }
    });

    spSlider.on('slideChange', function () {
        $('sp-slider-wrapper swiper-slide').each(function () {
            var slideDesc = $(this).find('.swiper-desc');
            var aniClass = slideDesc.data('vov');
            slideDesc.removeClass(aniClass);
        })
        var activeSlide = spSlider.slides[spSlider.activeIndex];
        var activeText = $(activeSlide).find('.swiper-desc');
        var animationClass = activeText.data('vov');
        if (animationClass) {
            console.log(animationClass);
            activeText.toggleClass(animationClass);
        }
    });
    // begin number input prop
    (function () {
        window.inputNumber = function (el) {
            var min = el.attr('min') || false;
            var max = el.attr('max') || false;

            var els = {};

            els.dec = el.prev();
            els.inc = el.next();

            el.each(function () {
                init($(this));
            });

            function init(el) {
                els.dec.on('click', decrement);
                els.inc.on('click', increment);

                function decrement() {
                    var value = el.val();
                    value--;
                    if (!min || value >= min) {
                        el.val(value);
                    }
                }

                function increment() {
                    var value = el.val();
                    value++;
                    if (!max || value <= max) {
                        el.val(value);
                    }
                }
            }
        }
    })();

    inputNumber($('.input-number'));

    //   select option prop
    $('select').on('focus', function () {
        $(this).parent().addClass('focus');
    })
        .on('blur', function () {
            $(this).parent().removeClass('focus');
        })
        .on('change', function () {
            $(this).parent().removeClass('focus');
        });

    // tab prop
    //任意のタブにURLからリンクするための設定
    function GethashID(hashIDName) {
        if (hashIDName) {
            //タブ設定
            $('.tab__header li').find('a').each(function () { //タブ内のaタグ全てを取得
                var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得	
                if (idName == hashIDName) { //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
                    var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
                    $('.tab__header li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
                    $(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
                    //表示させるエリア設定
                    $(".tab__area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
                    $(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加	
                }
            });
        }
    }

    //タブをクリックしたら
    $('.tab__header a').on('click', function () {
        var idName = $(this).attr('href'); //タブ内のリンク名を取得	
        GethashID(idName);//設定したタブの読み込みと
        return false;//aタグを無効にする
    });


    // 上記の動きをページが読み込まれたらすぐに動かす
    $(window).on('load', function () {
        $('.tab__header li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
        $('.tab__area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
        var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
        GethashID(hashName);//設定したタブの読み込み
    });

    // attachment status modal prop

    $('#cartSide').on('click', function () {
        $(this).hide();
        $('#cartStatus').fadeIn();
    });
    $('#closeStatus').on('click', function () {
        $(this).closest('#cartStatus').fadeOut();
        $('#cartSide').fadeIn();
    });
    $('.attachment__status--item-header a.closeStatusItem ').on('click', function () {
        $(this).closest('.attachment__status--item').remove();
    })
    $('.accordion .accordion-body').hide();
    $('.accordion .accordion-header').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next('.accordion-body').slideUp(500);
        } else {
            $('.accordion .accordion-header').removeClass('active');
            $(this).addClass('active');
            $(this).closest('.accordion-lists .accordion-body').hide();
            $('.accordion .accordion-body').hide();
            $(this).next('.accordion-body').slideToggle(500);
        }

    });
    // $('.accordion .accordion-header.active').on('click', function () {
    //     $(this).toggleClass('active');
    // });

    // radio accordion prop
    $('.radio-accordion-header input[type = "radio"]').on('change', function () {
        if ($(this).is(":checked")) {
            $('.radio-accordion-body').hide();
            $(this).closest('.radio-accordion-header').next('.radio-accordion-body').slideToggle(500);
        }
    });

    $(".custom-button").click(function () {
        $(".real-file").click();
    });

    $(".real-file").change(function () {
        if ($(this).val()) {
            $(".custom-text").html($(this).val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
        } else {
            $(".custom-text").html("まだファイルが選択されていません。");
        };
        var fileSize = $(this)[0].files[0].size;
        var sizeInKB = fileSize / 1024;
        var sizeInMB = sizeInKB / 1024;
        if (sizeInMB < 1) {
            $(".file-size").text(sizeInKB.toFixed(2) + " KB");
        } else {
            $(".file-size").text(sizeInMB.toFixed(2) + " MB");
        }
    });
    $('.fileupload-wrapper #delFile').on('click', () => {

        if ($('.fileupload-wrapper .real-file').val()) {
            $('.fileupload-wrapper .real-file').val("");
            console.log("deleted");
            $(".custom-text").html("まだファイルが選択されていません。");
            $(".file-size").text("0B");
        }

    });

    let state = null;
    let options = { year: 'numeric', month: 'long' }; // 轉換月份為英文
    let $calendarDate = $("#calendar_date");
    let $calendarMonth = $("#calendar_month");
    let $calendarYear = $("#calendar_year");
    let $datepickerInput = $("#datepickerInput");

    // 初始化Calendar
    function init() {
        state = {
            current: new Date()
        };
        render();
    }

    function preMonth() {
        state.current.setMonth(state.current.getMonth() - 1);
        render();
    }

    function nextMonth() {
        state.current.setMonth(state.current.getMonth() + 1);
        render();
    }

    function preYear() {
        state.current.setYear(state.current.getFullYear() - 1);
        render();
    }

    function nextYear() {
        state.current.setYear(state.current.getFullYear() + 1);
        render();
    }

    function preYears() {
        state.current.setYear(state.current.getFullYear() - 10);
        render();
    }

    function nextYears() {
        state.current.setYear(state.current.getFullYear() + 10);
        render();
    }

    function showMonth() {
        $calendarMonth.addClass('calendar');
        $calendarDate.addClass('d-none');
    }

    function showYear() {
        $calendarYear.addClass('calendar');
        $calendarMonth.addClass('d-none');
    }

    function renderWeek() {
        let $week = $("#week");
        let calDaysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i <= 6; i++) {
            $week.append('<div class="day">' + calDaysLabels[i] + '</div>');
        }
    }

    function render() {
        let $head = $("#year-month");
        $head.text(new Intl.DateTimeFormat('en-US', options).format(state.current));
        let $list = $("#list");
        $list.empty();

        let firstDate = new Date(state.current.getFullYear(), state.current.getMonth(), 1);
        let date = new Date(firstDate.getFullYear(), firstDate.getMonth(), 1);
        date.setDate(date.getDate() - date.getDay());

        while (date < firstDate) {
            renderDate(date, $list);
            date.setDate(date.getDate() + 1);
        }

        while (date.getMonth() === state.current.getMonth()) {
            renderDate(date, $list);
            date.setDate(date.getDate() + 1);
        }

        while (date.getDay() > 0) {
            renderDate(date, $list);
            date.setDate(date.getDate() + 1);
        }

        let $year = $("#year");
        $year.text(state.current.getFullYear());
        let $monlist = $("#monlist");
        $monlist.empty();
        let mon = (state.current.getMonth() + 1);
        renderMonth(mon, $monlist);

        let $years = $("#years");
        let currentYear = state.current.getFullYear();
        let order = currentYear % 10;
        let recentYear = currentYear - (order + 1);
        $years.text(recentYear + " - " + (recentYear + 11));
        let $yearlist = $("yearlist");
        $yearlist.empty();
        renderYears($years, $yearlist);
    }

    function renderDate(date, $list) {
        let $cell = $('<button class="date"></button>');
        $cell.addClass(date.getMonth() === state.current.getMonth() ? "" : "fadeout");
        $cell.attr("value", (date.getFullYear() + '-' + formatMonthDay(date.getMonth() + 1) + '-' + formatMonthDay(date.getDate())));
        $cell.text(date.getDate());
        $cell.on("mousedown", function () {
            selectDate($(this));
        });
        $list.append($cell);
    }

    function renderMonth(mon, $monlist) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = 0; i <= 11; i++) {
            $monlist.append('<button class="mon" value="' + [i] + '">' + months[i] + '</button>');
        }
    }

    function renderYears($years, $yearlist) {
        let currentYear = state.current.getFullYear();
        let order = currentYear % 10;
        let recentYear = currentYear - (order + 1);

        for (let i = 0; i < 12; i++) {
            $yearlist.append('<button class="mon" value="' + (recentYear + i) + '">' + (recentYear + i) + '</button>');
        }
    }

    function showCalendar() {
        let today = new Date();
        let todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        $calendarDate.addClass('calendar');

        $(".date").each(function () {
            if ($datepickerInput.val() === $(this).val()) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
            if (todayDate === $(this).val()) {
                $(this).addClass("today");
            }
        });
    }

    function hideCalendar() {
        $calendarDate.addClass('d-none');
    }

    function toggleCalendar() {
        $calendarDate.toggleClass(function () {
            if ($(this).hasClass("d-none")) {
                showCalendar();
            } else {
                hideCalendar();
            }
        });
    }

    function selectDate($elem) {
        $datepickerInput.val($elem.val());
        $calendarDate.addClass('d-none');
    }

    function selectMonth($elem) {
        state.current.setMonth($elem.val());
        render();
        $calendarMonth.addClass('d-none');
        $calendarDate.addClass('calendar');
    }

    function selectYear($elem) {
        state.current.setYear($elem.val());
        render();
        $calendarYear.addClass('d-none');
        $calendarMonth.addClass('calendar');
    }

    function checkDate($elem) {
        let dateVal = $elem.val();
        let dateYear = dateVal.substr(0, 4);

        if (dateVal.length === 8) {
            let dateMonth = dateVal.substr(4, 2);
            let dateDay = dateVal.substr(6, 2);
            if (dateDay > 31) {
                clearInput();
            } else {
                dateVal = dateYear + "-" + dateMonth + "-" + dateDay;
                $elem.val(dateVal);
                renderCalendar();
            }
        } else if (dateVal.length === 7) {
            let dateMonth = dateVal.substr(4, 1);
            let dateDay = dateVal.substr(5, 2);
            if (dateDay > 31) {
                clearInput();
            } else {
                dateVal = dateYear + "-0" + dateMonth + "-" + dateDay;
                $elem.val(dateVal);
                renderCalendar();
            }
        }

        function clearInput() {
            $elem.focus();
            $elem.val('');
        }

        function renderCalendar() {
            let innerText = new Date($datepickerInput.val());
            state.current = innerText;
            hideCalendar();
            render();
        }

    }

    function formatMonthDay(number) {
        return ("0" + number).slice(-2);
    }

    renderWeek();
    init();

    $datepickerInput.focus(function () {
        showCalendar();
    });

    $(document).mousedown(function (e) {
        if ($calendarDate.hasClass("calendar") && !$calendarDate.has(e.target).length && !$datepickerInput.is(e.target)) {
            hideCalendar();
        }
    });

    $datepickerInput.on("input", function () {
        checkDate($(this));
    });


});