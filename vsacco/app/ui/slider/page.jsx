"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeroSlider = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const images = ["/image1.jpg", "/image2.jpg", "/image3.jpg", "/image4.jpg"];

  const heroText = [
    "Table banking is the future for today!",
    "Together we can achieve more!",
    "Start your Investment as early as now!",
    "Build your future with us",
  ];

  return (
    <div className="mx-0 h-full w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="w-full h-full mx-0">
          {images.map((src, index) => (
            <CarouselItem key={index} className="w-full mx-0 p-0">
              <span className="relative w-full h-[42rem] flex flex-col align-middle items-center justify-center">
                <Image
                  fill
                  src={src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt=""
                  className="absolute object-cover"
                  priority
                />
              </span>
            </CarouselItem>
          ))}
        </CarouselContent>
        <span className="flex flex-col flex-wrap justify-center items-center  absolute text-white top-1/3 w-full">
          <p className="flex flex-wrap items-center justify-center 
          justify-items-center font-bold text-3xl text-wrap text-center w-full md:w-4/5 pb-6">
            {heroText[current - 1]}
          </p>
          <span className="flex flex-shrink flex-nowrap gap-2">
            <Link href="#" className="group relative inline-block overflow-hidden border-2 border-background hover:border-background bg-transparent px-8 py-3 font-medium text-background">
              <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-background opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative transition-colors duration-300 ease-out group-hover:text-primary hover:border-none">
                Learn About Us
              </span>
            </Link>
            <Link href="#" className="group relative inline-block overflow-hidden border-2 border-primary hover:border-background bg-primary px-8 py-3 font-medium text-background">
              <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-background opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative transition-colors duration-300 ease-out group-hover:text-foreground hover:border-none">
                Know Our Services
              </span>
            </Link>
          </span>
        </span>
        <CarouselPrevious className="hidden md:flex absolute md:left-[12%] lg:left-1/4" />
        <CarouselNext className="hidden md:flex absolute md:right-[12%] lg:right-1/4" />
      </Carousel>
      {/* <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div> */}
    </div>
  );
};

export default HeroSlider;
