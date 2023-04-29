$(window).ready(function(){
    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
        // Reset tl when scroll out of view past bottom of screen
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        // Play tl when scrolled into view
    
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onEnter: () => timeline.play()
        });
    };

    let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    });
    
    $("[text-split]").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        let eachWord = $(this).find(".word");
        let eachChar = $(this).find(".word .char");
        tl.fromTo(
            [eachWord, eachChar],
            {display:"inline-flex"},
            {display:"inline-flex"}
        )
    });
    
    $("[words-slide-up]").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        let eachWord = $(this).find(".word");
        let eachChar = $(this).find(".word .char");
        tl.from(
            eachChar,
            {
                opacity: 0,
                yPercent: eachWord.outerHeight(),
                duration: 0.7,
                ease: "out",
                stagger: { each: 0.02 }
            }
        );
        createScrollTrigger($(this), tl);
    });

    gsap.set("[words-slide-up]", { opacity: 1 });

    function figureCurveAnimation(eachElement, rtl){
        let tl = gsap.timeline({});
        let svgCurveTextElement = eachElement.find('.about__figure__curve__text');
        let svgCurvePathLength = eachElement.find('.about__figure__curve__path').get(0).getTotalLength();
        let svgCurveTextLength = svgCurveTextElement.get(0).getComputedTextLength();
        let distancePathToTextLength = svgCurvePathLength - svgCurveTextLength;

        gsap.fromTo(
            svgCurveTextElement,
            { attr: { startOffset: rtl ? (svgCurvePathLength - distancePathToTextLength) : distancePathToTextLength * -1} },
            {
                duration: 1,
                attr: { startOffset: rtl ? 0 : distancePathToTextLength },
                ease: "none",
                scrollTrigger: {
                    trigger: eachElement,
                    scrub: 1,
                    start: "top bottom",
                    end: `+=${eachElement.outerHeight() * 2}`,
                    onEnter: doCoolStuff()
                }
            }
        );
        tl.reversed(true);
        function doCoolStuff() {
            tl.reversed(!tl.reversed());
        }
    }

    $('.about__figure__curve--left').each(function () {
        figureCurveAnimation($(this));
    });
    $('.about__figure__curve--right').each(function () {
        figureCurveAnimation($(this), true);
    });
 
    $('[data-toggle="menu"]').on('click', function(){
        $(this).toggleClass('show')
        $('#responsive-navbar').toggleClass('show')
    })
})