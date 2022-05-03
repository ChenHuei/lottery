import type { NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";

import { formateSecondToString } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUserSlice } from "@/redux/slices/user";

const MINUTE_SECOND = 60;

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { list, winner } = useAppSelector((state) => state.user);
  const [isCountdown, setIsCountdown] = useState(false);
  const [value, setValue] = useState<number | "">("");
  const [second, setSecond] = useState(0);

  const current = useMemo(() => formateSecondToString(second), [second]);

  const onClick = useCallback(() => {
    if (value > MINUTE_SECOND * 24) {
      alert("時間超過一天");
      return;
    }
    if (value !== "") {
      setSecond(value * MINUTE_SECOND);
      setIsCountdown(true);
      dispatch(
        setUserSlice({
          winner: null,
        })
      );
    }
  }, [dispatch, value]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;

    if (isCountdown) {
      if (second === 0) {
        dispatch(
          setUserSlice({
            winner: list[Math.floor(Math.random() * list.length)],
          })
        );
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
  }, [dispatch, isCountdown, list, second]);

  useEffect(() => {
    dispatch(
      setUserSlice({
        list: Array(100)
          .fill(0)
          .map((_, index) => ({
            id: index + 1,
            label: `${(index + 1).toString().padStart(2, "0")} ${
              Math.random() > 0.5 ? "先生" : "小姐"
            }`,
          })),
      })
    );
  }, [dispatch]);

  return (
    <main className="flex justify-center items-center bg-blue-200">
      <div className="w-full h-screen max-w-2xl flex flex-col md:flex-row justify-space-between p-8 bg-white">
        <div className="h-1/2 md:h-full flex-1 md:mr-4">
          <h4 className="mb-2 text-xl">抽獎時間</h4>
          <input
            className="w-full mr-2 p-2 border"
            type="text"
            placeholder="請輸入倒數時間/分鐘"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value) || "")}
          />
          <button
            className="my-2 p-2 bg-black text-white border hover:opacity-60"
            onClick={onClick}
          >
            設定
          </button>
          <p className="text-2xl text-blue-500">{current}</p>

          {winner && (
            <div className="mt-4">
              <h4 className="mb-2 text-xl">抽獎結果</h4>
              <div className="p-2 border">
                <p>{winner.label}</p>
              </div>
            </div>
          )}
        </div>
        <div className="h-1/2 md:h-full flex-1">
          <h4 className="mb-2 text-xl">抽獎名單</h4>
          <div
            className="p-2 border overflow-y-scroll"
            style={{ height: "calc(100% - 28px)" }}
          >
            {list.map((item) => (
              <div key={item.id} className="mb-1 last:mb-0">
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
