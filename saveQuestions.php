<?php
// Get database credentials
$servername = "your_mysql_server";
$username = "your_mysql_username";
$password = "your_mysql_password";
$dbname = "your_mysql_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get questions from POST data
$questions = $_POST['questions'];

// Prepare and execute SQL insert statements
foreach ($questions as $question) {
    $sql = "INSERT INTO questions (question_text, context_text) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $question['question_text'], $question['context_text']);
    $stmt->execute();
}

// Close connection
$conn->close();

// Save questions to the text file in the 'upload' directory
$questionsText = '';
foreach ($questions as $question) {
    $questionsText .= $question['question_text'] . "\nContext: " . $question['context_text'] . "\n\n";
}

$uploadDir = 'upload/';
$filename = 'questions.txt';
$filePath = $uploadDir . $filename;

// Create the 'upload' directory if it doesn't exist
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Save questions to the text file
file_put_contents($filePath, $questionsText);

// Respond with a simple success message
echo "Questions saved successfully.";
?>