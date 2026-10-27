package com.photobooth.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PhotoboothApplication {

    public static void main(String[] args) {
        SpringApplication.run(PhotoboothApplication.class, args);
    }
}
