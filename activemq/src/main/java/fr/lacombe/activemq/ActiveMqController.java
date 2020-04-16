package fr.lacombe.activemq;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActiveMqController {

    private final JmsTemplate jmsTemplate;

    public ActiveMqController(JmsTemplate jmsTemplate) {
        this.jmsTemplate = jmsTemplate;
    }

    @GetMapping("activemq/{message}")
    public void sendMessage(@PathVariable("message") String message) {

        jmsTemplate.convertAndSend("microservices.esgi.test", message);
    }

    @JmsListener(destination = "microservices.esgi.test")
    public void consumeMessage(String message) {
        System.out.println(message);
    }

    // Throws Exception to see message retry and send to DLQ in ActiveMq
    /*@JmsListener(destination = "microservices.esgi.test")
    public void consumeMessage(String message) throws IllegalAccessException {
        throw new IllegalAccessException("message failed");
    }*/
}
