<?php
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
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM felhasznalok ORDER BY id DESC');
        $users = $stmt->fetchAll();
        echo json_encode($users);
        break;

    case 'POST':
        if (isset($input['csaladi_nev']) && isset($input['uto_nev']) && isset($input['bejelentkezes']) && isset($input['jelszo'])) {
            
            $hashed_jelszo = sha1($input['jelszo']);

            $sql = "INSERT INTO felhasznalok (csaladi_nev, uto_nev, bejelentkezes, jelszo) VALUES (?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['csaladi_nev'], $input['uto_nev'], $input['bejelentkezes'], $hashed_jelszo]);
            echo json_encode(['message' => 'User created successfully', 'id' => $pdo->lastInsertId()]);
        }
        break;

    case 'PUT':
        if (isset($input['id']) && isset($input['csaladi_nev']) && isset($input['uto_nev']) && isset($input['bejelentkezes']) && isset($input['jelszo'])) {
            
            $hashed_jelszo = sha1($input['jelszo']);

            $sql = "UPDATE felhasznalok SET csaladi_nev = ?, uto_nev = ?, bejelentkezes = ?, jelszo = ? WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['csaladi_nev'], $input['uto_nev'], $input['bejelentkezes'], $hashed_jelszo, $input['id']]);
            echo json_encode(['message' => 'User updated successfully']);
        }
        break;

    case 'DELETE':
        if (isset($input['id'])) {
            $sql = "DELETE FROM felhasznalok WHERE id = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$input['id']]);
            echo json_encode(['message' => 'User deleted successfully']);
        }
        break;
}
?>
