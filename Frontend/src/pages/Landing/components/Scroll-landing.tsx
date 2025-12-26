import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollComponent() {
  return (
    <div className="flex flex-col overflow-hidden ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold mb-20 text-white dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                AI-Powered Insights
              </span>
            </h1>
          </>
        }
      >
        <img
          src={`./image.png`}
          alt="hero"
          className="hidden sm:block mx-auto rounded-2xl object-cover h-full "
        />
        <img
          src={`./mobile-image.png`}
          alt="hero"
          className="block sm:hidden rounded-2xl w-full object-cover h-full "
        />
      </ContainerScroll>
    </div>
  );
}
