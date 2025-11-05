/*********************************************/
/* =^..^= =^..^= =^..^= =^..^= =^..^= =^..^= */
/*                                           */
/* Hubspot POWER THEME V1.1.4                */
/* by maka Ageny                             */
/*                                           */
/* JAVASCRIPT V1.2                           */
/*                                           */
/* =^..^= =^..^= =^..^= =^..^= =^..^= =^..^= */
/*********************************************/

/*****************************************************************************

    INDEX:

    1. Global variables                                      #gvars

    2. On Page Load                                          #load
        - Hack for image CTAs
        - IDs for headings
        - Content Split & Map Section heights
        - Text with TOC / Pillar page TOC

    3. On Document Ready                                     #ready
        - Header fixed
        - Header Full Width
        - Drop-Down level 3+ positioning
        - Mega-Menu prevent overlaps
        - Burger menu
        - Header search 
        - Footer Full - Menu same height
        - Blog overview - filter highlighting
        - Blog overview - Post item heights
        - Blog overview - Load more
        - Social Icon Float
        - Youtube videos
        - Lightbox
        - Gallery
        - Masonry boxes
        - Parallax
        - Progress bar
        - Scroll animation
        - Client logo slider
        - Testimonial slider
        - Image slider
        - Tabs
        - Accordion
        - Stats counter
        - Countdown
        - 3D effect
        - Search results
        - Search input
        - Typewriter
        - Animate on Scroll
    
    4. Third Party                                           #third
        - jquery-match-height
        - jquery.detectSwipe
        - Owl carousel
        - Featherlight
        - jquery.mb.YTPlayer
        - lazyload lazySizes
        - Animate on Scroll (AOS)

    5. Custom JS                                             #custom

*****************************************************************************/

/* ==========================================================================
   1. Global variables                                      #gvars
   ========================================================================== */

   var $window =   $(window),
   $document = $(document);

/* ==========================================================================
  2. On Page Load                                          #load
  ========================================================================== */

