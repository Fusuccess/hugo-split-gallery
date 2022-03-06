function showNext() {
    var parent = $(this).parents("nav").first();
    var current = parent.siblings("ul:visible").first();
    var next = current.next("ul");
    current.slideUp();
    next.slideDown();

    parent.find('.btn-prev').removeAttr("disabled");
    if (next.next("ul")[0] === undefined) {
        $(this).attr("disabled", "disabled");
    }
}

function showPrevious() {
    var parent = $(this).parents("nav").first();
    var current = parent.siblings("ul:visible").first();
    var prev = current.prev("ul");
    current.slideUp();
    prev.slideDown();

    if (prev.prev("ul")[0] === undefined) {
        $(this).attr("disabled", "disabled");
    }
    parent.find('.btn-next').removeAttr("disabled");
}

$(function() {
    $(".btn-next").on("click", showNext);
    $(".btn-prev").on("click", showPrevious);
});
