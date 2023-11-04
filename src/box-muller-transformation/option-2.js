/**
 * Реализация генерации нормально распределенных случайных величин
 * через тригонометрические функции. Эти значение будут варьироваться на отрезке [-3, 3].
 * Данное распределение работает при мат.ожидании = 0 и дисперсии = 1.
 * Более подробно (Второй вариант): https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%91%D0%BE%D0%BA%D1%81%D0%B0_%E2%80%94_%D0%9C%D1%8E%D0%BB%D0%BB%D0%B5%D1%80%D0%B0
 * Нормальное распределение: https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5
 */

function generateRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function calculateS(x, y) {
  return Math.pow(x, 2) + Math.pow(y, 2);
}

function isSInvalid(s) {
  return s > 1 || s === 0;
}

function generateRandomQuantities([a, b]) {
  const x = generateRandomBetween(a, b);
  const y = generateRandomBetween(a, b);
  const s = calculateS(x, y);

  return {
    x,
    y,
    s,
  };
}

function calculateZ0({ x, s }) {
  return x * Math.sqrt((-2 * Math.log10(s)) / s);
}

function calculateZ1({ y, s }) {
  return y * Math.sqrt((-2 * Math.log10(s)) / s);
}

function calculateNormallyDistributedQuantities() {
  const INTERVAL = [-1, 1];

  let randomQuantities = generateRandomQuantities(INTERVAL);

  while (isSInvalid(randomQuantities.s)) {
    randomQuantities = generateRandomQuantities(INTERVAL);
  }

  const { x, y, s } = randomQuantities;

  const z0 = calculateZ0({ x, s });
  const z1 = calculateZ1({ y, s });

  return [z0, z1];
}

class NormallyDistributedQuantity {
  constructor(z0, z1) {
    this.z0 = z0;
    this.z1 = z1;
  }
}

function generateManyDistributedQuantities(n) {
  const result = [];

  for (let i = 0; i < n; i++) {
    const normallyDistributedQuantities = new NormallyDistributedQuantity(
      ...calculateNormallyDistributedQuantities()
    );

    result.push(normallyDistributedQuantities);
  }

  console.table(result);
}

generateManyDistributedQuantities(1_000);
