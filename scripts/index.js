//clear url on ready
// $(document).ready(function(){
//     var newURL = location.href.split("#")[0];
//     window.history.pushState('object', document.title, newURL);
// })

// hamburger menu open close
$("#hamburger").click(function () {
    if ($("#hamburger").text() == "menu_open") {
        $("#hamburger").text("menu");
        $("side-bar").stop().animate({
            opacity: "0",
            right: "-20rem",
            queue: false
        });
    } else if ($("#hamburger").text("menu")) {
        $("#hamburger").text("menu_open");
        $("side-bar").stop().animate({
            opacity: "1",
            right: "0rem",
            queue: false
        }).css("display", "flex");
    }
});

// click side-bar link closes it
$("side-bar").click(function () {
    if ($("#hamburger").text() == "menu_open") {
        $("#hamburger").text("menu");
        $("side-bar").animate({
            opacity: "0",
            right: "-20rem",
            queue: false
        });
    }
});

// video player
var tag = document.createElement('script');
const videos = ["U3_uxUSeZV4", "CmCIZ_aUAeQ", "Faow3SKIzq0", "F_7ZoAQ3aJM", "tnGaCZZ5Z28"];
let chosen = ""

$(document).ready(function () {
    const random = Math.floor(Math.random() * videos.length);
    chosen = videos[random]
})

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: chosen,
        playerVars: {
            "autoplay": 1,
            "loop": 1,
            "modestbranding": 1,
            "autohide": 1,
            "showinfo": 0,
            "controls": 0,
            "mute": 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    $("#player").animate({
        opacity: 1
    }, {
        easing: "swing"
    }, {
        duration: 500
    });
    if (event.data == YT.PlayerState.ENDED) {
        player.playVideo();
    }
}

//volume toggle
$("#volume").click(function () {
    if ($("#volume").text() == "volume_up") {
        player.mute();
        $("#volume").text("volume_off");
    } else if ($("#volume").text("menu")) {
        player.unMute();
        $("#volume").text("volume_up");
    }
});

// click link with hash scrolls to div with matching id
$('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    left: target.offset().left,
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });

// // on scroll div fade in
// $(window).on("load",function() {
//     $(window).scroll(function() {
//       var windowBottom = $(this).scrollTop() + $(this).innerHeight();
//       $(".fade-in").each(function() {
//         /* Check the location of each desired element */
//         var objectBottom = $(this).offset().top + $(this).outerHeight();
//         /* If the element is completely within bounds of the window, fade it in */
//         if (objectBottom < windowBottom) { //object comes into view (scrolling down)
//           if ($(this).css("opacity")==0) {
//               $(this).stop().animate({opacity: 1}, 500);
//             }
//         } else { //object goes out of view (scrolling up)
//           if ($(this).css("opacity")==1) {
//               $(this).stop().animate({opacity: 0}, 500);
//             }
//         }
//       });
//     }).scroll(); //invoke scroll-handler on page-load
//   });

//fulscreen work images and video
//show bigger image
$(".case-study img").click(function () {
    $("modal").fadeIn().css("display", "flex")
    $("modal img").attr("src", $(this).attr("src"))
})

$(".case-study video").click(function () {
    let videoUrl = $(this).find("source").attr("src")
    $("modal").fadeIn().css("display", "flex")
    $("video").attr("poster", this.poster)
    $("modal source").attr("src", videoUrl)
    $("modal video").css("display", "block")
    $("video")[0].load()
})

// close function
function closeModal() {
    $("modal source").attr("src", "")
    $("modal img").attr("src", "")
    $("video")[0].load()
    $("modal").fadeOut()
    $("modal video").css("display", "none")
}
$(".close").click(function () {
    closeModal();
})
$(document).keydown(function (event) {
    if (event.keyCode == 27) {
        closeModal();
    }
});