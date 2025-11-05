(function() {
  // Sticky Sub-Menu
  var $pwrStickySubMenu = $('#pwr-js-sticky-sub-menu');
  if ( $pwrStickySubMenu.length > 0 ) { 
    const stickyOffset = 10,
        $fixedHeader = $('#pwr-header-fixed'),
        $topHeader = $('#pwr-header-top'),
        isFixedHeader = $fixedHeader.length > 0,
        $pwrStickySubMenuPlaceholder = $('#pwr-js-sticky-sub-menu--placeholder'),
        $pwrStickySubMenuLinks = $('.pwr-sticky-sub-menu__link');
    var orgPos = $pwrStickySubMenu.position().top,
        fixedHeaderOuterHeight = 0,
        topHeaderOuterHeight = 0,
        $pwrStickySubMenuTargetList = $pwrStickySubMenuLinks.map(function() { var e = $($(this).attr("href")); if (e.length) return e });
    
    $('.pwr-sticky-sub-menu--match-height').matchHeight({byRow:false});
    
    $('.pwr-anchor').addClass('pwr-anchor--sticky-sub-menu');
    
    if ( isFixedHeader )
      fixedHeaderOuterHeight = $fixedHeader.outerHeight(); 
    if ( $topHeader.length > 0 )
        topHeaderOuterHeight = $topHeader.outerHeight(); 

    function scrollHandler() {
        var scrollPos = $window.scrollTop();
        if( scrollPos <= orgPos + topHeaderOuterHeight - stickyOffset - fixedHeaderOuterHeight && scrollPos >= -100 ) {
            $pwrStickySubMenu.css('top', 'auto');
            $pwrStickySubMenu.removeClass('scroll');
            $pwrStickySubMenuPlaceholder.removeClass('scroll');
            $pwrStickySubMenuLinks.removeClass("pwr-sticky-sub-menu__link--active");
        }
        else {
            $pwrStickySubMenu.css('top', 0);
            if ( isFixedHeader )
                $pwrStickySubMenu.css('top', fixedHeaderOuterHeight );
            $pwrStickySubMenu.addClass('scroll');
            $pwrStickySubMenuPlaceholder.addClass('scroll');
          
            var targetListScrolledPast = $pwrStickySubMenuTargetList.map(function() { if ($(this).offset().top < scrollPos + stickyOffset ) return this });
            var targetLast = targetListScrolledPast[targetListScrolledPast.length - 1]; 
            var targetLastId = targetLast && targetLast.length ? targetLast.attr('id') : "";
            $pwrStickySubMenuLinks.removeClass("pwr-sticky-sub-menu__link--active").filter("[href='#" + targetLastId + "']").addClass("pwr-sticky-sub-menu__link--active");
        }
    };
    $window.scroll(scrollHandler);
    scrollHandler();
    
    $('#pwr-js-sticky-sub-menu__btn').on('click',function () {
        if ( $pwrStickySubMenu.hasClass('pwr-sticky-sub-menu--mobile-open') ) {
            $pwrStickySubMenu.removeClass('pwr-sticky-sub-menu--mobile-open');
            $(this).removeClass('pwr-sticky-sub-menu__btn--open');
        }
        else {
            $pwrStickySubMenu.addClass('pwr-sticky-sub-menu--mobile-open');
            $(this).addClass('pwr-sticky-sub-menu__btn--open');
        }
    });
    
    // Sticky Sub-Menu - Progress Bar
    function progressBar() {
       var  progressBar = document.querySelector('#pwr-js-sticky-sub-menu__progress-bar'),
            max, value;
      
        max = document.body.offsetHeight - window.innerHeight;
        progressBar.setAttribute('max', max);
        value = window.scrollY || document.documentElement.scrollTop;
        progressBar.setAttribute('value', value);
      }

    if( $('#pwr-js-sticky-sub-menu__progress-bar').length > 0 ) {
        window.addEventListener('scroll', progressBar);
        window.addEventListener('resize', progressBar);
    }
  }
})();