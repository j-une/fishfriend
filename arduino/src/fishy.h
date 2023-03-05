void change_led_state(const char* LED, led) {

    if (strcmp(LED, "off") == 0) {
      digitalWrite(led, LOW); 
    }
    else if (strcmp(LED, "on") == 0) {
      digitalWrite(led, HIGH);
    }
}