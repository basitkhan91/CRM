"use strict";
var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $MENU_TOGGLE = $('#menu_toggle'),
    $SIDEBAR_MENU = $('#sidebar-menu');
// Sidebar
$SIDEBAR_MENU.find('a').on('click', function (ev) {
    var $li = $(this).parent();
    if ($li.is('.active')) { } else {
        if (!$li.parent().is('.child_menu')) {
            $SIDEBAR_MENU.find('li').not('.active').find('ul').slideUp();
            $(this).find('ul').slideUp();
        } else {
            if ($BODY.is(".nav-sm")) {
                $SIDEBAR_MENU.find("li").removeClass("active active-sm");
                $SIDEBAR_MENU.find("li ul").slideUp();
            }
        }
        $li.addClass('highlight');
        $('ul:first', $li).slideDown(function () {
        });
    }
});
$MENU_TOGGLE.on('click', function () {
    if ($BODY.hasClass('nav-md')) {
        $SIDEBAR_MENU.find('li.active ul').hide();
        $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        $(".breadcrumb_content").attr('style', 'margin-left: 70px !important;');
    } else {
        $SIDEBAR_MENU.find('li.active-sm ul').show();
        $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        $(".breadcrumb_content").removeAttr('style');
    }

    $BODY.toggleClass('nav-md nav-sm');

});
function init_sidebar() {


    // check active menu
    $SIDEBAR_MENU.find('a').parent('li').removeClass('current-page');
    $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href == CURRENT_URL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
    }).parent().addClass('active');
    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel: {
                preventDefault: true
            }
        });
    }
};
// /Sidebar


