/**
 * Реализация генерации нормально распределенных случайных величин
 * через тригонометрические функции. Эти значение будут варьироваться на отрезке [-3, 3].
 * Данное распределение работает при мат.ожидании = 0 и дисперсии = 1.
 * Более подробно (Первый вариант): https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%91%D0%BE%D0%BA%D1%81%D0%B0_%E2%80%94_%D0%9C%D1%8E%D0%BB%D0%BB%D0%B5%D1%80%D0%B0
 * Нормальное распределение: https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%80%D0%B0%D1%81%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5
 */

function generateRandomBetween(min, max, exclude) {
  let ranNum = Math.random() * (max - min) + min;

  if (ranNum === exclude) {
    ranNum = generateRandomBetween(min, max, exclude);
  }

  return ranNum;
}

function generateRandomQuantities([a, b], exclude) {
  const r = generateRandomBetween(a, b, exclude);
  const phi = generateRandomBetween(a, b, exclude);

  return {
    r,
    phi,
  };
}

function calculateZ0({ r, phi }) {
  return Math.cos(2 * Math.PI * phi) * Math.sqrt(-2 * Math.log10(r));
}

function calculateZ1({ r, phi }) {
  return Math.sin(2 * Math.PI * phi) * Math.sqrt(-2 * Math.log10(r));
}

function calculateNormallyDistributedQuantities() {
  const { r, phi } = generateRandomQuantities([0, 1], 0);
  const z0 = calculateZ0({ r, phi });
  const z1 = calculateZ1({ r, phi });

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
