import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({ imageSrc, title, content, href }) => {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href
    ? { href, className: "group block" }
    : { className: "group" };

  return (
    <Wrapper {...wrapperProps}>
      <div className="relative bg-white shadow-lg rounded-3xl overflow-hidden font-inter w-full max-w-[230px] aspect-square mx-auto">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm px-3 h-[56px] flex items-center justify-center text-center">
          <h2
            className="text-black text-xs sm:text-sm font-semibold text-primary leading-snug overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Hidden content on hover */}
        <div className="absolute inset-0 bg-black/60 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-[12px] leading-relaxed relative z-[10]">{content}</p>
          <div className="absolute w-[160px] h-[160px] bg-[#0ccc90] top-[-35px] right-[-20px] rounded-full blur-[49px]"></div>
          <p className="absolute bottom-3 right-3">
            <ArrowRight className="text-xs" />
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ServiceCard;
