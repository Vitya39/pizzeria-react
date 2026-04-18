<?php
try{


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$db   = 'fetchcrud';
$user = 'fetchcrud';
$pass = 'asdasd';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    echo json_encode(["error" => "Adattábázis kapcsolat sikertelen: " . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM pizza ORDER BY nev');
        $users = $stmt->fetchAll();
        echo json_encode($users);
        break;

    case 'POST':
        if (isset($input['nev']) && isset($input['kategorianev']) && isset($input['vegetarianus'])) {
            $sql = "INSERT INTO pizza (nev, kategorianev, vegetarianus) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['nev'], $input['kategorianev'], $input['vegetarianus']]);
            echo json_encode(['message' => 'Pizza sikeresen létrehozva']);
        }
        break;

    case 'PUT':
        if (isset($input['nev']) && isset($input['kategorianev']) && isset($input['vegetarianus']) && isset($input['originalNev'])) {
            $sql = "UPDATE pizza SET nev = ?, kategorianev = ?, vegetarianus = ? WHERE nev = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['nev'], $input['kategorianev'], $input['vegetarianus'], $input['originalNev']]);
            echo json_encode(['message' => 'Pizza sikeresen frissítve']);
        }
        break;

    case 'DELETE':
        if (isset($input['nev'])) {
            $sql = "DELETE FROM pizza WHERE nev = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['nev']]);
            echo json_encode(['message' => 'Pizza sikeresen törölve']);
        }
        break;
}
} catch (Exception $e) {
    echo $e;
}
?>
