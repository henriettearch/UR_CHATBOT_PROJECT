<?php
header('Content-Type: application/json');
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$first = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$last = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
$staff_id = isset($_POST['staff_id']) ? trim($_POST['staff_id']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if(!$role || !$first || !$last || !$staff_id || !$password){
    echo json_encode(['success'=>false, 'message'=>'Missing required fields.']);
    exit;
}

// Placeholder: backend should create staff account in DB.
echo json_encode(['success'=>true, 'message'=>'Staff registered', 'role'=>$role, 'redirect'=>'login.html']);
exit;
?>
