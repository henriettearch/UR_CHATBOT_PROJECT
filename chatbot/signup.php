<?php
header('Content-Type: application/json');
$role = isset($_POST['role']) ? trim($_POST['role']) : '';
$first = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
$last = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if(!$role){ echo json_encode(['success'=>false,'message'=>'Role is required']); exit; }

if($role === 'student'){
    $reg = isset($_POST['reg_no']) ? trim($_POST['reg_no']) : '';
    $year = isset($_POST['year']) ? trim($_POST['year']) : '';
    $college = isset($_POST['college']) ? trim($_POST['college']) : '';
    if(!$first || !$last || !$reg || !$year || !$college || !$password){
        echo json_encode(['success'=>false,'message'=>'Missing student fields']); exit;
    }
    // Placeholder: create student in DB
    echo json_encode(['success'=>true,'message'=>'Student registered','role'=>'student','redirect'=>'login.html']); exit;
}

if($role === 'staff'){
    $staff_id = isset($_POST['staff_id']) ? trim($_POST['staff_id']) : '';
    if(!$first || !$last || !$staff_id || !$password){
        echo json_encode(['success'=>false,'message'=>'Missing staff fields']); exit;
    }
    // Placeholder: create staff in DB
    echo json_encode(['success'=>true,'message'=>'Staff registered','role'=>'staff','redirect'=>'login.html']); exit;
}

// For visitor role (shouldn't POST normally) respond with redirect
if($role === 'visitor'){
    echo json_encode(['success'=>true,'message'=>'Continue as visitor','role'=>'visitor','redirect'=>'chatbot.html']); exit;
}

echo json_encode(['success'=>false,'message'=>'Invalid role']);
exit;
?>