$window.on('load', function() {
 
   // Hack for image ctas
   $('.cta_button').each(function (){
       var $this = $(this);
       if ($this.find('img').length > 0 )
           $this.addClass('pwr-cta--hubspot-style').show();
   });

   // Give headings id's if they have none
   var content = document.querySelector($('.js-toc-content').length > 0 ? '.js-toc-content' : 'body'),
       headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6'),
       headingMap = {};

   Array.prototype.forEach.call(headings, function(heading) {
       var id = heading.id ? heading.id : heading.textContent.toLowerCase()
           .split(' ').join('-').replace(/[\!\@\#\$\%\^\&\*\(\)\:\?]/ig, '');
       headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
       if (headingMap[id]) {
           heading.id = id + '-' + headingMap[id]
       } else {
           heading.id = id
       }
   });

   // Content Split & Map Section Height
   function adjustContentSplitMediaHeight () {
       $('.pwr-sec-split').each(function () {
           var $this = $(this),
               $content = $this.find('.pwr-sec-split__content'),
               $mediaImg = $this.find('.pwr-sec-split__img'),
               $mediaVid = $this.find('.pwr-sec-split__video');

           if ( $mediaImg.length > 0 )
               $mediaImg.css('height', $content.outerHeight() + 'px');
           if ( $mediaVid.length > 0 )
               $mediaVid.css('height', $content.outerHeight() + 'px');
       });
       $('.pwr-sec-map').each(function () {
           var $this = $(this),
               $content = $this.find('.pwr-sec-map__content'),
               $boxContent = $this.find('.pwr-sec-map__box'),
               $map = $this.find('.pwr-sec-map__map');

           if ( $map.length > 0 ) {
               if ( $boxContent.length > 0 ) {
                   if ( !$map.data('custom-height') || $window.width() < 1200 )
                       $map.css('height', $boxContent.outerHeight() + .25 * $boxContent.outerHeight() + 'px');
               }
               else
                   $map.css('height', $content.outerHeight() + 'px');
           }
       }); 
   };
   adjustContentSplitMediaHeight();
   $window.on('resize',adjustContentSplitMediaHeight);

   // Text with Table of Contents (TOC) or Pillar Page TOC
   var isPillar = $('.pwr-pillar-toc').length > 0;
   if ($('.pwr-sec-txt-toc').length > 0 || isPillar ) {

       if (isPillar) {
           $('body').addClass('pwr-toc__container');
           $('.body-container-wrapper').addClass('pwr-toc__content');
           if ($('.pwr-pillar-toc--narrow-content').length > 0) {
               $('.body-container-wrapper').addClass('pwr-toc__content--narrow-content');
                if ( $('.pwr-js-masonry__container').length > 0 )
                   $('.pwr-js-masonry__container').isotope();
                window.dispatchEvent(new Event('resize'));
           }
       }

       var $w = $window,
           $container = $(".pwr-toc__container"),
           $fixedHeader = $('#pwr-header-fixed'),
           $toc = $(".pwr-toc-menu"),
           offsetScrollUpdateAndPos = 40,
           offsetAnchorJump = 50,
           fixedHeaderHeight = 0,
           startPos = $container.offset().top,
           fadeOutStart = startPos + $container.outerHeight() * .98;

       if ($fixedHeader.length > 0) {
           fixedHeaderHeight = $fixedHeader.height();
           $container.addClass('pwr-toc__container--fixed-header');
           offsetAnchorJump = 140;
       }

       var clicked = false,
           confCollapseDepth = $toc.find('.pwr-toc-menu__toc-list').data('collapse'),
           options = {
           tocSelector: '.js-toc',
           contentSelector: isPillar ? 'body' : '.js-toc-content',
           headingSelector: 'h1, h2, h3, h4, h5, h6',
           headingsOffset: -1 * (startPos - fixedHeaderHeight - offsetScrollUpdateAndPos),
           orderedList: false,
           scrollSmoothDuration: 600,
           collapseDepth: confCollapseDepth,
           ignoreSelector: '.pwr--toc-ignore',
           hasInnerContainers: isPillar ? true : false,
           onClick: function () {
               clicked = true;
           },
           scrollEndCallback: function () {
               if (clicked) {
                   $('.pwr-toc-menu--overlay').toggleClass('pwr-toc-menu--minimized');
               } 
               clicked = false;
           }
       };
       tocbot.init(options);

       function tocFloatScrollHandler() {
           var startPos = $container.offset().top,
               scrollPos = $w.scrollTop();

           if( !$toc.hasClass('pwr-toc-menu--overlay') ) {
               if (scrollPos + offsetScrollUpdateAndPos + fixedHeaderHeight - offsetAnchorJump >= startPos)
                   $toc.css('top', (scrollPos - startPos + fixedHeaderHeight + offsetScrollUpdateAndPos) + 'px');
               else
                   $toc.css('top', offsetAnchorJump + 'px');

               if (scrollPos + $toc.height() >= fadeOutStart && $toc.data('fadeout') == true ) {
                   $toc.fadeOut(600);
               } else {
                   $toc.fadeIn(600);
               }
           }
           else {
               var offsetTop50 = $w.height() / 2;
               if (scrollPos + offsetTop50 >= fadeOutStart || scrollPos + offsetTop50 < startPos) {
                   $toc.fadeOut(600);
               } else if (scrollPos + offsetTop50 - $toc.height() >= startPos ) {
                   $toc.fadeIn(600);
               }
           }
       };

       function forceOvelayOnMobile () {
           startPos = $container.offset().top,
           fadeOutStart = startPos + $container.outerHeight() * .96;
           tocbot.options.fixedSidebarOffset = -1 * (startPos - fixedHeaderHeight - offsetScrollUpdateAndPos);

           if ($w.width() < 992 && !$toc.hasClass('pwr-toc-menu--overlay')) {
               $toc.addClass('pwr-toc-menu--overlay pwr-toc-menu--minimized');
               tocbot.options.collapseDepth = 6;
           }
           else if ($w.width() >= 992 && $toc.hasClass('pwr-toc-menu--indent') && $toc.hasClass('pwr-toc-menu--overlay')) {
               $toc.removeClass('pwr-toc-menu--overlay pwr-toc-menu--minimized');
               tocbot.options.collapseDepth = confCollapseDepth;
           }
           tocbot.refresh();
           tocFloatScrollHandler();
       };

       if( !isPillar ) {
           forceOvelayOnMobile();
           $w.on('resize',forceOvelayOnMobile);
           tocFloatScrollHandler();
           $w.on('scroll',tocFloatScrollHandler);
       }
       else
           $toc.fadeIn(600);

       $('.pwr-toc-menu__header-link').on('click', function (e) {
           e.preventDefault();
           $('.pwr-toc-menu--overlay').toggleClass('pwr-toc-menu--minimized');
       });
   }

   $window.trigger('scroll');
   window.dispatchEvent(new Event('resize'));

});


/* ==========================================================================
  3. On Document Ready                                     #ready
  ========================================================================== */

$(function() {
 
   // Header fixed
   var $fixedHeader = $('#pwr-header-fixed'),
       $absHeader = $('.pwr-header-abs'),
       $fixedHeaderSpacer = $('#pwr-header-fixed__spacer'),
       $transparentHeader = $('.pwr-header--transparent'),
       $transparentTopHeader = $('.pwr-header-top--transparent');

   if( $transparentHeader.length || $transparentTopHeader.length ) {
       $fixedHeaderSpacer.css('display', 'none'); 

       if( $transparentHeader.length && !$transparentTopHeader.length ) {
           $('.pwr-hero').addClass('pwr-hero--transparent-header');
           $('.pwr-post-featured').addClass('pwr-post-featured--transparent-header'); 
           $('.pwr-sec--first-with-header').addClass('pwr-sec--first-with-transparent-header');
       } 
       else {
           $('.pwr-hero').addClass('pwr-hero--transparent-header-full');
           $('.pwr-post-featured').addClass('pwr-post-featured--transparent-header-full');
           $('.pwr-sec--first-with-header').addClass('pwr-sec--first-with-transparent-header-full');
       }  
   }
   else  
       $fixedHeaderSpacer.css('height', $fixedHeader.outerHeight());

   var $topHeader = $('#pwr-header-top'), 
       topHeaderHeight = 0;

   if( $topHeader.length > 0 ) { 
       topHeaderHeight = $topHeader.outerHeight();
   }

   function scrollHandler() {
       var scrollPos = $window.scrollTop();
       if( scrollPos <= topHeaderHeight && scrollPos >= 0 ) {
           $fixedHeader.css('top', topHeaderHeight - scrollPos);
           $fixedHeader.removeClass('scroll');
       }
       else { 
           $fixedHeader.css('top', 0);
           $fixedHeader.addClass('scroll');
       }
   };

   if( $absHeader.length > 0 )
       $absHeader.css('top', topHeaderHeight);             
   else if( $fixedHeader.length > 0 ) {
       $fixedHeader.css('top', topHeaderHeight); 
       $window.on('scroll',scrollHandler);
       scrollHandler();
     
       $('.pwr-anchor').addClass('pwr-anchor--fixed-header');
   }
 
   // Header Full Width
   function headerFWSetMenuWidth () {
       var $menuList = $('.pwr-header .pwr--full-width .hs-menu-wrapper > ul');
       if ( $menuList.length > 0 ) {
           $menuList.css('width', '');
           var widthSum = 5;
           $menuList.children().each(function () {
               widthSum += $(this).outerWidth();
           });
           $menuList.css('width', widthSum + 'px');
       }
   };
   headerFWSetMenuWidth();
   $window.on('resize',headerFWSetMenuWidth);
   
 
   // Drop-Down menu position - prevent level 3+ boxes being out of view (vertical)
   $('.pwr-header__menu--dropdown .hs-menu-depth-2').on('mouseenter', function () {
       var $submenu = $(this).find('.hs-menu-children-wrapper');
       if ( $submenu.length > 0 ) {
         $submenu.css('top', '');
         var endPos = $submenu.offset().top - $window.scrollTop() + $submenu.outerHeight();
         if ( endPos - $window.height() > 0 )
             $submenu.css('top', Math.round(-1 * (endPos - $window.height() + 28)) + 'px');
       }
   });

   // Mega-Menu prevent overlaps outside header range if possible
   $('.pwr-header__menu--mega-menu .hs-menu-depth-1.hs-item-has-children').on('mouseenter', function () {
       var $container = $(this).children('.hs-menu-children-wrapper'),
           $header = $('.pwr-header-full'),
           hWidth = $header.width(),
           hLeft = $header.offset().left,
           cWidth  = $container.width(),
           cTop = $container.offset().top,
           cLeft = $container.offset().left,
           compLeft = cLeft - hLeft,
           compRight = (hLeft + hWidth) - (cLeft + cWidth);;

       var compCen = cWidth - hWidth;
       compCen = compCen > 0 ? compCen/2 :  0;

       if( compLeft < 0 && compRight >= 0 )
           $container.offset({ top: cTop, left: cLeft - compLeft - compCen });
       else if( compRight < 0 && compLeft >= 0 )
           $container.offset({ top: cTop, left: cLeft + compRight + compCen });        
       else if( compRight < 0 && compLeft < 0 )
           $container.offset({ top: cTop, left: hLeft - compCen });
        
   });

   // Burger Menu
   $('.pwr-burger__menu li.hs-item-has-children.active-branch > .hs-menu-children-wrapper').show();
   $('.pwr-burger__menu li.hs-item-has-children').on('click', function (e) {
       if( $(e.target.parentElement).hasClass('hs-item-has-children') ) {
           $(this).children('.hs-menu-children-wrapper').slideToggle();
           return false;
       }
   });
   $('#pwr-js-burger__trigger-open').on('click', function (e) {
       e.preventDefault();
       $('#pwr-js-header-right-bar').slideUp(200);
       $('#pwr-js-burger__trigger-open').slideUp(200);
       $('#pwr-js-burger').addClass('pwr-burger--open');
   });
   $('#pwr-js-burger__trigger-close').on('click', function (e) {
        e.preventDefault();
       $('#pwr-js-header-right-bar').slideDown(200);
       $('#pwr-js-burger__trigger-open').slideDown(200);
       $('#pwr-js-burger').removeClass('pwr-burger--open');
   });
   $('#pwr-js-burger-search__trigger').on('click', function (e) {
       e.preventDefault();
       $('#pwr-js-burger-language__inner').slideUp(200);
       $('#pwr-js-burger-contact__inner').slideUp(200);
       $('#pwr-js-burger-search__inner').slideToggle(200);
       $('#pwr-js-burger-search__input').focus();
   });
   $('#pwr-js-burger-language__trigger').on('click', function (e) {
       e.preventDefault();
       $('#pwr-js-burger-search__inner').slideUp(200);
       $('#pwr-js-burger-contact__inner').slideUp(200);
       $('#pwr-js-burger-language__inner').slideToggle(200);
   });
   $('#pwr-js-burger-contact__trigger').on('click', function (e) {
       e.preventDefault();
       $('#pwr-js-burger-search__inner').slideUp(200);
       $('#pwr-js-burger-language__inner').slideUp(200);
       $('#pwr-js-burger-contact__inner').slideToggle(200);
   });

   // Header Search 
   $('#pwr-js-header-search__trigger').on('click', function (e) { 
       e.preventDefault();
       $('#pwr-js-header-search').addClass('active');
       $('#pwr-header-search__input').focus();
   });
   $('#pwr-js-header-search__close').on('click', function (e) {
       e.preventDefault();
       $('#pwr-js-header-search').removeClass('active');
   });
 
 $document.on('mouseup', function(e) {
     var $container = $('#pwr-js-header-search');
     if (!$container.is(e.target) && $container.has(e.target).length === 0) 
         $container.removeClass('active');
     $container = $('#pwr-js-burger');
     if (!$container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('pwr-burger--open') ) {
       $('#pwr-js-header-right-bar').slideDown(200);
       $('#pwr-js-burger__trigger-open').show(200);
       $container.removeClass('pwr-burger--open');
     }
     $container = $('.pwr-toc-menu--overlay');
     if (!$container.is(e.target) && $container.has(e.target).length === 0)
       $container.addClass('pwr-toc-menu--minimized');
 });
   $document.on('keyup',function(e) {
        var code;
        if (e.key !== undefined) {
            code = e.key;
        } else if (e.keyIdentifier !== undefined) {
            code = e.keyIdentifier;
        } else if (e.keyCode !== undefined) {
            code = e.keyCode;
        }
       if (code == 27) { //Esc {
          $('#pwr-js-header-search').removeClass('active');
          $('.pwr-toc-menu--overlay').addClass('pwr-toc-menu--minimized');
          var $burger = $('#pwr-js-burger');
          if( $burger.hasClass('pwr-burger--open') ) {
          $('#pwr-js-header-right-bar').slideDown(200);
          $('#pwr-js-burger__trigger-open').show(200);
              $burger.removeClass('pwr-burger--open');
          }
       }
   });

   // Footer Full - Menu same height
   $('.pwr-footer-full__menu .hs-menu-depth-1.hs-item-has-children').matchHeight();

   // Function for refreshing Animation on Scroll Positions
   function aosRefresh() {
        if (typeof AOS != "undefined") {
            AOS.refresh();
        }
    }

   // Blog overview - Highlight active filter
   $('.pwr-blog-filter__link:not(.pwr-filter__link--js)').each(function () {
       var $this = $(this);

       $this.removeClass('active');
       if( $this.attr('href') === '//' + window.location.host + window.location.pathname )
           $this.addClass('active');
   });

   // Blog overview: Post item heights
   function adjustPostItemHeight() {
       var $items = $('.pwr-post-item:not(.pwr-post-item--1col)'); 

       if( $items.length > 0 ) {
           var maxHeight = 0;
           $('.pwr-post-item__info-box').each(function () {
               var $this = $(this),
                   height = $this.outerHeight() + $this.position().top;
               if( height > maxHeight )
                   maxHeight = height;
           });
           $('.pwr-post-item').each(function () {
               $(this).css('height', maxHeight + 'px');
           });
           aosRefresh();
       }
   };
   adjustPostItemHeight();
   $window.on('resize',adjustPostItemHeight);

   // Blog overview: Load more blog posts
   var isFetching = false;

   $postsContainer = $("#pwr-blog-listing__posts");

   $('#pwr-btn-load-more').on('click', function(e){
       e.preventDefault()
       if( !isFetching ) {

           var $btnLoadMore = $(this);
           isFetching = true;
           $.get( $btnLoadMore.attr('href').split('?')[0], function(data) {
               var $page = $(data);
               var $posts = $page.find('.pwr-post-item');

               if( $posts.length > 0) {
                   $posts.each(function () {
                       var $this = $(this);
                       $postsContainer.append($this);
                       set3DHandlers($this);
                   });
                   adjustPostItemHeight();
               }
               var $btnLoadMoreNew = $page.find('#pwr-btn-load-more');

               if( $btnLoadMoreNew.length > 0 )
                   $btnLoadMore.attr('href', $btnLoadMoreNew.attr('href').split('?')[0]);
               else
                   $btnLoadMore.remove();

               setTimeout(function(){
                 isFetching = false;
               }, 100);

               aosRefresh();
           });
       }
   });

   // Blog: Social Icon Float
   if ($('.pwr-post-social--is-float').length > 0) {
       var $w = $window,
           $container = $(".pwr-post-body"),
           $fixedHeader = $('#pwr-header-fixed'),
           offset = 10,
           fixedHeaderHeight = 0,
           startPos = $container.offset().top,
           fadeOutStart = startPos + $container.outerHeight() * .96;
       if ($('.pwr-author-profile').length > 0)
           fadeOutStart = $('.pwr-author-profile').position().top;
       else if ($('.pwr-post-comments').length > 0)
           fadeOutStart = $('.pwr-post-comments').position().top;

       if ($fixedHeader.length > 0)
           fixedHeaderHeight = $fixedHeader.height();

       function socialFloatScrollHandler() { 
           var $target = $(".pwr-post-social--is-float").find(".at-share-btn-elements");
           if( $target.css('position') == 'absolute' ) {
               var scrollPos = $w.scrollTop();
               if (scrollPos + fixedHeaderHeight >= startPos)
                   $target.css('top', (scrollPos - startPos + fixedHeaderHeight + offset) + 'px');
               else
                   $target.css('top', offset + 'px');

               if (scrollPos + $target.height() >= fadeOutStart)
                   $target.fadeOut(600);
               else
                   $target.fadeIn(600);
           }
       };
       socialFloatScrollHandler();
       $w.on('scroll',socialFloatScrollHandler);
   }

   // Youtube Videos
   function ytplayer_update_pos() {
       var $player = $(this),
           $parent = $player.closest('.pwr-video-background');
       if ($parent.length > 0) {
         $player.css('padding-bottom', $parent.height() * 1.2 + 'px');
       }
   };
   function ytplayer_unique_ids () {
       var $this = $(this),
           $player = $this.find('.player'),
           id = Math.floor(Math.random() * 26) + Date.now();

       if( $player.length < 1 )
           $player = $('.pwr-lightbox__box').find('.player');

       $player.attr('id',id);
       var $vid = $('#'+id);
       if( $vid.data('property') ) {
           $this.css('opacity','0');
           $vid.on('YTPTime', ytplayer_update_pos);
           $vid.on('YTPStart', function () {
               ytplayer_update_pos();
               $this.css('opacity','1');
           });
           $vid.YTPlayer();
       }
       else // lightbox
           $vid.YTPlayer({videoURL:$vid.data('video')+'', containment:'self', autoPlay:true, mute:false, showControls: true, useOnMobile: true, ratio: 'auto', stopMovieOnBlur: false, playOnlyIfVisible: false, loop: false, optimizeDisplay: false});
   };  
   $('.pwr-video-background__youtube').each(ytplayer_unique_ids);

   // Lightbox
   $('.pwr-lightbox').featherlight({
       targetAttr:     'data-lightbox',
       variant:        'pwr-lightbox__box',
       openSpeed:      400,
       closeSpeed:     400,
       afterContent:   ytplayer_unique_ids,
       beforeClose: function () {
           var $player = $('.pwr-lightbox__box').find('.player');
           if( $player.length > 0 )
               $player.YTPPlayerDestroy();
       }
   });

   // Gallery
   $.featherlightGallery.prototype.afterContent = function() {
       var source = this.$currentTarget.find('.pwr-image-box__back');
           title = source.find('.pwr-image-box__title').text(),
           desc =  source.find('.pwr-image-box__desc').text();
           
       this.$instance.find('.pwr-featherlight-info').remove();
       if( title.length > 0 || desc.length > 0 ) {
           var $container = $('<div class="pwr-featherlight-info">');
           if( title.length >  0)
               $container.append($('<h4 class="pwr-featherlight-info__title">').text(title));
           if( desc.length > 0 )
               $container.append($('<span class="pwr-featherlight-info__desc">').text(desc));
           this.$instance.find('.featherlight-content').append($container);
       }
   };

   // Masonry boxes
   $('.pwr-js-masonry__container').each(function () {
       var $this = $(this),
           filter = '*';
       if ( $this.data('filter') && $this.data('filter') != 'all' )
           filter = '.' + $this.data('filter'); 
       var $grid = $this.isotope({
           itemSelector: '.pwr-js-masonry__item',
           layoutMode: $this.hasClass('pwr-js-masonry__container--fitRows') ? 'fitRows' : 'packery',
           packery: { 
             gutter: $this.hasClass('pwr-js-masonry__container--no-gutter') ? 0 : 20 
           },
           filter: filter
       });
       if ( $this.hasClass('pwr-js-masonry__container--sameHeight') ) {
           function onArrange() {
               $this.find('.pwr-image-box__below').matchHeight({byRow: false});
           }
           $grid.on( 'layoutComplete', onArrange );
           onArrange();
           $grid.isotope();
       }
   });
   $('.pwr-js-filter__link').on('click',function (e) {
       e.preventDefault();
       var $this = $(this),
           $parent = $this.closest('.pwr-js-masonry'),
           $grid = $parent.find('.pwr-js-masonry__container');

        if( $grid.length > 0 ) {
            $parent.find('.pwr-js-filter__link').removeClass('active');
            $this.addClass('active');
            var filterClass = $this.attr('href').substring(1);
            if( filterClass == 'all')
                filterClass = '*';
            else
                filterClass = '.' + filterClass;

            var $animatedItems = $grid.find('.aos-init');
            if ( $animatedItems.length > 0 ) {
                $animatedItems.each(function () {
                    var $this = $(this);
                    $this.removeClass('aos-init');
                    $this.removeAttr('data-aos');
                    $this.removeAttr('data-aos-delay'); 
                    $this.removeClass('aos-animate');
                });
                if (typeof AOS != "undefined") {
                    AOS.refreshHard();
                }
            }
            $grid.isotope({ filter: filterClass });
            $grid.on( 'arrangeComplete',aosRefresh);
        }
   });

   // Parallax
   var isMobileParallaxOff = $('.pwr--mobile-parallax-off').length > 0;
   $('.pwr-parallax').each(function() {

       var $parImg = $(this),
           $parImgContainer = $parImg.parent();

       function calcParallax() {
            if( !isMobileParallaxOff || (isMobileParallaxOff && $window.width() >= 576 ) ) {
                const SPEED = 1;
                var parImgContainerStart = $parImgContainer.offset().top,
                    windowHeight = $window.height(),
                    scrollPos = $window.scrollTop(),
                    parImgContainerHeight = $parImgContainer.innerHeight();
    
                var pos2Come = scrollPos + windowHeight;
                // On Screen?
                if (pos2Come > parImgContainerStart && scrollPos < parImgContainerStart + parImgContainerHeight) {
                    var posInBlock = ((pos2Come - parImgContainerStart) * SPEED);
                    var blockHeight = windowHeight + parImgContainerHeight;
                    var val2Set = ((posInBlock / blockHeight) * 100) + (50 - (SPEED * 50));
                }
                var scale2Set = 1,
                    diffHeight = $parImgContainer.outerHeight()*1.3 - $parImg.height();
                if( diffHeight  >=  0 )
                    scale2Set = 1 + diffHeight / $parImg.height();
                $parImg.css({
                    'top': val2Set + '%',
                    'transform': 'translate(-50%, -' + val2Set + '%) scale(' + scale2Set + ')',
                    '-webkit-transform': 'translate(-50%, -' + val2Set + '%) scale(' + scale2Set + ')'
                });
                $parImg.closest('.page-center').css('overflow','hidden');
            }
            else {
                $parImg.css({
                    'top': '0',
                    'transform': 'translate(-50%, 0)',
                    '-webkit-transform': 'translate(-50%, 0)'
                });
            }
       };
       $window.on('scroll',calcParallax);
       calcParallax();
       $parImg.on('lazyloaded',calcParallax);
   });

   // Progress Bar
   function progressBar() {
      var  winHeight = window.innerHeight,
           postHeight = document.querySelector('.pwr-post-content').offsetTop + document.querySelector('.pwr-post-content').offsetHeight,
           progressBar = document.querySelector('#pwr-progress-bar'),
           max, value;

       if ( document.querySelector('.pwr-post-comments') )
           postHeight -= document.querySelector('.pwr-post-comments').offsetHeight; 
       max = postHeight - winHeight;
       progressBar.setAttribute('max', max);
       value = window.scrollY || document.documentElement.scrollTop;
       progressBar.setAttribute('value', value);
     }

   if( $('#pwr-progress-bar').length > 0 ) {
       window.addEventListener('scroll', progressBar);
       window.addEventListener('resize', progressBar);
   }


   // Animate scroll for local links with targets
   $document.on('click', 'a[href^="#"]', function (event) {
       event.preventDefault();
       var $this = $(this),
           targetSel = $.attr(this, 'href'),
           $target = [],
           position = 0;
       if (targetSel != '#')
           $target = $(targetSel)
       if ($target.length > 0 && !$this.hasClass('toc-link'))
           position = $target.offset().top
       else if (!$this.hasClass('pwr-back-to-top'))
           return;
       $('html, body').animate({
           scrollTop: position
       }, 700);
   });

   // Client Logo Slider
   $('.pwr-sec-clients__slider').each(function () {
       var $this = $(this),
           $owl = $this.find('.owl-carousel');
       if ( $owl.length > 0 ) {
               $owl.owlCarousel({
                   autoHeight: false,
                   autoplay: $this.data('autoplay') ? true : false,
                   autoplayTimeout: $this.data('autoplay-timeout'),
                   dots: $this.data('nav-bullets') ? true : false,
                   loop:true,
                   smartSpeed: 400,
                   slideTransition: 'ease-in-out', 
                   nav: false,
                   responsive:{0:{items:1},576:{items:2},992:{items:3},1119:{items:$this.data('nr-elements')}},
                   onChanged: aosRefresh
               });
               if ($this.data('nav-arrows')) { 
                   $this.find('.pwr-owl-nav__prev').on('click',function() {
                       $owl.trigger('prev.owl.carousel');
                   });
                   $this.find('.pwr-owl-nav__next').on('click',function() {
                       $owl.trigger('next.owl.carousel');
                   });
               }
               else
                   $this.find('.pwr-owl-nav').addClass('pwr--disabled');
       }
   });

   // Testimonial Slider
   $('.pwr-sec-testimonials__slider').each(function() {
       var $this = $(this),
           $owl = $this.find('.owl-carousel');
       if ( $owl.length > 0 ) {
           $owl.owlCarousel({
               autoHeight: true,
               autoplay: $this.data('autoplay') ? true : false,
               autoplayTimeout: $this.data('autoplay-timeout'),
               dots: $this.data('nav-bullets') ? true : false,
               items: $this.data('multiple') ? 2 : 1,
               margin: 20,
               loop:true,
               smartSpeed: 400,
               stagePadding: $this.data('multiple') && $window.width() >= 840 ? 175 : 0,               
               slideTransition: 'ease-in-out', 
               nav: false,
               responsive: $this.data('multiple') ? {0:{items:1},1340:{items:2},1820:{items:3}} : {},
               onChanged: aosRefresh
           });
           if ($this.data('nav-arrows')) { 
               $this.find('.pwr-owl-nav__prev').on('click',function() {
                   $owl.trigger('prev.owl.carousel');
               });
               $this.find('.pwr-owl-nav__next').on('click',function() {
                   $owl.trigger('next.owl.carousel');
               });
           }
           else
               $this.find('.pwr-owl-nav').addClass('pwr--disabled');
       }
   });

   // Image Slider
   $('.pwr-sec-images__slider').each(function() {
       var $this = $(this),
           $owl = $this.find('.owl-carousel');
       if ( $owl.length > 0 ) {
           $owl.owlCarousel({
               autoplay: $this.data('autoplay') ? true : false,
               autoplayTimeout: $this.data('autoplay-timeout'),
               dots: $this.data('nav-bullets') ? true : false,
               items: $this.data('multiple') ? $this.data('nr-elements') : 1, 
               loop:true,
               smartSpeed: 400,
               slideTransition: 'ease-in-out', 
               margin: 20,
               nav: false,
               responsive: $this.data('multiple') ? {0:{items:1},768:{items:$this.data('nr-elements')}} : {},
               onChanged: aosRefresh
           });
           if ($this.data('nav-arrows')) {
               $this.find('.pwr-owl-nav__prev').on('click',function() {
                   $owl.trigger('prev.owl.carousel');
               });
               $this.find('.pwr-owl-nav__next').on('click',function() {
                   $owl.trigger('next.owl.carousel');
               });
           }
           else
               $this.find('.pwr-owl-nav').addClass('pwr--disabled');
       }
   });

   // Tabs
   $('.pwr-tabs').each(function () {
       var $tabContent = $(this).find('.pwr-tabs__content');
       $tabContent.hide();
       $tabContent.first().show();
   });

   $('.pwr-tabs__tab').on('click',function() {
       var $this = $(this),
           $parent = $this.closest('.pwr-tabs');

       $parent.find('.pwr-tabs__content').hide();
       var activeTabRef = $this.attr("rel"); 
       $parent.find("#"+activeTabRef).fadeIn();
       $parent.find('.pwr-tabs__tab').removeClass("pwr-tabs__tab--active"); 
       $this.addClass("pwr-tabs__tab--active"); 
       $parent.find('.pwr-tabs__dropdown select').val(activeTabRef);
       aosRefresh();
   });


   $(".pwr-tabs__dropdown select").change(function() {
       var $this = $(this),
           $parent = $this.closest('.pwr-tabs');

       $parent.find('.pwr-tabs__content').hide();
       var activeTabRef = $this.val(); 
       $parent.find("#"+activeTabRef).fadeIn();
       $parent.find('.pwr-tabs__tab').removeClass("pwr-tabs__tab--active"); 
       $parent.find(".pwr-tabs__tab[rel^='"+activeTabRef+"']").addClass("pwr-tabs__tab--active");
       aosRefresh();
   });

   // Accordion
   $('.pwr-accordion__title').on('click', function () {
       var $this = $(this),
           $parent = $this.closest('.pwr-accordion');
       const SPEED = 400;

       if ($parent.hasClass('active')) {
         $this
           .siblings('.pwr-accordion__desc')
           .slideUp(SPEED, function () {
               $parent.removeClass('active');
               $this.find('.pwr-accordion__icon').removeClass('active');
               aosRefresh();
           });
       } else {
         $parent.addClass('active');
         $this.find('.pwr-accordion__icon').addClass('active');
         $this
           .siblings('.pwr-accordion__desc')
           .slideDown(SPEED, function(){
               $(this).css('display', 'block');
               aosRefresh();
            }).css('display', 'block');
       }
   });

   // Stats Counter 
   if ( window.counterUp != undefined ) {
     var counterUp = window.counterUp["default"];
     var $counters = $(".pwr-stat__number");

     $counters.each(function (ignore, counter) {
       var waypoint = new Waypoint( {
         element: $(this),
         handler: function() { 
           counterUp(counter, {
             duration: 1500,
             delay: 19
           }); 
           this.destroy();
         },
         offset: 'bottom-in-view',
       } );
     });
   }

   // Countdown - Coming Soon
   function getTimeRemaining(endtime) {
       var splitT = endtime.split(/[^0-9]/);
       var dEndtime = new Date(splitT[0],splitT[1]-1,splitT[2],splitT[3],splitT[4],splitT[5]);        
       var t = dEndtime - Date.parse(new Date());
       var seconds = Math.floor((t / 1000) % 60);
       var minutes = Math.floor((t / 1000 / 60) % 60);
       var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
       var days = Math.floor(t / (1000 * 60 * 60 * 24));
       return {
           'total': t,
           'days': days,
           'hours': hours,
           'minutes': minutes,
           'seconds': seconds
       };
   }

   $('.pwr-countdown').each(function () {
       var $this = $(this),
           $days = $this.find('.pwr-countdown__number--days'),
           $hours = $this.find('.pwr-countdown__number--hours'),
           $minutes = $this.find('.pwr-countdown__number--mins'),
           $seconds = $this.find('.pwr-countdown__number--secs'),
           endtime = $this.data('release-date');
       
       function updateClock() {
           var t = getTimeRemaining(endtime);
           const DEFAULT = '00';
           
           if( $days.length )
               if( t.days > 99 )
                   $days.html(('0' + t.days).slice(-3)); 
               else if( t.days > 0 )
                   $days.html(('0' + t.days).slice(-2)); 
               else
                   $days.html(DEFAULT);
           if( $hours.length )
               if( t.hours > 0)
                   $hours.html(('0' + t.hours).slice(-2));
               else
                   $hours.html(DEFAULT);
           if( $minutes.length )
               if( t.minutes > 0 )
                   $minutes.html(('0' + t.minutes).slice(-2));
               else
                   $minutes.html(DEFAULT);
           if( $seconds.length )
               if( t.seconds > 0 )
                   $seconds.html(('0' + t.seconds).slice(-2));
               else
                   $seconds.html(DEFAULT);

           if (t.total <= 0) {
               clearInterval(timeinterval);
           }
       }

       updateClock();
       var timeinterval = setInterval(updateClock, 1000);
   });

   // 3D effect
   function calcDeg(x, maxIn, out) {
     return 2 * x * out / maxIn - out;
   };

   function onMouseMove3D (e, $el, factor) {
     var $this = $(e.currentTarget);
     var x = e.clientX - $this.offset().left + $window.scrollLeft(),
         y = e.clientY - $this.offset().top + $window.scrollTop(),
         rY = calcDeg(x, $this.width(), factor),
         rX = calcDeg(y, $this.height(), factor);
     $this.find($el).css({
       'transform': 'rotateY(' + rY + 'deg) rotateX(' + -rX + 'deg)',
       '-webkit-transform': 'rotateY(' + rY + 'deg) rotateX(' + -rX + 'deg)'
     }); 
   };

   function set3DHandlers ($item) {
       var $itemInner = $('.pwr-3D-box__sensor');

       $item.on('mouseenter', function() {
         var $this = $(this);
         $this.css('z-index','500');
         $this.parent().css('z-index','500');
         $this.find($itemInner).css({'transition': '.1s linear'});
       });

       $item.on('mousemove', function (e) {
           onMouseMove3D(e,$itemInner,6);
       });

       $item.on('mouseleave', function() {
         var $this = $(this);
         $this.css('z-index','1');
         $this.parent().css('z-index','1');
         $this.find($itemInner).css({
           'transition': '.2s linear',
           'transform': 'rotateY(0deg) rotateX(0deg)',
           '-webkit-transform': 'rotateY(0deg) rotateX(0deg)'
         });
       });
   }; 

   if( window.navigator.userAgent.indexOf('MSIE ') <= 0 && window.navigator.userAgent.indexOf('Trident/') <= 0 )
       set3DHandlers($('.pwr-3D-box'));

   // Search results
   if( $('.pwr-sec-search-results').length > 0 ) {
       var $kvTitle = $('.pwr-hero__title'),
           searchTerm = '';
       if( $kvTitle.length > 0 ) {
           var query = window.location.search.substring(1),
               vars = query.split("&");
           for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == 'term'){
                   searchTerm = decodeURI((pair[1] + '').replace(/\+/g, ' '));
                   break;
               }
           }
           var newTitle = $kvTitle.text().replace('{search_term}', searchTerm);
           $kvTitle.text(newTitle);
       }
   }

   // Typewriter
   if (typeof typewriterJSON != "undefined"){
        var typewriterLength = Object.keys(typewriterJSON).length;
        if (typewriterLength > 0 ){
            var app = document.getElementById('typewriter');
            var typewriter = new Typewriter(app, {
                loop: true
            });
            var i;
            for (i = 1; i <= typewriterLength; i++) {
                typewriter.typeString(typewriterJSON['typewriter_text_' + i])
                    .pauseFor(2500)
                    .deleteAll()
                if (i == typewriterLength ){
                    typewriter.start();
                }
            }
        }
    }

    // Animate on Scroll

    // check if AOS is on globally && disable in HubSpot's page-editor
    if (typeof $(".body-wrapper").data('aos-global-disable') !== 'undefined' && typeof AOS != "undefined" ) {
        var aosDisable = $(".body-wrapper").attr("data-aos-global-disable");
        if (aosDisable == 'none')
            aosDisable = false;

        AOS.init({
            // Global settings:
            disable: aosDisable, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
        
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: $(".body-wrapper").attr("data-aos-global-offset"), // offset (in px) from the original trigger point
            delay: $(".body-wrapper").attr("data-aos-global-delay"), // values from 0 to 3000, with step 50ms
            duration: $(".body-wrapper").attr("data-aos-global-duration"), // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: true, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        });

        $.fn.matchHeight._afterUpdate = function(event, groups) {
            AOS.refresh();
        };
    } 

});

// Search input
var hsSearch = function(_instance) {
    var TYPEAHEAD_LIMIT = 3;
    var searchTerm = '',
      searchForm = _instance,
      searchField = _instance.querySelector('.hs-search-field__input'),
      searchResults = _instance.querySelector('.hs-search-field__suggestions'),
      searchOptions = function() {
        var formParams = [];
        var form = _instance.querySelector('form');
        for (
          var i = 0;
          i < form.querySelectorAll('input[type=hidden]').length;
          i++
        ) {
          var e = form.querySelectorAll('input[type=hidden]')[i];
          if (e.name !== 'limit') {
            formParams.push(
              encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value)
            );
          }
        }
        var queryString = formParams.join('&');
        return queryString;
      };
  
    var debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
          var context = this,
            args = arguments;
          var later = function() {
            timeout = null;
            if (!immediate) {
              func.apply(context, args);
            }
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait || 200);
          if (callNow) {
            func.apply(context, args);
          }
        };
      },
      emptySearchResults = function() {
        searchResults.innerHTML = '';
        searchField.focus();
        searchForm.classList.remove('hs-search-field--open');
      },
      fillSearchResults = function(response) {
        var items = [],
            title = _instance.querySelector('#hs-search-field__translations').dataset.suggestions_title;
        if (title != '')
            items.push("<li id='results-for'>" + title.replace('{search_term}', response.searchTerm) + "</li>");
        response.results.forEach(function(val, index) {
          items.push(
            "<li id='result" +
              index +
              "'><a href='" +
              val.url +
              "'>" +
              val.title +
              '</a></li>'
          );
        });
  
        emptySearchResults();
        searchResults.innerHTML = items.join('');
        searchForm.classList.add('hs-search-field--open');
      },
      getSearchResults = function() {
        var request = new XMLHttpRequest();
        var requestUrl =
          '/_hcms/search?&term=' +
          encodeURIComponent(searchTerm) +
          '&limit=' +
          encodeURIComponent(TYPEAHEAD_LIMIT) +
          '&autocomplete=true&analytics=true&' +
          searchOptions();
  
        request.open('GET', requestUrl, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            if (data.total > 0) {
              fillSearchResults(data);
              trapFocus();
            } else {
              emptySearchResults();
            }
          } else {
            console.error('Server reached, error retrieving results.');
          }
        };
        request.onerror = function() {
          console.error('Could not reach the server.');
        };
        request.send();
      },
      trapFocus = function() {
        var tabbable = [];
        tabbable.push(searchField);
        var tabbables = searchResults.getElementsByTagName('A');
        for (var i = 0; i < tabbables.length; i++) {
          tabbable.push(tabbables[i]);
        }
        var firstTabbable = tabbable[0],
          lastTabbable = tabbable[tabbable.length - 1];
        var tabResult = function(e) {
            if (e.target == lastTabbable && !e.shiftKey) {
              e.preventDefault();
              firstTabbable.focus();
            } else if (e.target == firstTabbable && e.shiftKey) {
              e.preventDefault();
              lastTabbable.focus();
            }
          },
          nextResult = function(e) {
            e.preventDefault();
            if (e.target == lastTabbable) {
              firstTabbable.focus();
            } else {
              tabbable.forEach(function(el) {
                if (el == e.target) {
                  tabbable[tabbable.indexOf(el) + 1].focus();
                }
              });
            }
          },
          lastResult = function(e) {
            e.preventDefault();
            if (e.target == firstTabbable) {
              lastTabbable.focus();
            } else {
              tabbable.forEach(function(el) {
                if (el == e.target) {
                  tabbable[tabbable.indexOf(el) - 1].focus();
                }
              });
            }
          };
        searchForm.addEventListener('keydown', function(e) {
          switch (e.which) {
            case 9:
              tabResult(e);
              break;
            case 27:
              emptySearchResults();
              break;
            case 38:
              lastResult(e);
              break;
            case 40:
              nextResult(e);
              break;
          }
        });
      },
      isSearchTermPresent = debounce(function() {
        searchTerm = searchField.value;
        if (searchTerm.length > 2) {
          getSearchResults();
        } else if (searchTerm.length == 0) {
          emptySearchResults();
        }
      }, 250),
      init = (function() {
        searchField.addEventListener('input', function(e) {
          if (
            e.which != 9 &&
            e.which != 40 &&
            e.which != 38 &&
            e.which != 27 &&
            searchTerm != searchField.value
          ) {
            isSearchTermPresent();
          }
        });
      })();
  };
  
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    var searchResults = document.querySelectorAll('.hs-search-field');
    Array.prototype.forEach.call(searchResults, function(el) {
      var hsSearchModule = hsSearch(el);
    });
  } else {
    document.addEventListener('DOMContentLoaded', function() {
      var searchResults = document.querySelectorAll('.hs-search-field');
      Array.prototype.forEach.call(searchResults, function(el) {
        var hsSearchModule = hsSearch(el);
      });
    });
  }


/* ==========================================================================
  4. Third Party                                           #third
  ========================================================================== */

 // jquery-match-height
{% include './third_party/_match-height.js' %}
    
// jquery.detectSwipe
{% include './third_party/_detect-swipe.js' %}

// Owl carousel
{% include './third_party/_owl-slider.js' %}

// Featherlight
{% include './third_party/_featherlight.js' %}

// jquery.mb.YTPlayer
{% include './third_party/_mb-ytplayer.js' %}

// lazyload lazySizes
{% include './third_party/_lazysizes.js' %}

// Animate on Scorll
{% if request.full_url|length == request.full_url|replace('https://preview.hs-sites.com/content-rendering','')|length %}
{% include './third_party/_aos.js' %}
{% endif %}


/* ==========================================================================
  5. Custom JS                                             #custom
  ========================================================================== */

  {% include './_custom.js' %}
