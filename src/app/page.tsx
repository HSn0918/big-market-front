import Image from "next/image";
import {LuckyGridPage} from "@/app/pages/lucky/lucky-wheel-page";
import {LuckyWheelPage} from "@/app/pages/lucky/lucky-grid-page";

export default function Home() {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="text-3xl font-bold text-center text-gray-800 my-8">
          大营销平台 - 抽奖展示
        </header>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
              <LuckyGridPage></LuckyGridPage>
          </div>
          <div className="w-full md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
              <LuckyWheelPage></LuckyWheelPage>
          </div>
        </div>
        {/* 底部文案 */}
        <footer className="text-gray-600 text-center my-8">
          @HSn
        </footer>
      </div>
  );
}
