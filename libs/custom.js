// ========== 1. Hiển thị năm hiện tại ==========
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}
getYear();

// ========== 2. Google Map ==========
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// ========== 3. Nice Select ==========
$(document).ready(function () {
  $("select").niceSelect();
});

// ========== 4. Owl Carousel: Client Section ==========
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

// ========== 5. Filter + Slider Product ==========
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

// ========== 6. Isotope Grid ==========
$(window).on("load", function () {
  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    percentPosition: false,
    masonry: {
      columnWidth: ".all",
    },
  });

  // Khi click filter
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");
    var data = $(this).attr("data-filter");
    $grid.isotope({ filter: data });
  });

  // Gọi layout sau khi ảnh load
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
});

// ========== 7. Isotope Filter từ URL ==========
$(document).ready(function () {
  // Khởi tạo Isotope
  var $grid = $(".grid").isotope({
    itemSelector: ".all",
    layoutMode: "fitRows",
  });

  // Gán sự kiện click cho bộ lọc menu
  $(".filters_menu li").click(function () {
    $(".filters_menu li").removeClass("active");
    $(this).addClass("active");

    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });

  // Lấy tham số ?filter=xxx từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get("filter") || "*";

  // Chuyển filterParam thành selector
  const filterSelector = filterParam === "all" ? "*" : "." + filterParam;

  // Kích hoạt filter ban đầu
  $(".filters_menu li").removeClass("active");
  $(`.filters_menu li[data-filter="${filterSelector}"]`).addClass("active");
  $grid.isotope({ filter: filterSelector });
});

// ========== 8. Navbar Dropdown Hover ==========
const HOVER_CLOSE_DELAY = 150;
let dropdownTimer;

// Selector tới mọi dropdown trong navbar
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

// Giữ khả năng click vào dropdown title để chuyển trang
$(".navbar .dropdown > a.dropdown-toggle").on("click", function () {
  const href = $(this).attr("href");
  if (href && href !== "#") {
    window.location.href = href;
  }
});

// ========== 9. Toggle TOC ==========
function toggleToc() {
  const toc = document.getElementById("toc-content");
  const arrow = document.getElementById("arrow");
  toc.style.display = toc.style.display === "none" ? "block" : "none";
  arrow.classList.toggle("rotate");
}
