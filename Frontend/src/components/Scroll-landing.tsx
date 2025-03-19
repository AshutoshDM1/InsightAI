import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
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
          className="mx-auto rounded-2xl object-cover h-full "
        />
      </ContainerScroll>
    </div>
  );
}
