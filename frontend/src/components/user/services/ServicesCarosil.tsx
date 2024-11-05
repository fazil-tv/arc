'use client'
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

export function ServicesCarosil({ servicesimg }: { servicesimg: string[] }) {

  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (

    <Carousel
      plugins={[plugin.current]}
      className="w-fit"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset} >
        
      <CarouselContent className="w-fit">
        {servicesimg.map((imgSrc: string, index: number) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={`/uplodedImages/${imgSrc}`}
                    alt={`Service Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>

  );
}
