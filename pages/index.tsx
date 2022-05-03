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

          {winner && (
            <div className="mt-4">
              <h4 className="text-xl">抽獎結果</h4>
              <div className="p-2 border">
                <p>{winner.label}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-scroll">
          {list.map((item) => (
            <div key={item.id}>{item.label}</div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
