import React, { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";

// import { crashXSocket as socket } from "../../utils/socket";
import SwitchTab from "../../newcomponents/SwitchTab";
import BetAmountInput from "../../newcomponents/AmountInput";
import MultiplierInput from "../../newcomponents/MultiplierInput";
import ProfitAmount from "../../newcomponents/ProfitAmount";
import BetButton from "../../newcomponents/Button";
import CurrentBets from "../../newcomponents/CurrentBets";
import CrashXCanvas from "./CrashXCanvas";
import StopProfitAmount from "../../newcomponents/StopAmount";
import placebet from "../../assets/audio/placebet.wav";
import error from "../../assets/audio/error.wav";
import success from "../../assets/audio/success.wav";
import crash from "../../assets/audio/crash.wav";
import AutoBetCountInput from "../../newcomponents/BetNumberInput";
import StopAmount from "../../newcomponents/ProfitAmount";
import VerifyModal from "../../newcomponents/VerifyModal";
import GameHistory from "../../newcomponents/GameHistory";
import FairnessView from "../../newcomponents/FairnessView";
import { EthSvg, InfinitySvg } from "../../newcomponents/svgs";
import useIsMobile from "../../hooks/useIsMobile";

import io from "socket.io-client";
import { API_URL } from "../../config";

// Export individual socket connections
export const crashSocket = io(`${API_URL}/crashx`);

const GAME_STATES = {
  NotStarted: 1,
  Starting: 2,
  InProgress: 3,
  Over: 4,
  Blocking: 5,
  Refunded: 6,
};

const errorAudio = new Audio(error);
const placebetAudio = new Audio(placebet);
const successAudio = new Audio(success);
const crashAudio = new Audio(crash);

const SelectedPaymentIcon = ({ currency }: any) => {
  if (currency && currency?.symbol) {
    return <img src={currency.icon} className="w-6 h-6" alt="currency" />;
  } else {
    return <EthSvg />;
  }
};

const playSound = (audioFile: any) => {
  try {
    audioFile.play().catch((error: any) => {
      console.error("Error playing sound:", error);
    });
  } catch (error) {
    console.log(error);
  }
};

const CrashGame = () => {
  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState(0);

  const [subActiveTab, setSubActiveTab] = useState(0);

  const [gameId, setGameId] = useState("");
  const [privateHash, setPrivateHash] = useState("");
  const [publicSeed, setPublicSeed] = useState("");

  const [betAmount, setBetAmount] = useState(0);
  const [target, setTarget] = useState(2);

  const [autoBetCount, setAutoCount] = useState(0);
  const [stopProfitA, setStopPorfitA] = useState(0);
  const [stopLossA, setStopLossA] = useState(0);

  const [joining, setJoining] = useState(false);
  const [plannedBet, setPlannedBet] = useState(false);
  const [autoBetEnabled, setAutoBetEnabled] = useState(false);
  const [autoCashoutEnabled, setAutoCashoutEnabled] = useState(false);

  const [players, setPlayers] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<any>(null);
  const [gameState, setGameState] = useState(GAME_STATES.NotStarted);
  const [payout, setPayout] = useState(1);
  const [crashed, setCrashed] = useState(false);
  const [betting, setBetting] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [amountInputFlag, setAmountInputFlag] = useState(true);

  const [savebetAmount, setBetSaveAmount] = useState(0);
  const [history, setHistory] = useState<any>([]);

  const [verifyId, setGameVerifyId] = useState("");

  const betCountRef = useRef(0);
  const stopOnProfit = useRef(0);
  const stopOnLoss = useRef(0);
  const selfId = useRef();
  const savedTarget = useRef(0);
  const [privateSeed, setPrivateSeed] = useState("");

  const currency: any = {};

  // Emit new bet event
  const clickBet = () => {
    if (betAmount <= 0) {
      setAmountInputFlag(false);
      // toast.success("Please input your bet amount!", {
      //     style: {
      //         border: "1px solid #713200",
      //         padding: "14px",
      //         color: "#713200",
      //     },
      //     iconTheme: {
      //         primary: "#713200",
      //         secondary: "#FFFAEE",
      //     },
      // });
      return;
    }

    if (betAmount * currency?.price > 100) {
      // toast.success(`The max bet amount is ${Math.floor(100 / currency?.price * 100) / 100} ${currency?.symbol}!`, {
      //     style: {
      //         border: '1px solid #713200',
      //         padding: '8px',
      //         color: '#713200',
      //         color: 'black',
      //     },
      //     iconTheme: {
      //         primary: '#ffe71a',
      //         secondary: '#FFFAEE',
      //     },
      //     icon: '⚠',
      // });
      return;
    }

    betCountRef.current = autoBetCount;
    stopOnProfit.current = stopProfitA;
    stopOnLoss.current = stopLossA;

    if (gameState === GAME_STATES.Starting) {
      setJoining(true);
      savedTarget.current = target * 100;
      crashSocket.emit("join-game", target * 100, betAmount, currency._id);
    } else {
      if (plannedBet) {
        savedTarget.current = 0;
        setPlannedBet(false);
      } else if (!autoBetEnabled) {
        savedTarget.current = target * 100;
        setBetSaveAmount(Number(betAmount));
        setPlannedBet(true);
      }
    }
  };

  // Switch to auto betting
  const handleAutoBetChange = (value: any) => {
    setAutoBetEnabled(value);
    setPlannedBet(false);
  };

  // Emit bet cashout
  const clickCashout = () => {
    crashSocket.emit("bet-cashout");
  };

  // handle target value
  const onTargetChange = (value: any) => {
    setTarget(value);
  };

  useEffect(() => {
    // Add new player to the current game
    const addNewPlayer = (player: any) => {
      setPlayers((state) => [...state, player]);
    };

    // New round is starting handler
    const onGameStarting = (data: any) => {
      // Update state
      setGameId(data?._id);
      setStartTime(
        new Date(Date.now() + new Date(data.timeUntilStart).valueOf())
      );
      setGameState(GAME_STATES.Starting);
      setPrivateSeed("");
      setPublicSeed(data.publicSeed);
      setPrivateHash(data.privateHash);
      setPayout(1);
      setPlayers([]);

      setCrashed(false);

      /// auto betting
      if (autoBetEnabled) {
        console.log(savedTarget.current, savebetAmount);
        // check stop on profit amount
        if (stopProfitA !== 0 && stopOnProfit.current <= 0) {
          setAutoBetEnabled(false);
          return;
        }
        // check stop on loss amount
        if (
          stopLossA !== 0 &&
          stopOnLoss.current <= 0 &&
          Math.abs(stopOnLoss.current) > Math.abs(stopOnProfit.current)
        ) {
          setAutoBetEnabled(false);
        }

        setJoining(true);
        // Emit new bet event
        crashSocket.emit(
          "join-game",
          savedTarget.current,
          savebetAmount,
          currency._id
        );

        //Check the number of bets. If the number of bets is 0, it is infinite.

        if (betCountRef.current > 0) {
          betCountRef.current--;
          setAutoCount(betCountRef.current);
          if (betCountRef.current === 0) {
            setAutoBetEnabled(false);
            savedTarget.current = 0;
          }
        }
      } else if (plannedBet) {
        setJoining(true);

        // Emit new bet event
        crashSocket.emit(
          "join-game",
          savedTarget.current,
          betAmount,
          currency._id
        );
        savedTarget.current = 0;
        // Reset planned bet
        setPlannedBet(false);
      }
    };

    // New round started handler
    const onGameStart = (data: any) => {
      // Update state
      setStartTime(Date.now());
      setGameState(GAME_STATES.InProgress);
      setPublicSeed(data.publicSeed);
      setPrivateHash(data.privateHash);
      setCrashed(false);
    };

    // Current round ended handler
    const onGameEnd = ({ game }: any) => {
      setGameState(GAME_STATES.Over);
      setCrashed(true);
      setPayout(game.crashPoint);
      setPublicSeed(game.publicSeed);
      setPrivateSeed(game.privateSeed);
      setBetting(false);
      playSound(crashAudio);
      setCashedOut(false);
      addGameToHistory(game);
    };

    // Current round tick handler
    const onGameTick = (payoutData: any) => {
      if (gameState !== GAME_STATES.InProgress) return;
      setPayout(payoutData);
    };

    // Error event handler
    const joinError = (msg: string) => {
      if (msg === "You are not logged in!") {
        crashSocket.emit("auth", "token");
        // toast.error("please try again");
      } else {
        // toast.error(msg);
      }
      setJoining(false);
      playSound(errorAudio);
    };

    // Success event handler
    const joinSuccess = (bet: any) => {
      setJoining(false);
      setBetting(true);
      selfId.current = bet.playerID;
      setBetSaveAmount(Number(betAmount));
      // toast.success("Successfully joined the game!");
      playSound(placebetAudio);
      if (autoBetEnabled && stopLossA !== 0) {
        stopOnLoss.current -= bet.betAmount;
      }
    };

    // New game bets handler
    const onGameBets = (bets: any[]) => {
      bets.forEach((bet) => addNewPlayer(bet));
    };

    // New cashout handler
    const onBetCashout = (bet: any) => {
      if (
        autoBetEnabled &&
        bet[0].playerID === selfId.current &&
        stopProfitA !== 0
      ) {
        stopOnProfit.current -= bet[0].betAmount * bet[0].stoppedAt;
      }
      // Check if local user cashed out
      setCashedOut(true);
      // Update state
      if (bet[0]) {
        setPlayers((state) =>
          state.map((player) =>
            player.playerID === bet[0].playerID
              ? Object.assign(player, bet[0])
              : player
          )
        );
      }
    };

    // Success event handler
    const onCashoutSuccess = () => {
      // toast.success("Successfully cashed out!");
      playSound(successAudio);

      // Reset betting state
      setTimeout(() => {
        setBetting(false);
      }, 500);
    };

    // Error event handler
    const onCashoutError = (msg: string) => {
      // toast.error(msg);
      playSound(errorAudio);
    };

    const cancelError = () => { };

    const cancelSuccess = () => { };

    // Add game to history
    const addGameToHistory = (game: any) => {
      setHistory((state: any[]) =>
        state.length >= 6
          ? [...state.slice(1, state.length), game]
          : [...state, game]
      );
    };

    const onFetchGame = (schema: any) => {
      // Update state
      setGameId(schema._id);
      setPrivateHash(schema.privateHash);
      setPublicSeed(schema.publicSeed);
      setPlayers(schema.players);
      setStartTime(new Date(Date.now() - new Date(schema.elapsed).valueOf()));
      setHistory(schema.history.reverse().slice(0, 6));
      setGameState(schema.status);
    };
    // Listeners
    crashSocket.on("connect", () => {
      crashSocket.emit("games");
    });
    crashSocket.on("disconnect", () => { });
    crashSocket.on("game-starting", onGameStarting);
    crashSocket.on("game-start", onGameStart);
    crashSocket.on("game-end", onGameEnd);
    crashSocket.on("game-tick", onGameTick);
    crashSocket.on("game-bets", onGameBets);
    crashSocket.on("bet-cashout", onBetCashout);
    crashSocket.on("game-join-error", joinError);
    crashSocket.on("game-join-success", joinSuccess);
    crashSocket.on("bet-cashout-error", onCashoutError);
    crashSocket.on("bet-cashout-success", onCashoutSuccess);
    crashSocket.on("game-cancel-error", cancelError);
    crashSocket.on("game-cancel-success", cancelSuccess);
    crashSocket.on("games", onFetchGame);

    return () => {
      // Remove Listeners
      crashSocket.off("game-starting", onGameStarting);
      crashSocket.off("game-start", onGameStart);
      crashSocket.off("game-end", onGameEnd);
      crashSocket.off("game-tick", onGameTick);
      crashSocket.off("game-bets", onGameBets);
      crashSocket.off("bet-cashout", onBetCashout);
      crashSocket.off("game-join-error", joinError);
      crashSocket.off("game-join-success", joinSuccess);
      crashSocket.off("game-cancel-error", cancelError);
      crashSocket.off("game-cancel-success", cancelSuccess);

      crashSocket.off("bet-cashout-error", onCashoutError);
      crashSocket.off("bet-cashout-success", onCashoutSuccess);

      crashSocket.off("connect");
      crashSocket.off("disconnect");
      crashSocket.off("games", onFetchGame);
    };
  }, [
    gameState,
    startTime,
    plannedBet,
    autoBetEnabled,
    autoCashoutEnabled,
    betAmount,
    target,
    stopProfitA,
    stopLossA,
    autoBetCount,
    savebetAmount,
  ]);

  useEffect(() => {
    crashSocket.emit("games");
  }, []);

  useEffect(() => {
    if (Number(betAmount) > 0) {
      setAmountInputFlag(true);
    }
  }, [betAmount]);

  const disabled = joining || betting || autoBetEnabled;
  const isAuto = activeTab === 1;

  return (
    <div>
      <div className="w-full bg-[#10100f] h-full flex mt-4 justify-center ">
        <div className={`max-w-[1300px] ${isMobile ? "w-full p-1" : ""} `}>
          <div className="grid grid-cols-1 sm:grid-cols-4 rounded-md overflow-hidden   bg-panel">
            {!isMobile && (
              <div className="col-span-1 p-1 min-h-[560px] bg-sider_panel shadow-[0px_0px_15px_rgba(0,0,0,0.25)] flex flex-col justify-between">
                <div className="gap-2 p-1 py-4 ">
                  <SwitchTab
                    onChange={(e) => setActiveTab(e)}
                    disabled={disabled}
                    active={activeTab}
                  />
                  {isAuto && (
                    <SwitchTab
                      onChange={setSubActiveTab}
                      disabled={false}
                      active={subActiveTab}
                      options={["Controls", "Leaderboard"]}
                      type={"sub"}
                    />
                  )}
                  {(!isAuto || subActiveTab !== 1) && (
                    <>
                      <BetAmountInput
                        disabled={disabled}
                        value={betAmount}
                        onChange={setBetAmount}
                        className={`${!amountInputFlag ? "animate-bounding2" : ""
                          }`}
                      />
                      <MultiplierInput
                        disabled={disabled}
                        value={target}
                        onChange={onTargetChange}
                      />
                    </>
                  )}

                  {isAuto && subActiveTab === 1 && (
                    <CurrentBets bets={players} />
                  )}
                  {isAuto && subActiveTab !== 1 && (
                    <>
                      <AutoBetCountInput
                        disabled={disabled}
                        value={autoBetCount}
                        onChange={setAutoCount}
                        Icon={<InfinitySvg />}
                      />
                      <StopProfitAmount
                        disabled={disabled}
                        Label={"Stop on Profit"}
                        onChange={setStopPorfitA}
                        value={stopProfitA}
                        Icon={<SelectedPaymentIcon currency={currency} />}
                      />
                      <StopProfitAmount
                        disabled={disabled}
                        Label={"Loss on Profit"}
                        onChange={setStopLossA}
                        value={stopLossA}
                        Icon={<SelectedPaymentIcon currency={currency} />}
                      />
                    </>
                  )}
                  <ProfitAmount
                    disabled={true}
                    profit={payout * savebetAmount}
                    multiplier={payout}
                    icon={<SelectedPaymentIcon currency={currency} />}
                  />

                  {isAuto ? (
                    <BetButton
                      disabled={
                        betting &&
                        gameState !== GAME_STATES.InProgress &&
                        !autoBetEnabled
                      }
                      onClick={() => {
                        if (!betting) {
                          if (autoBetEnabled) {
                            handleAutoBetChange(false);
                          } else {
                            clickBet();
                            handleAutoBetChange(true);
                          }
                        } else if (
                          gameState === GAME_STATES.InProgress &&
                          !cashedOut
                        ) {
                          clickCashout();
                        } else if (autoBetEnabled) {
                          handleAutoBetChange(false);
                        }
                      }}
                    >
                      {!betting
                        ? autoBetEnabled
                          ? "Stop Autobet"
                          : "Start Autobet"
                        : gameState === GAME_STATES.InProgress && !cashedOut
                          ? "CASHOUT"
                          : autoBetEnabled
                            ? "Stop Autobet"
                            : "Finishing Bet"}
                    </BetButton>
                  ) : (
                    <BetButton
                      disabled={joining}
                      onClick={() => {
                        if (!betting) {
                          clickBet();
                        } else if (
                          gameState === GAME_STATES.InProgress &&
                          !cashedOut
                        ) {
                          clickCashout();
                        }
                      }}
                    >
                      {!betting
                        ? joining
                          ? "BETTING..."
                          : plannedBet
                            ? "CANCEL BET"
                            : "Place Bet (next round)"
                        : cashedOut
                          ? "CASHED OUT"
                          : "CASHOUT"}
                    </BetButton>
                  )}

                  {!isAuto && <CurrentBets bets={players} />}
                </div>
              </div>
            )}
            <div
              className={`col-span-3  gap-2 ${isMobile ? "p-1 w-full" : "p-2"
                } md:px-6 ${isMobile ? "h-[300px] " : "min-h-[300px] "
                }   relative h-full overflow-hidden`}
            >
              <div className="absolute top-4 z-10 left-5 max-w-[70%]">
                <div className="flex space-x-1 items-center">
                  {history
                    .slice(isMobile ? 3 : 0, 6)
                    .map((item: any, key: number) => {
                      const opacity = `opacity-${key + 4
                        }0 hover:opacity-100 transition-all`;
                      return (
                        <div
                          key={key}
                          className={`text-stone-50 animate-zoomIn cursor-pointer `}
                          onClick={() => setGameVerifyId(item._id)}
                        >
                          {item.crashPoint < 1.2 ? (
                            <div
                              className={`px-1 rounded-full overflow-hidden  ${opacity}`}
                            >
                              {parseCommasToThousands(
                                cutDecimalPoints(item.crashPoint.toFixed(2))
                              )}
                              x
                            </div>
                          ) : item.crashPoint >= 1.2 && item.crashPoint < 2 ? (
                            <div
                              className={` px-1 rounded-full overflow-hidden  ${opacity}`}
                            >
                              {" "}
                              {parseCommasToThousands(
                                cutDecimalPoints(item.crashPoint.toFixed(2))
                              )}
                              x
                            </div>
                          ) : item.crashPoint >= 2 && item.crashPoint < 100 ? (
                            <div
                              className={` px-1 rounded-full overflow-hidden ${opacity}`}
                            >
                              {parseCommasToThousands(
                                cutDecimalPoints(item.crashPoint.toFixed(2))
                              )}
                              x
                            </div>
                          ) : (
                            <div
                              className={`px-1 rounded-full overflow-hidden  ${opacity}`}
                            >
                              {" "}
                              {parseCommasToThousands(
                                cutDecimalPoints(item.crashPoint.toFixed(2))
                              )}
                              x
                            </div>
                          )}
                        </div>
                      );
                    })}
                  <FairnessView
                    gameId={"crash"}
                    privateSeed={privateSeed}
                    privateHash={privateHash}
                    publicSeed={publicSeed}
                  >
                    <div className="text-white">Fairness</div>
                  </FairnessView>
                  <GameHistory Label={"crash"} setGameId={setGameVerifyId} />
                </div>
              </div>
              <span className="absolute top-2.5 right-5 z-10 h-6 text-base crash-game-status text-stone-100">
                <div className="flex items-center">
                  <div className="p-2">
                    <NetStatus payout={payout} />
                  </div>
                </div>
              </span>
              <CrashXCanvas
                status={gameState}
                payout={payout}
                startTime={startTime}
              />
            </div>
            {isMobile && (
              <div className="col-span-1 p-2 bg-sider_panel shadow-[0px_0px_15px_rgba(0,0,0,0.25)] flex flex-col justify-between">
                {isAuto ? (
                  <BetButton
                    disabled={
                      betting &&
                      gameState !== GAME_STATES.InProgress &&
                      !autoBetEnabled
                    }
                    onClick={() => {
                      if (!betting) {
                        if (autoBetEnabled) {
                          handleAutoBetChange(false);
                        } else {
                          clickBet();
                          handleAutoBetChange(true);
                        }
                      } else if (
                        gameState === GAME_STATES.InProgress &&
                        !cashedOut
                      ) {
                        clickCashout();
                      } else if (autoBetEnabled) {
                        handleAutoBetChange(false);
                      }
                    }}
                  >
                    {!betting
                      ? autoBetEnabled
                        ? "Stop Autobet"
                        : "Start Autobet"
                      : gameState === GAME_STATES.InProgress && !cashedOut
                        ? "CASHOUT"
                        : autoBetEnabled
                          ? "Stop Autobet"
                          : "Finishing Bet"}
                  </BetButton>
                ) : (
                  <BetButton
                    disabled={joining}
                    onClick={() => {
                      if (!betting) {
                        clickBet();
                      } else if (
                        gameState === GAME_STATES.InProgress &&
                        !cashedOut
                      ) {
                        clickCashout();
                      }
                    }}
                  >
                    {!betting
                      ? joining
                        ? "BETTING..."
                        : plannedBet
                          ? "CANCEL BET"
                          : "Place Bet (next round)"
                      : cashedOut
                        ? "CASHED OUT"
                        : "CASHOUT"}
                  </BetButton>
                )}
                {(!isAuto || subActiveTab !== 1) && (
                  <>
                    <BetAmountInput
                      disabled={disabled}
                      value={betAmount}
                      onChange={setBetAmount}
                    />
                    <MultiplierInput
                      disabled={disabled}
                      value={target}
                      onChange={onTargetChange}
                    />
                  </>
                )}
                {(!isAuto || subActiveTab === 1) && (
                  <CurrentBets bets={players} />
                )}
                {isAuto && subActiveTab !== 1 && (
                  <>
                    <AutoBetCountInput
                      disabled={disabled}
                      value={autoBetCount}
                      onChange={setAutoCount}
                      Icon={<SelectedPaymentIcon currency={currency} />}
                    />
                    <StopProfitAmount
                      disabled={disabled}
                      Label={"Stop on Profit"}
                      onChange={setStopPorfitA}
                      value={stopProfitA}
                      Icon={<SelectedPaymentIcon currency={currency} />}
                    />
                    <StopProfitAmount
                      disabled={disabled}
                      Label={"Loss on Profit"}
                      onChange={setStopLossA}
                      value={stopLossA}
                      Icon={<SelectedPaymentIcon currency={currency} />}
                    />
                  </>
                )}
                <ProfitAmount
                  multiplier={payout}
                  disabled={true}
                  profit={payout * savebetAmount}
                  icon={<SelectedPaymentIcon currency={currency} />}
                />
                {isAuto && (
                  <SwitchTab
                    onChange={setSubActiveTab}
                    disabled={false}
                    active={subActiveTab}
                    options={["Controls", "Leaderboard"]}
                    type={"sub"}
                  />
                )}
                <SwitchTab
                  onChange={setActiveTab}
                  disabled={disabled}
                  active={activeTab}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <VerifyModal
        Label={"crash"}
        gameId={verifyId}
        setGameId={() => setGameVerifyId("")}
      />
    </div>
  );
};

export default CrashGame;

const parseCommasToThousands = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const cutDecimalPoints = (num: any) =>
  num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];

const NetStatus = ({ payout }: { payout: number }) => {
  const [netStatus, setNetStatus] = useState(false);

  useEffect(() => {
    setNetStatus(true);
    const timer = setTimeout(() => setNetStatus(false), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [payout]);

  return (
    <div
      className={`w-[10px] h-[10px] rounded-full  bg-[#24db5b] ${netStatus ? " animate-zoom " : ""
        }`}
    />
  );
};
