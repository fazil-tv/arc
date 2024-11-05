
import Lenis from '@studio-freight/lenis';
import ScrollMagic from 'scrollmagic';


export function cardanimation() {

    const lenis = new Lenis();

    lenis.on('scroll', (e: Event) => {
        console.log(e);
    });

    function raf(time: number): void {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    document.addEventListener('DOMContentLoaded', () => {
        const scrollBtn = document.getElementById('scrollBtn') as HTMLDivElement;
        window.addEventListener('scroll', () => {
            const box = document.querySelector('.scrollBtn') as HTMLElement;
            if (window.scrollY > 0) {
                box.classList.add('move');
            } else {
                box.classList.remove('move');
            }
        });
    });

    // Preloader Text 
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader') as HTMLElement;
        const firstText = document.getElementById('first-text') as HTMLElement;
        const secondText = document.getElementById('second-text') as HTMLElement;

        // Show the first text
        firstText.style.opacity = '1';

        // loading animation
        setTimeout(() => {
            firstText.style.opacity = '0';
            secondText.style.opacity = '1';
        }, 1000);

        setTimeout(() => {
            preloader.style.display = 'none';
        }, 4000);
    });

    // Loader Video 
    window.addEventListener('load', () => {
        document.body.classList.add('overflow-hidden'); // body - overflow hidden
        document.documentElement.classList.add('overflow-hidden'); // html - overflow hidden

        setTimeout(() => {
            const loaderVideo = document.getElementById('loaderVideo') as HTMLElement;
            loaderVideo.style.width = '90%';
            loaderVideo.style.height = '90%';
            loaderVideo.style.transform = 'translate(-50%, -50%)';
            loaderVideo.style.top = '50%';
            loaderVideo.style.left = '50%';
            loaderVideo.style.position = 'fixed';
            loaderVideo.style.borderRadius = '12px';
        }, 2000);

        setTimeout(() => {
            const loaderVideo = document.getElementById('loaderVideo') as HTMLElement;

            if (window.matchMedia('(max-width: 576px)').matches) {
                loaderVideo.style.width = '220px';
                loaderVideo.style.height = '220px';
                loaderVideo.style.top = '25%';
                loaderVideo.style.left = '24px';
                loaderVideo.style.transform = 'translate(0%, -25%)';
            } else if (window.matchMedia('(max-width: 767px)').matches) {
                loaderVideo.style.width = '220px';
                loaderVideo.style.height = '220px';
                loaderVideo.style.right = '40px';
                loaderVideo.style.transform = 'translate(0%, -50%)';
            } else if (window.matchMedia('(max-width: 991px)').matches) {
                loaderVideo.style.width = '310px';
                loaderVideo.style.height = '310px';
                loaderVideo.style.right = '40px';
                loaderVideo.style.transform = 'translate(0%, -50%)';
            } else if (window.matchMedia('(max-width: 1199px)').matches) {
                loaderVideo.style.width = '400px';
                loaderVideo.style.height = '400px';
                loaderVideo.style.right = '60px';
                loaderVideo.style.transform = 'translate(0%, -50%)';
            } else if (window.matchMedia('(max-width: 1399px)').matches) {
                loaderVideo.style.width = '450px';
                loaderVideo.style.height = '450px';
                loaderVideo.style.right = '80px';
                loaderVideo.style.transform = 'translate(0%, -50%)';
            } else {
                loaderVideo.style.width = '500px';
                loaderVideo.style.height = '500px';
                loaderVideo.style.right = '100px';
                loaderVideo.style.transform = 'translate(0%, -50%)';
            }

            document.body.classList.remove('overflow-hidden'); // body - overflow visible
            document.documentElement.classList.remove('overflow-hidden'); // html - overflow visible
        }, 3000); // Adjust the time as needed
    });


  

    const controller = new ScrollMagic.Controller({ loglevel: 3 });

    new ScrollMagic.Scene({
        triggerElement: "#section2",
        triggerHook: "onEnter",
        duration: "100%"
    })
        .setPin("#section1 .pinWrapper", {
            pushFollowers: false
        })
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#section2",
        triggerHook: "onEnter",
        duration: "200%"
    })
        .setPin("#section2 .pinWrapper", {
            pushFollowers: false
        })
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#section3",
        triggerHook: "onEnter",
        duration: "200%"
    })
        .setPin("#section3 .pinWrapper", {
            pushFollowers: false
        })
        .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#section4",
        triggerHook: "onEnter",
        duration: "100%"
    })
        .setPin("#section4 .pinWrapper", {
            pushFollowers: false
        })
        .addTo(controller);




}