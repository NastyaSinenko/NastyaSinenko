function countLetter(str, letter) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i).toLowerCase() === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

function getRow(firstRow, secondRow, letter = "a") {
  const firstCount = countLetter(firstRow, letter);
  const secondCount = countLetter(secondRow, letter);

  return firstCount > secondCount ? firstRow : secondRow;
}


function task1() {
  const firstRow = "Slow and steady wins the race";
  const secondRow = "You can say that again";

  let letter = prompt("Введіть букву для підрахунку:", "");
  if (!letter) return;

  let result = getRow(firstRow, secondRow, letter);
  alert(`Рядок з більшою кількістю "${letter}": \n${result}`);
}

function formattedPhone(phone) {
  if (!phone && phone !== '') return "Неправильний формат номера!";

  // Беремо тільки цифри
  const digits = phone.replace(/\D/g, '');

  let local = null;

  // ===== Перевіряємо дозволені формати =====

  // 1) Формат "+380XXXXXXXXX" → 13 символів з "+"
  if (/^\+380\d{9}$/.test(phone)) {
    local = '0' + digits.slice(3); // "+380664567890" → "0664567890"
  }
  // 2) Формат "380XXXXXXXXX" (без "+")
  else if (/^380\d{9}$/.test(digits)) {
    local = '0' + digits.slice(3);
  }
  // 3) Формат "80XXXXXXXXX" (11 цифр, починається з 80)
  else if (/^80\d{9}$/.test(digits)) {
    local = digits.slice(1); // "80664567890" → "0664567890"
  }
  // 4) Формат "0XXXXXXXXX" (10 цифр, починається з 0)
  else if (/^0\d{9}$/.test(digits)) {
    local = digits; // "0671234567"
  }
  else {
    return "Неправильний формат номера!";
  }

  // Розбиваємо на частини
  const code = local.slice(0, 3);
  const part1 = local.slice(3, 6);
  const part2 = local.slice(6, 8);
  const part3 = local.slice(8, 10);

  return `+38 (${code}) ${part1}-${part2}-${part3}`;
}

// ==== Інтерактивна версія (завдання *) ====
function task2() {
  let phone = prompt("Введіть номер телефону:");
  if (!phone) return;

  let result = formattedPhone(phone);
  alert(`Результат:\n${result}`);
}

// ==== Тести ====
console.log(formattedPhone('+380664567890')); // +38 (066) 456-78-90
console.log(formattedPhone('80664567890'));   // +38 (066) 456-78-90
console.log(formattedPhone('80971234567'));   // +38 (097) 123-45-67
console.log(formattedPhone('0671234567'));    // +38 (067) 123-45-67
console.log(formattedPhone('123456'));    