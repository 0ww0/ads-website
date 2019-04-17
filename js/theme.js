/////////////////////////////////////////////////////////////////////
// jQuery for page scrolling feature - requires jQuery Easing plugin
/////////////////////////////////////////////////////////////////////

$('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top -65
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});



////////////////////////////////////////////////////////////////////////
// On-Scroll Animated Header: https://github.com/codrops/AnimatedHeader
////////////////////////////////////////////////////////////////////////

var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = document.querySelector( '.navbar-fixed-top' ),
        didScroll = false,
        changeHeaderOn = 600;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'navbar-shrink' );
        }
        else {
            classie.remove( header, 'navbar-shrink' );
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();



//////////////////////////////////////////////
// Highlight the top nav as scrolling occurs
//////////////////////////////////////////////

$('body').scrollspy({
    target: '.navbar',
    offset: 65
})



///////////////////////////////////////////
// Display loading image while page loads
///////////////////////////////////////////

// Wait for window load
$(window).load(function() {
    // Animate loader off screen
    $(".page-loader").fadeOut("slow");
});



////////////////////////////////////////////////////
// OWL Carousel: http://owlgraphic.com/owlcarousel
////////////////////////////////////////////////////


// Partner carousel
$("#owl-partners").owlCarousel({
    items : 4,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [980,2],
    itemsTablet: [768,2],
    autoPlay : 5000,
    stopOnHover : true,
    pagination : false
})

// Testimonials carousel
$("#owl-testimonial").owlCarousel({
    singleItem : true,
    autoPlay : 5000,
    stopOnHover : true,
    pagination : true,
    autoHeight : true
})


////////////////////////////////////////////////////////////////////
// Stellar (parallax): https://github.com/markdalgleish/stellar.js
////////////////////////////////////////////////////////////////////

$.stellar({
    // Set scrolling to be in either one or both directions
    horizontalScrolling: false,
    verticalScrolling: true,
});



///////////////////////////////////////////////////////////
// WOW animation scroll: https://github.com/matthieua/WOW
///////////////////////////////////////////////////////////

new WOW().init();



////////////////////////////////////////////////////////////////////////////////////////////
// Counter-Up (requires jQuery waypoints.js plugin): https://github.com/bfintal/Counter-Up
////////////////////////////////////////////////////////////////////////////////////////////

$('.counter').counterUp({
    delay: 10,
    time: 2000
});



////////////////////////////////////////////////////////////////////////////////////////////
// Isotop Package
////////////////////////////////////////////////////////////////////////////////////////////
$(window).load(function() {
$('.portfolio_menu ul li').click(function(){
	$('.portfolio_menu ul li').removeClass('active_prot_menu');
	$(this).addClass('active_prot_menu');
});

var $container = $('#portfolio');
$container.isotope({
  itemSelector: '.js-portfolio',
  layoutMode: 'fitRows'
});
$('#filters').on( 'click', 'a', function() {
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ filter: filterValue });
  return false;
});
});



/////////////////////////
// Scroll to top button
/////////////////////////

// Check to see if the window is top if not then display button
$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.scrolltotop').fadeIn();
    } else {
        $('.scrolltotop').fadeOut();
    }
});

// Click event to scroll to top
$('.scrolltotop').click(function(){
    $('html, body').animate({scrollTop : 0}, 1500, 'easeInOutExpo');
    return false;
});



////////////////////////////////////////////////////////////////////
// Close mobile menu when click menu link (Bootstrap default menu)
////////////////////////////////////////////////////////////////////

$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
        $(this).collapse('hide');
    }
});

$(document).ready(function() {

   /* activate the carousel */
   $('#modal-carousel').carousel({interval:false});

   /* change modal title when slide changes */
   $('#modal-carousel').on('slid.bs.carousel', function () {
        $('.num').html($(this).find('.active img').data('num'));
   });

   /* when clicking a thumbnail */
   $(".row .thumbnails").click(function(){
        var content = $(".carousel-inner");
        var num = $(".num");
        var total = $('.total');

        content.empty();
        num.empty();
        total.empty();

        var id = this.id;
        var repo = $("#img-repo .item");
        var repoCopy = repo.filter("#" + id).clone();
        var active = repoCopy.first();

        active.addClass("active");
        num.html(active.find("img").data("num"));
        total.html(repoCopy.length);
        content.append(repoCopy);

        // show the modal
        $("#modal-gallery").modal("show");

    });
});

(function() {
    $("#js-contact-form").validate({
        rules: {
            name: { required: true },
            email: { required: true , email: true },
            subject: { required: true },
        },
        messages: {
            name: "Please enter your Name",
            email: "Please enter a valid Email",
            subject: "Please enter a valid Subject",
        },
        errorPlacement: function (error, element) {
            error.addClass("help-block");


            // if (element.hasClass('multiselect')) {
            //     error.insertAfter(element.parent());
            // } else {
            //     error.insertAfter(element);
            // }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".show-error-wrapper").addClass("has-success").removeClass("has-error");
        }
    });
    $.validator.methods.email = function( value, element ) {
        return this.optional( element ) || /[a-z]+@[a-z]+\.[a-z]+/.test( value );
    }
    $("#js-contact-form").on('submit', function(e){
        e.preventDefault();


        var $form = $(this);
        if(!$form.valid()){
            return;
        }
        $('button.submit').addClass('preload');

        $.ajax({
            data: $('#js-contact-form').serialize(),
            success: function() {
                $('.form-group').removeClass('has-success');
                $('#js-contact-form')[0].reset();
                $('button.submit').removeClass('preload');
                $('.form-success').css('opacity','1');
                setTimeout(function(){
                    $('.form-success').css('opacity','0');
                },6000);
            },
            error: function(d) {
                $('.form-group').addClass('has-error');
                $('button.submit span').text('Submit');
            }
        });
    });



})();
