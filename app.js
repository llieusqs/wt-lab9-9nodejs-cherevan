const http = require("http");
const fs = require("fs");
const { getProductCount } = require("./utils");

// Читаем файл с данными
const data = fs.readFileSync("./data/products.json", "utf-8");
const products = JSON.parse(data);

// Выводим в консоль количество товаров для проверки модуля
console.log("Количество товаров: ", getProductCount(products));

// Создаем сервер
const server = http.createServer((req, res) => {
  // Если запрос на /api/products
  if (req.method === "GET" && req.url === "/api/products") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(products));
    return;
  }

  // Для всех остальных путей отдаем 404
  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Маршрут не найден" }));
});

// Запускаем сервер
const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log(`Сервер запущен на порту ${port}`);
});