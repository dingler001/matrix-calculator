import { addMatrices } from "./addMatrices";
import { matrixPower } from "./matrixPower";
import { scalarMultiply } from "./scalarMultiply";

function zeroMatrix(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

function identityMatrix(size) {
  return Array.from({ length: size }, (_, i) =>
    Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
  );
}

function normalizeExpression(expression) {
  return String(expression || "")
    .replaceAll("−", "-")
    .replace(/\s+/g, "");
}

function parseTerm(rawTerm) {
  let term = rawTerm;
  let sign = 1;

  if (term.startsWith("+")) {
    term = term.slice(1);
  } else if (term.startsWith("-")) {
    sign = -1;
    term = term.slice(1);
  }

  if (!term) {
    throw new Error("Invalid polynomial term.");
  }

  if (term.includes("A^")) {
    const [coefPart, powerPart] = term.split("A^");
    const coefficient = coefPart === "" ? 1 : Number(coefPart);
    const power = Number(powerPart);

    if (!Number.isFinite(coefficient) || !Number.isFinite(power)) {
      throw new Error(`Invalid term: ${rawTerm}`);
    }

    return {
      label: rawTerm,
      type: "A",
      coefficient: sign * coefficient,
      power,
    };
  }

  if (term.includes("A")) {
    const coefPart = term.replace("A", "");
    const coefficient = coefPart === "" ? 1 : Number(coefPart);

    if (!Number.isFinite(coefficient)) {
      throw new Error(`Invalid term: ${rawTerm}`);
    }

    return {
      label: rawTerm,
      type: "A",
      coefficient: sign * coefficient,
      power: 1,
    };
  }

  if (term.includes("I")) {
    const coefPart = term.replace("I", "");
    const coefficient = coefPart === "" ? 1 : Number(coefPart);

    if (!Number.isFinite(coefficient)) {
      throw new Error(`Invalid term: ${rawTerm}`);
    }

    return {
      label: rawTerm,
      type: "I",
      coefficient: sign * coefficient,
      power: 0,
    };
  }

  const coefficient = Number(term);
  if (!Number.isFinite(coefficient)) {
    throw new Error(`Invalid term: ${rawTerm}`);
  }

  return {
    label: rawTerm,
    type: "I",
    coefficient: sign * coefficient,
    power: 0,
  };
}

export function parseMatrixPolynomial(expression) {
  const cleaned = normalizeExpression(expression);
  if (!cleaned) {
    throw new Error("Polynomial expression is empty.");
  }

  const rawTerms = cleaned.match(/[+-]?[^+-]+/g) || [];
  return rawTerms.map(parseTerm);
}

export function evaluateMatrixPolynomial(matrix, expression) {
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    matrix.some((row) => row.length !== matrix.length)
  ) {
    throw new Error("Polynomial evaluation requires a square matrix.");
  }

  const size = matrix.length;
  const terms = parseMatrixPolynomial(expression);

  let result = zeroMatrix(size);
  const breakdown = [];

  for (const term of terms) {
    let termMatrix;

    if (term.type === "A") {
      termMatrix = scalarMultiply(
        matrixPower(matrix, term.power),
        term.coefficient
      );
      breakdown.push(
        `${term.label}  →  ${term.coefficient} × A^${term.power}`
      );
    } else {
      termMatrix = scalarMultiply(identityMatrix(size), term.coefficient);
      breakdown.push(`${term.label}  →  ${term.coefficient} × I`);
    }

    result = addMatrices(result, termMatrix);
  }

  return {
    result,
    breakdown,
  };
}