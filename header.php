<?php
$response = array(
    'trusted' => false,
    'values'  => array()
);

foreach ($_SERVER as $key => $value) {
    if (preg_match('/^HTTP_EVE_/', $key) === 0) {

        $key = str_replace('HTTP_EVE_', '', $key);
        $key = strtolower($key);

        if ($key === 'trusted') {
            $response['trusted'] = true;
        }

        $response['values'][ $key ] = $value;
    }
}

echo json_encode($response);
?>
