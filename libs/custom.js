// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// isotope js
$(window).on("load", function () {
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    var data = $(this).attr("data-filter");
    $grid.isotope({
      filter: data,
    });
  });

  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });
});

// nice select
$(document).ready(function () {
  $("select").niceSelect();
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1000: {
      items: 2,
    },
  },
});

// Filter + Slider Logic
$(document).ready(function () {
  const $slider = $(".slider-product");
  const $allItems = $(".slider-product > div").clone(); // ← lấy tất cả item gốc

  function initOwlSlider() {
    $slider.owlCarousel({
      loop: true,
      margin: 20,
      dots: false,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1000: { items: 3 },
      },
    });
  }

  // Khởi tạo lần đầu
  initOwlSlider();

  // Filter khi bấm menu
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    const filterValue = $(this).attr("data-filter");

    $slider.trigger("destroy.owl.carousel");
    $slider.html(""); // clear cũ

    let filteredItems =
      filterValue === "*" ? $allItems : $allItems.filter(filterValue);

    $slider.append(filteredItems.clone());
    initOwlSlider();
  });

  $(".filters_menu_home li").click(function () {
    $(".filters_menu_home li").removeClass("active");
    $(this).addClass("active");

    const filterValue = $(this).attr("data-filter");

    $slider.trigger("destroy.owl.carousel");
    $slider.html(""); // clear cũ

    let filteredItems =
      filterValue === "*" ? $allItems : $allItems.filter(filterValue);

    $slider.append(filteredItems.clone());
    initOwlSlider();
  });
});

// Thời gian chờ trước khi đóng (để người dùng lướt vào menu con)
const HOVER_CLOSE_DELAY = 150;
let dropdownTimer;

// Selector tới mọi dropdown trong navbar (đổi .navbar bạn đang dùng nếu khác)
const $dropdowns = $(".navbar .dropdown");

$dropdowns.on("mouseenter", function () {
  clearTimeout(dropdownTimer);

  // Đóng tất cả dropdown khác trước khi mở cái mới
  $dropdowns
    .not(this)
    .removeClass("show")
    .find(".dropdown-menu")
    .removeClass("show");

  // Mở dropdown hiện tại
  $(this).addClass("show").find(".dropdown-menu").addClass("show");
});

$dropdowns.on("mouseleave", function () {
  const $current = $(this);
  dropdownTimer = setTimeout(() => {
    $current.removeClass("show").find(".dropdown-menu").removeClass("show");
  }, HOVER_CLOSE_DELAY);
});

// Giữ nguyên khả năng click vào tiêu đề dropdown để chuyển trang
$(".navbar .dropdown > a.dropdown-toggle").on("click", function () {
  const href = $(this).attr("href");
  if (href && href !== "#") {
    window.location.href = href; // chuyển trang
  }
});

$(document).ready(function () {
  function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("filter"); // trả về 'dien', 'nuoc'...
  }

  const filterFromURL = getFilterFromURL();
  if (filterFromURL) {
    const selector = filterFromURL === "all" ? "*" : "." + filterFromURL;

    // Bỏ active cũ + thêm active mới trong menu filter bên trái
    $(".filters_menu li").removeClass("active");
    $(`.filters_menu li[data-filter="${selector}"]`).addClass("active");

    // Lọc isotope
    $(".grid").isotope({ filter: selector });
  }
});

function toggleToc() {
  const tocContent = document.getElementById("toc-content");
  const arrowIcon = document.getElementById("arrow").querySelector("i");

  // Toggle class "d-none" để ẩn/hiện nội dung
  tocContent.classList.toggle("d-none");

  // Đổi icon mũi tên
  if (tocContent.classList.contains("d-none")) {
    arrowIcon.classList.remove("fa-angle-up");
    arrowIcon.classList.add("fa-angle-down");
  } else {
    arrowIcon.classList.remove("fa-angle-down");
    arrowIcon.classList.add("fa-angle-up");
  }
}

$(document).ready(function () {
  $(".slider-service, .slider-project").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  });
});
