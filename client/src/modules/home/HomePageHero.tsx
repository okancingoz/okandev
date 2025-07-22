import { LottieAnimation } from "@/app/lib/LottieAnimation";
import Header from "@/components/Header";
import LoopingTypewriter from "@/components/LoopingTypeWriter";

const HomePageHero = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-screen-xl px-4 pt-6">
        <Header />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-screen-xl gap-8">
          {/* Text */}
          <div className="flex-1 flex flex-col items-center md:items-center text-center md:text-center">
            <LoopingTypewriter
              texts={[
                "Software Developer",
                "Software Developer at okandev",
                "Software Developer who loves clean code",
                "Software Developer building cool stuff",
              ]}
            />
          </div>

          {/* Animation */}
          <div className="flex-1 flex justify-center items-center">
            <div
              className="max-w-lg w-full"
              style={{
                aspectRatio: "1 / 1",
                minWidth: "300px",
                minHeight: "300px",
              }}
            >
              <LottieAnimation animPath="/assets/lottie/airobot.json" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
