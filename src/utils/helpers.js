export function formatName(name) {
  const nameParts = name.split(/\s+/); // Разбиваем строку на части по пробелам
  let formattedName = "";

  // Перебираем части имени
  for (const part of nameParts) {
    if (part.length > 0) {
      formattedName += part[0]; // Добавляем первую букву
      if (formattedName.length === 2) {
        break; // Если уже добавили две буквы, выходим из цикла
      }
    }
  }

  return formattedName;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
