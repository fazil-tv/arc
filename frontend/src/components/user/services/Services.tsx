"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetAllServicesQuery } from '@/redux/user/userApi';

gsap.registerPlugin(ScrollTrigger);

const NewServices: React.FC = () => {
    const { data: services = [], error, isLoading } = useGetAllServicesQuery({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const portfolioElement = document.getElementById("portfolio");
            const horizontalSections = gsap.utils.toArray<HTMLElement>('.horiz-gallery-wrapper');

            const setupScrollAnimation = () => {
                horizontalSections.forEach((sec) => {
                    const pinWrap = sec.querySelector<HTMLElement>(".horiz-gallery-strip");

                    if (pinWrap) {
                        let pinWrapWidth: number;
                        let horizontalScrollLength: number;

                        const refresh = () => {
                            pinWrapWidth = pinWrap.scrollWidth;
                            horizontalScrollLength = pinWrapWidth - window.innerWidth;
                        };

                        refresh();

                        const scrollTween = gsap.to(pinWrap, {
                            scrollTrigger: {
                                scrub: true,
                                trigger: sec,
                                pin: sec,
                                start: "center center",
                                end: () => `+=${pinWrapWidth}`,
                                invalidateOnRefresh: true
                            },
                            x: () => -horizontalScrollLength,
                            ease: "none"
                        });

                        pinWrap.querySelectorAll<HTMLElement>("[data-speed-x]").forEach((el) => {
                            const speed = parseFloat(el.getAttribute("data-speed-x") || "1");
                            gsap.to(el, {
                                x: () => (1 - speed) * (window.innerWidth + el.offsetWidth),
                                ease: "none",
                                scrollTrigger: {
                                    containerAnimation: scrollTween,
                                    trigger: el,
                                    scrub: true
                                }
                            });
                        });

                        ScrollTrigger.addEventListener("refreshInit", refresh);
                    }
                });
            };

            setupScrollAnimation();

            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }
    }, [services]);

    if (isLoading) {
        return <p>Loading services...</p>;
    }

    if (error) {
        return <p>Error fetching services:</p>;
    }

    return (
        <>
            <div id="smooth-wrapper ">
                <div id="smooth-content">
                    
                    <section className="relative overflow-hidden py-20 text-center">
                        <h1 className="text-4xl font-bold">Know About Our Services</h1>
                    </section>

                    <section id="portfolio" className="relative overflow-hidden py-20">
                        <div className="container mx-auto px-0">
                            <div className="horiz-gallery-wrapper flex flex-nowrap relative">
                                <div className="horiz-gallery-strip flex flex-nowrap will-change-transform relative">
                                    {services.length > 0 ? (
                                        services.map((service: any) => (
                                            <div key={service.id} className="project-wrap w-[30vw] p-8 box-content">
                                                <h2 className="text-start px-6 pb-7 text-2xl">{service.name}</h2>
                                                <Link href={`/services/${service._id}`}>
                                                    <div className="w-full h-full service-img">
                                                        <img
                                                            className="serviceimag w-full h-[500px] object-fill rounded-[30px]"
                                                            src={`/uplodedImages/${service.images[0]}`}
                                                            alt={service.name}
                                                        />
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No services available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative overflow-hidden py-20 text-center border-t border-solid border-[rgb(255,252,225)] text-white">
                        <h1 className="text-4xl font-bold">Another section</h1>
                    </section>
                </div>
            </div>
        </>
    );
};

export default NewServices;
