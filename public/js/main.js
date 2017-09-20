'use strict';

$(document).ready(function () {
  // Плавный скролл
  $("html").easeScroll();

  // мобильное меню
  $('.mobile-menu-toggle').on('click', function () {
    $(this).toggleClass('mobile-menu-toggle--active');
    $('.mobile-menu').stop().slideToggle();
  });

  // Просмотр картинок
  $('.open-image').magnificPopup({
    type: 'image'
  });

  // $('.sideblock').stick_in_parent();

  // SVG magic
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  // Аккордион
  $('.accordion__btn').on('click', function () {
    $(this).closest('.accordion').find('.accordion__content').slideToggle();
    if ($(this).find('.show-more__text').text() === 'Показать еще') {
      $(this).find('.show-more__text').text('Скрыть');
      $(this).find('.plus').hide();
      $(this).find('.minus').show();
    } else {
      $(this).find('.show-more__text').text('Показать еще');
      $(this).find('.plus').show();
      $(this).find('.minus').hide();
    }
  });

  // Модальное окно
  $('.modal-open').magnificPopup({
    type: 'inline'
  });

  // Image gallery
  $('.documents').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // Телефон маска
  if ($('.phone-mask').length) {
    $('.phone-mask').inputmask({
      mask: "+7 (999) 999 99 99",
      showMaskOnHover: false
    });
  }

  // Заголовок на внутряках
  if ($('.inner-wall__title').text().length > 80) {
    $('.inner-wall__title').addClass('inner-wall__title--small');
  }

  // faq
  $('.faq').on('click', function () {
    $(this).toggleClass('faq--active');
    $(this).find('.faq__text').slideToggle();
  });
});