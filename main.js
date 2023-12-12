import $ from "jquery";
import gsap from "gsap";
import VirtualScroll from "virtual-scroll";
import "./main.scss";

var ease = 0.05,
    deltaY = 0,
    targetY = 0,
    scrollFactor = "ontouchstart" in document ? 3 : 0.5,
    targetSpeed = 0,
    speedFactor = 3,
    targetRotation = 0,
    rotationFactor = 0.1;

const scroller = new VirtualScroll();

const scrollHandler = (e) => {
    targetRotation = e.deltaY * rotationFactor;
    targetRotation = Math.min(10, targetRotation);
    targetRotation = Math.max(-10, targetRotation);

    targetSpeed = Math.abs(e.deltaY) * speedFactor;
    targetSpeed = Math.min(60, targetSpeed);
    targetSpeed = Math.max(-60, targetSpeed);

    targetY += e.deltaY * scrollFactor;

    deltaY = e.deltaY;
};

scroller.on(scrollHandler);

var currentY = 0,
    currentSpeed = 0,
    currentRotation = 0,
    itemHeight = 0;

var run = function () {
    requestAnimationFrame(run);

    if (!deltaY) {
        targetSpeed = 0;
        targetRotation = 0;
    }

    currentY += (targetY - currentY) * ease;
    currentSpeed += (targetSpeed - currentSpeed) * ease;
    currentRotation += (targetRotation - currentRotation) * ease;
    itemHeight = $(".item").outerHeight();

    $(".column").each(function (i, el) {
        var factor = this.dataset.scrollFactor,
            columnY = currentY * factor,
            items = this.querySelectorAll(".item");

        var columnY = columnY % (itemHeight * 10);

        if (columnY < 0) {
            items[0].style.transform = "translateZ(0) translateY(" + (columnY < -1 * itemHeight ? "1000%" : 0) + ")";
            items[1].style.transform = "translateZ(0) translateY(" + (columnY < -2 * itemHeight ? "1000%" : 0) + ")";
            items[2].style.transform = "translateZ(0) translateY(" + (columnY < -3 * itemHeight ? "1000%" : 0) + ")";
            items[3].style.transform = "translateZ(0) translateY(" + (columnY < -4 * itemHeight ? "1000%" : 0) + ")";
            items[4].style.transform = "translateZ(0) translateY(" + (columnY < -5 * itemHeight ? "1000%" : 0) + ")";
            items[5].style.transform = "translateZ(0) translateY(" + (columnY < -6 * itemHeight ? "1000%" : 0) + ")";
            items[6].style.transform = "translateZ(0) translateY(" + (columnY < -7 * itemHeight ? "1000%" : 0) + ")";
            items[7].style.transform = "translateZ(0) translateY(" + (columnY < -8 * itemHeight ? "1000%" : 0) + ")";
            items[8].style.transform = "translateZ(0) translateY(" + (columnY < -8 * itemHeight ? "1000%" : 0) + ")";
            items[9].style.transform = "translateZ(0) translateY(" + (columnY < -10 * itemHeight ? "1000%" : 0) + ")";
        } else {
            items[0].style.transform = "translateZ(0) translateY(" + (columnY > 10 * itemHeight ? "-1000%" : 0) + ")";
            items[1].style.transform = "translateZ(0) translateY(" + (columnY > 9 * itemHeight ? "-1000%" : 0) + ")";
            items[2].style.transform = "translateZ(0) translateY(" + (columnY > 8 * itemHeight ? "-1000%" : 0) + ")";
            items[3].style.transform = "translateZ(0) translateY(" + (columnY > 7 * itemHeight ? "-1000%" : 0) + ")";
            items[4].style.transform = "translateZ(0) translateY(" + (columnY > 6 * itemHeight ? "-1000%" : 0) + ")";
            items[5].style.transform = "translateZ(0) translateY(" + (columnY > 5 * itemHeight ? "-1000%" : 0) + ")";
            items[6].style.transform = "translateZ(0) translateY(" + (columnY > 4 * itemHeight ? "-1000%" : 0) + ")";
            items[7].style.transform = "translateZ(0) translateY(" + (columnY > 3 * itemHeight ? "-1000%" : 0) + ")";
            items[8].style.transform = "translateZ(0) translateY(" + (columnY > 2 * itemHeight ? "-1000%" : 0) + ")";
            items[9].style.transform = "translateZ(0) translateY(" + (columnY > 1 * itemHeight ? "-1000%" : 0) + ")";
        }

        var transform = "translateY(" + columnY + "px) translateZ(0) skewY(" + currentRotation + "deg)";

        this.style.transform = transform;
        $(".scroll-content")[0].style.transform = "rotate(" + currentRotation + "deg) translateZ(" + -currentSpeed + "px)";
    });

    deltaY = 0;
};

run();

$(".item").each(function (i, el) {
    $(this).css("background-image", "url(/" + (i + 1) + ".jpg)");
});

$(window).on("load", function () {
    targetY = -400;
    gsap.to(".scroll-content", 1, {
        opacity: 1,
    });
});
