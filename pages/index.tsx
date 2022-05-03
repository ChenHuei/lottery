import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";

import { formateSecondToString } from "@/utils";

const LIST = Array(100)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    label: `${index + 1} ${Math.random() > 0.5 ? "先生" : "小姐"}`,
  }));

const MINUTE_SECOND = 60;

const Home: NextPage = () => {
  const [isCountdown, setIsCountdown] = useState(false);
  const [value, setValue] = useState<number | "">("");
  const [second, setSecond] = useState(0);
  const [winner, setWinner] = useState<string | number>("");

  const current = useMemo(() => formateSecondToString(second), [second]);

  const onClick = useCallback(() => {
    if (value > MINUTE_SECOND * 24) {
      alert("時間超過一天");
      return;
    }
    if (value !== "") {
      setSecond(value * MINUTE_SECOND);
      setIsCountdown(true);
    }
  }, [value]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;

    if (isCountdown) {
      if (second === 0) {
        setWinner(LIST[Math.floor(Math.random() * LIST.length)].label);
        setIsCountdown(false);
      } else {
        timer = setTimeout(() => {
          setSecond((prev) => Math.max(prev - 1, 0));
        }, 1000);
      }
    }
    return () => {
      clearTimeout(timer as number | undefined);
    };
  }, [isCountdown, second]);

  return (
    <main className="flex justify-center items-center bg-blue-200">
      <div className="w-full h-screen max-w-2xl flex p-8 bg-white">
        <div className="flex-1 mr-4">
          <h4 className="text-xl">抽獎時間</h4>
          <input
            className="w-full my-2 mr-2 p-2 border"
            type="text"
            placeholder="請輸入倒數時間/分鐘"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || "")}
          />
          <button
            className="mb-2 p-2 bg-black text-white border hover:opacity-60"
            onClick={onClick}
          >
            設定
          </button>
          <p className="text-2xl text-blue-500">{current}</p>

          {winner !== "" && (
            <div className="mt-4">
              <h4 className="text-xl">抽獎結果</h4>
              <div className="p-2 border">
                <p>{winner}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-scroll">
          {LIST.map((item) => (
            <div key={item.id}>{item.label}</div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
