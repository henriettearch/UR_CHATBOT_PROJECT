<?php
header('Content-Type: application/json');
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$first = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$last = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
$reg = isset($_POST['reg_no']) ? trim($_POST['reg_no']) : '';
$year = isset($_POST['year']) ? trim($_POST['year']) : '';
$college = isset($_POST['college']) ? trim($_POST['college']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if(!$role || !$first || !$last || !$reg || !$year || !$college || !$password){
    echo json_encode(['success'=>false, 'message'=>'Missing required fields.']);
    exit;
}

// Placeholder: at this point the backend should insert into DB and return appropriate response.
// Return success for demo purposes.
echo json_encode(['success'=>true, 'message'=>'Student registered', 'role'=>$role, 'redirect'=>'login.html']);
exit;
?>
