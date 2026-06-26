import { useMatrixContext } from "../context/MatrixContext";
import { calculateOperation } from "../utils/calculateOperation";

import BackgroundGlow from "../components/layout/BackgroundGlow";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/layout/HeroSection";
import BottomStats from "../components/layout/BottomStats";

import MatrixCard from "../components/matrix/MatrixCard";
import OperationPanel from "../components/operations/OperationPanel";
import OperationControls from "../components/operations/OperationControls";
import CalculateButton from "../components/operations/CalculateButton";
import ResultPanel from "../components/results/ResultPanel";
import StepsPanel from "../components/results/StepsPanel";

export default function Dashboard() {
  const {
    matrixSize,
    matrixA,
    matrixB,
    setMatrixA,
    setMatrixB,
    updateSize,
    selectedOperation,
    scalarValue,
    powerValue,
    polynomialExpression,
    result,
    steps,
    setResult,
    setSteps,
    setSelectedOperation,
  } = useMatrixContext();

  const handleCalculate = () => {
    const output = calculateOperation(selectedOperation, matrixA, matrixB, {
      scalarValue,
      powerValue,
      polynomialExpression,
    });

    setResult(output.result);
    setSteps(output.steps);
  };

  const swapMatrices = () => {
    const nextA = matrixB.map((row) => [...row]);
    const nextB = matrixA.map((row) => [...row]);
    setMatrixA(nextA);
    setMatrixB(nextB);
  };

  return (
    <div className="flex min-h-screen relative text-[var(--text-main)] bg-[var(--app-bg)]">
      <BackgroundGlow />

      <Sidebar />

      <div className="flex-1 min-w-0">
        <Navbar />

        <div className="p-4 lg:p-5 space-y-4">
          <HeroSection />

          <div
            id="workspace"
            className="grid xl:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)] gap-4 items-start"
          >
            <MatrixCard
              title="Matrix A"
              matrix={matrixA}
              setMatrix={setMatrixA}
              matrixSize={matrixSize}
              updateSize={updateSize}
              matrixName="A"
            />

            <div
              className="
                rounded-2xl
                border
                border-[var(--panel-border)]
                bg-[var(--panel-bg)]
                backdrop-blur-xl
                p-4
                flex
                flex-col
                items-center
                justify-center
                gap-3
              "
            >
              <button
                onClick={swapMatrices}
                className="
                  w-14
                  h-14
                  rounded-xl
                  border
                  border-blue-500
                  text-blue-500
                  text-xl
                  hover:bg-blue-500/10
                  transition
                "
                aria-label="Swap matrices"
              >
                ↔
              </button>

              <button
                onClick={() => setSelectedOperation("A × B")}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-[var(--panel-border)]
                  bg-[var(--panel-bg-solid)]
                  text-[var(--text-soft)]
                  text-sm
                  hover:border-blue-500
                  transition
                "
              >
                A × B
              </button>

              <button
                onClick={() => setSelectedOperation("A + B")}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-[var(--panel-border)]
                  bg-[var(--panel-bg-solid)]
                  text-[var(--text-soft)]
                  text-sm
                  hover:border-blue-500
                  transition
                "
              >
                A + B
              </button>

              <button
                onClick={() => setSelectedOperation("A - B")}
                className="
                  w-full
                  px-3
                  py-2.5
                  rounded-lg
                  border
                  border-[var(--panel-border)]
                  bg-[var(--panel-bg-solid)]
                  text-[var(--text-soft)]
                  text-sm
                  hover:border-blue-500
                  transition
                "
              >
                A - B
              </button>
            </div>

            <MatrixCard
              title="Matrix B"
              matrix={matrixB}
              setMatrix={setMatrixB}
              matrixSize={matrixSize}
              updateSize={updateSize}
              matrixName="B"
            />
          </div>

          <OperationPanel />

          <OperationControls />

          <CalculateButton onClick={handleCalculate} />

          <div className="grid xl:grid-cols-2 gap-4">
            <ResultPanel result={result} />
            <StepsPanel steps={steps} />
          </div>

          <BottomStats />
        </div>
      </div>
    </div>
  );
}