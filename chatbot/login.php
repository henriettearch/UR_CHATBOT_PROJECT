<?php
header('Content-Type: application/json');
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$identifier = isset($_POST['identifier']) ? trim($_POST['identifier']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if(!$role || !$identifier || !$password){
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
    exit;
}

// Placeholder: colleagues will validate against database.
// For now, accept any non-empty credentials and return success.
echo json_encode([ 'success' => true, 'message' => 'Login successful', 'redirect' => 'role.html' ]);
exit;
?>
