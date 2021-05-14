package com.example.application;

import java.util.UUID;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.helpers.LaunchUtil;

import com.vaadin.flow.server.BootstrapPageResponse;
import com.vaadin.flow.server.VaadinServiceInitListener;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        LaunchUtil.launchBrowserInDevelopmentMode(SpringApplication.run(Application.class, args));
    }

    @Bean
    public VaadinServiceInitListener cspNonceInjector() {
        return initEvent -> initEvent.addBootstrapListener(Application::injectCspNonce);
    }

    private static void injectCspNonce(BootstrapPageResponse response) {
        // Use CSP only in production mode since webpack dev mode uses eval()
        if (!response.getSession().getConfiguration().isProductionMode()) {
            return;
        }

        String nonce = UUID.randomUUID().toString();

        // Add a header to make the browser require the nonce in all script tags
        response.getResponse().setHeader("Content-Security-Policy", "script-src 'nonce-" + nonce + "'");

        // Add the nonce to all script tags in the host page
        response.getDocument().getElementsByTag("script").attr("nonce", nonce);
    }
}
