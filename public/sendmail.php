<?php
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    if($surname == "") {
        $errorMessage = "form_error_empty";
    } else if (!preg_match("/^[a-züöäßáéíóàèìòêîô '-]+$/i", $surname) {
        $errorMessage = "form_error_invalid_surname";
    } else {
        $error = false;
    }

    if($email == "") {
        $errorMessage = "form_error_empty";
    } else if (!preg_match("/^[a-z\d._%+-]+@[a-z\d._%+-]+\.[a-z]{2,}$/i", $surname) {
        $errorMessage = "form_error_invalid_email";
    } else {
        $error = false;
    }

    if($message == "") {
        $errorMessage = "form_error_empty";
    } else if (!preg_match("/^.{2,500}$/i", $surname) {
        $errorMessage = "form_error_invalid_message";
    } else {
        $error = false;
    }

        if(!$private_policy) {
            $errorMessage = "no_private_policy";
        } else {
            $error = false;
        }

    if($error) {
        $response = [
            'error' => true,
            'surname' => $errorMessage,
            'email' => $errorMessage,
            'message' => $errorMessage
        ];
        echo json_encode($response);
    } else {
        mail();
        $response = [
            'error' => false
        ];
        echo json_encode($response);
    }
?>