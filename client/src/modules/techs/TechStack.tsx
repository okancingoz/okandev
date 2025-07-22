"use client";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SectionTitle from "@/components/SectionTitle";
import { Icon } from "@iconify/react";

const techs = [
  { name: "React", icon: <Icon icon="logos:react" width={96} /> },
  { name: "Next.js", icon: <Icon icon="logos:nextjs" width={96} /> },
  { name: "JavaScript", icon: <Icon icon="logos:javascript" width={96} /> },
  { name: "MongoDB", icon: <Icon icon="logos:mongodb" width={96} /> },
  { name: "Express", icon: <Icon icon="logos:express" width={96} /> },
  { name: "Node.js", icon: <Icon icon="logos:nodejs" width={96} /> },
  { name: "HTML5", icon: <Icon icon="logos:html-5" width={96} /> },
  { name: "CSS3", icon: <Icon icon="logos:css-3" width={96} /> },
];

export default function TechStack() {
  return (
    <section
      id="techstacks"
      className="bg-[#f6f6f6] py-16 flex flex-col items-center"
    >
      <SectionTitle className="text-4xl">Tech Stack</SectionTitle>

      <div
        className="max-w-[1280px] w-full px-6 rounded-3xl"
        style={{
          padding: "2rem",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <Swiper
          coverflowEffect={{ depth: 100 }}
          modules={[Autoplay]}
          slidesPerView={5}
          spaceBetween={40}
          loop
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          speed={1500}
          centeredSlides
          className="py-8"
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 5, spaceBetween: 40 },
          }}
        >
          {techs.map(({ name, icon }) => (
            <SwiperSlide key={name}>
              <div
                title={name}
                className="flex items-center p-8 justify-center cursor-default select-none rounded-2xl"
                style={{
                  width: "128px",
                  height: "128px",
                  margin: "auto",
                  backgroundColor: "transparent",
                }}
              >
                {icon}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
